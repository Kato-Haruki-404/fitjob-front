import Image from "next/image";

type ActivityIconsProps = {
	level: number;
};

export default function ActivityIcons({ level }: ActivityIconsProps) {
	const activityCount = Math.max(0, Math.min(5, Math.round(level)));
	const activityKeys = ["1", "2", "3", "4", "5"];

	return (
		<div className="flex items-start gap-3">
			{activityKeys.map((key, index) => (
				<Image
					key={`activity-${key}`}
					src="/twemoji-flexed-biceps.svg"
					alt=""
					aria-hidden="true"
					width={24}
					height={24}
					className={`h-6 w-6 ${index < activityCount ? "" : "opacity-50"}`}
				/>
			))}
		</div>
	);
}
