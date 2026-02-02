"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PayTypeToggle() {
	const searchParams = useSearchParams();
	const type = searchParams.get("type");
	return (
		<div className="flex p-2 bg-main rounded-xl text-xl font-medium">
			<Link
				href="/"
				className={clsx(
					"flex-1 py-2 text-center rounded-md",
					type === null ? "bg-white text-black" : "text-white",
				)}
			>
				時給から探す
			</Link>
			<Link
				href="/?type=dailyWage"
				className={clsx(
					"flex-1 py-2 text-center rounded-md",
					type === "dailyWage" ? "bg-white text-black" : "text-white",
				)}
			>
				日給から探す
			</Link>
		</div>
	);
}
