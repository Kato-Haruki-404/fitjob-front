"use client";

import { useEffect, useState } from "react";
import Card from "@/components/card";
import JobModal from "@/components/jobModal";
import { useFavorites } from "@/hooks/useFavorites";
import { useHistory } from "@/hooks/useHistory";
import type { Job } from "@/lib/fetchJobs";

type JobCardListProps = {
	jobs: Job[];
};

export default function JobCardList({ jobs }: JobCardListProps) {
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isFavorite, toggleFavorite } = useFavorites();
	const { addToHistory } = useHistory();

	const handleCardClick = (job: Job) => {
		setSelectedJob(job);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedJob(null);
	};

	const handleBookmarkClick = (jobId: number) => {
		toggleFavorite(jobId);
	};

	// Add to history when modal opens
	useEffect(() => {
		if (isModalOpen && selectedJob) {
			addToHistory(selectedJob.id);
		}
	}, [isModalOpen, selectedJob, addToHistory]);

	return (
		<>
			<div className="flex flex-col gap-6">
				{jobs.map((job) => (
					<Card
						key={job.id}
						{...job}
						onClick={() => handleCardClick(job)}
						isBookmarked={isFavorite(job.id)}
						onBookmarkClick={() => handleBookmarkClick(job.id)}
					/>
				))}
			</div>
			{jobs.length === 0 && (
				<p className="text-center text-gray-500">求人が見つかりませんでした</p>
			)}
			<JobModal
				job={selectedJob}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</>
	);
}
