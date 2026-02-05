"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import JobDetailModal from "@/components/jobDetailModal";
import type { Job } from "@/lib/fetchJobs";

const MAX_ICON_COUNT = 12;
const CALORIE_ICON_RANGES = [
	{ max: 199, count: 2 },
	{ max: 249, count: 4 },
	{ max: 299, count: 5 },
	{ max: 349, count: 6 },
	{ max: 399, count: 7 },
	{ max: 449, count: 8 },
	{ max: 499, count: 9 },
	{ max: 599, count: 10 },
	{ max: 699, count: 12 },
];
const STEP_ICON_RANGES = [
	{ max: 999, count: 2 },
	{ max: 1999, count: 4 },
	{ max: 2499, count: 5 },
	{ max: 2999, count: 6 },
	{ max: 3499, count: 7 },
	{ max: 3999, count: 8 },
	{ max: 4499, count: 9 },
	{ max: 4999, count: 10 },
	{ max: 5999, count: 12 },
];

const getIconCount = (
	value: number,
	ranges: { max: number; count: number }[],
) => {
	if (!Number.isFinite(value) || value <= 0) {
		return 0;
	}
	const match = ranges.find((range) => value <= range.max);
	return Math.min(MAX_ICON_COUNT, match?.count ?? MAX_ICON_COUNT);
};

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
	const calorieValue = job.momentum?.calorie ?? 0;
	const stepsValue = job.momentum?.steps ?? 0;

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
							calories={`${calorieValue}kcal`}
							calorieIconCount={getIconCount(calorieValue, CALORIE_ICON_RANGES)}
							steps={`${stepsValue.toLocaleString()}歩`}
							stepsIconCount={getIconCount(stepsValue, STEP_ICON_RANGES)}
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
