"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import JobDetailModal from "@/components/jobDetailModal";
import type { Job } from "@/lib/fetchJobs";

type JobModalProps = {
	job: Job | null;
	isOpen: boolean;
	onClose: () => void;
};

export default function JobModal({ job, isOpen, onClose }: JobModalProps) {
	if (!job) {
		return null;
	}

	const address = job.address;
	const access = address
		? `${address.prefecture}${address.city} ${address.nearestStation}`
		: "未設定";

	const tags = job.tags.map((tag) => tag.name);

	return (
		<Dialog open={isOpen} onClose={onClose} className="relative z-50">
			<DialogBackdrop className="fixed inset-0 bg-black/50" />
			<div className="fixed inset-0 overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4">
					<DialogPanel>
						<JobDetailModal
							title={job.title}
							company={job.companyName}
							imageSrc={job.image}
							imageAlt={job.title}
							calories={`${job.momentum?.calorie ?? 0}kcal`}
							calorieIconCount={Math.min(
								12,
								Math.ceil((job.momentum?.calorie ?? 0) / 50),
							)}
							steps={`${(job.momentum?.steps ?? 0).toLocaleString()}歩`}
							stepsIconCount={Math.min(
								12,
								Math.ceil((job.momentum?.steps ?? 0) / 500),
							)}
							intensityLevel={job.momentum?.exerciseLevel ?? 0}
							wage={job.wage.toLocaleString()}
							access={access}
							employmentType={job.employmentType}
							tags={tags}
							companyName={job.companyName}
							email={job.email ?? ""}
							phone={job.tel ?? ""}
							onClose={onClose}
							onApply={() => {
								window.open(job.externalLinkUrl, "_blank");
							}}
						/>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
