"use client";

import clsx from "clsx";
import Link from "next/link";

type PayTypeToggleProps = {
	isDailyWage: boolean;
};

export default function PayTypeToggle({ isDailyWage }: PayTypeToggleProps) {
	return (
		<div className="flex p-1 md:p-2 bg-main rounded-xl md:text-xl font-medium">
			<Link
				href="/"
				className={clsx(
					"flex-1 py-2 text-center rounded-md",
					!isDailyWage ? "bg-white text-black" : "text-white",
				)}
			>
				時給から探す
			</Link>
			<Link
				href="/?type=dailyWage"
				className={clsx(
					"flex-1 py-2 text-center rounded-md",
					isDailyWage ? "bg-white text-black" : "text-white",
				)}
			>
				日給から探す
			</Link>
		</div>
	);
}
