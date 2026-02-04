"use client";

import { Bookmark, History } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/card";
import JobModal from "@/components/jobModal";
import WideToggleLink from "@/components/ui/wideToggle";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { fetchJobsByIds } from "@/lib/actions/fetchJobsByIds";
import type { Job } from "@/lib/fetchJobs";

const ITEMS_PER_PAGE = 4;

export default function FavoritePage() {
	const { favorites, isLoaded, isFavorite, toggleFavorite } = useFavorites();
	const { addToHistory } = useHistory();
	const [jobs, setJobs] = useState<Job[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Fetch jobs when favorites are loaded
	useEffect(() => {
		if (!isLoaded) return;

		async function loadJobs() {
			setIsLoading(true);
			if (favorites.length === 0) {
				setJobs([]);
				setIsLoading(false);
				return;
			}

			const fetchedJobs = await fetchJobsByIds(favorites);
			setJobs(fetchedJobs);
			setIsLoading(false);
		}

		loadJobs();
	}, [favorites, isLoaded]);

	const totalPages = Math.max(1, Math.ceil(jobs.length / ITEMS_PER_PAGE));

	// Calculate safe current page
	const safeCurrentPage = useMemo(() => {
		return Math.min(currentPage, totalPages);
	}, [currentPage, totalPages]);

	const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
	const visibleJobs = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	const handleCardClick = (job: Job) => {
		setSelectedJob(job);
		setIsModalOpen(true);
		addToHistory(job.id);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedJob(null);
	};

	const handleBookmarkClick = (jobId: number) => {
		toggleFavorite(jobId);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="flex flex-col h-full items-center px-10 py-15">
			<div className="max-w-5xl w-full h-full flex flex-col gap-10">
				<WideToggleLink
					activeToggle="toggle1"
					toggle1={{
						text: "お気に入り",
						href: "/favorite",
						icon: <Bookmark size={24} />,
					}}
					toggle2={{
						text: "履歴",
						href: "/history",
						icon: <History size={24} />,
					}}
				/>

				{!isLoaded || isLoading ? (
					<div className="flex flex-col gap-6">
						<p className="text-center text-gray-500">読み込み中...</p>
					</div>
				) : jobs.length === 0 ? (
					<div className="flex flex-col gap-6">
						<p className="text-center text-gray-500">
							お気に入りに登録された求人はありません
						</p>
					</div>
				) : (
					<>
						<div className="flex flex-col gap-6">
							{visibleJobs.map((job) => (
								<Card
									key={job.id}
									{...job}
									onClick={() => handleCardClick(job)}
									isBookmarked={isFavorite(job.id)}
									onBookmarkClick={() => handleBookmarkClick(job.id)}
								/>
							))}
						</div>
						{totalPages > 1 && (
							<ClientPagination
								currentPage={safeCurrentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						)}
					</>
				)}
			</div>

			<JobModal
				job={selectedJob}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</div>
	);
}

// Client-side pagination component since we're managing state locally
type ClientPaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

function ClientPagination({
	currentPage,
	totalPages,
	onPageChange,
}: ClientPaginationProps) {
	const baseItemClassName =
		"w-10 h-10 rounded shadow-card flex items-center justify-center text-[20px] font-medium cursor-pointer";
	const inactiveItemClassName =
		"border-2 border-[#d7d7d7] text-[#333] bg-white";
	const activeItemClassName =
		"bg-main text-white border-2 border-transparent cursor-default";

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<nav
			className="flex items-center justify-center gap-5"
			aria-label="Pagination"
		>
			<button
				type="button"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`${baseItemClassName} ${inactiveItemClassName} ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
				aria-label="前のページ"
			>
				‹
			</button>
			{pages.map((page) => (
				<button
					key={page}
					type="button"
					onClick={() => onPageChange(page)}
					className={`${baseItemClassName} ${page === currentPage ? activeItemClassName : inactiveItemClassName}`}
					aria-current={page === currentPage ? "page" : undefined}
				>
					{page}
				</button>
			))}
			<button
				type="button"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className={`${baseItemClassName} ${inactiveItemClassName} ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : ""}`}
				aria-label="次のページ"
			>
				›
			</button>
		</nav>
	);
}
