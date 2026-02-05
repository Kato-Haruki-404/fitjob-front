"use client";

import { Bookmark, History } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Card from "@/components/card";
import JobModal from "@/components/jobModal";
import Pagination from "@/components/pagination";
import WideToggleLink from "@/components/ui/wideToggle";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import { fetchJobsByIds } from "@/lib/actions/fetchJobsByIds";
import type { Job } from "@/lib/fetchJobs";

const ITEMS_PER_PAGE = 4;

export default function HistoryPage() {
	const { history, isLoaded, clearHistory } = useHistory();
	const { isFavorite, toggleFavorite } = useFavorites();
	const { addToHistory } = useHistory();
	const [jobs, setJobs] = useState<Job[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const searchParams = useSearchParams();

	// Fetch jobs when history is loaded
	useEffect(() => {
		if (!isLoaded) return;

		async function loadJobs() {
			setIsLoading(true);
			if (history.length === 0) {
				setJobs([]);
				setIsLoading(false);
				return;
			}

			const fetchedJobs = await fetchJobsByIds(history);
			setJobs(fetchedJobs);
			setIsLoading(false);
		}

		loadJobs();
	}, [history, isLoaded]);

	const totalPages = Math.max(1, Math.ceil(jobs.length / ITEMS_PER_PAGE));
	const pageParam = searchParams.get("page");
	const currentPage = useMemo(() => {
		const parsedPage = pageParam ? Number(pageParam) : 1;
		if (!Number.isFinite(parsedPage) || parsedPage < 1) {
			return 1;
		}
		return parsedPage;
	}, [pageParam]);
	const paginationParams = useMemo(
		() => Object.fromEntries(searchParams.entries()),
		[searchParams],
	);

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

	const handleClearHistory = () => {
		if (window.confirm("閲覧履歴をすべて削除しますか？")) {
			clearHistory();
		}
	};

	return (
		<div className="flex flex-col h-full items-center px-10 py-15">
			<div className="max-w-5xl w-full h-full flex flex-col gap-10">
				<WideToggleLink
					activeToggle="toggle2"
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
						<p className="text-center text-gray-500">閲覧履歴はありません</p>
					</div>
				) : (
					<>
						<div className="flex justify-end">
							<button
								type="button"
								onClick={handleClearHistory}
								className="text-sm text-gray-500 hover:text-gray-700 underline"
							>
								履歴をクリア
							</button>
						</div>
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
							<Pagination
								currentPage={safeCurrentPage}
								totalPages={totalPages}
								baseUrl="/history"
								searchParams={paginationParams}
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
