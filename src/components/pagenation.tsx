"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { twMerge } from "tailwind-merge";

type PagenationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
};

type PageItem = number;

function buildPageItems(_currentPage: number, totalPages: number): PageItem[] {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const currentPage = Math.min(Math.max(1, _currentPage), totalPages);
	const firstPage = 1;
	const lastPage = totalPages;

	if (currentPage <= 3) {
		return [firstPage, 2, 3, 4, lastPage];
	}

	if (currentPage >= totalPages - 2) {
		return [
			firstPage,
			totalPages - 3,
			totalPages - 2,
			totalPages - 1,
			lastPage,
		];
	}

	return [firstPage, currentPage - 1, currentPage, currentPage + 1, lastPage];
}

export default function Pagenation({
	currentPage,
	totalPages,
	onPageChange,
	className,
}: PagenationProps) {
	const safeTotalPages = Math.max(0, totalPages);
	if (safeTotalPages === 0) {
		return null;
	}

	const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
	const items = buildPageItems(safeCurrentPage, safeTotalPages);
	const isPrevDisabled = safeCurrentPage === 1;
	const isNextDisabled = safeCurrentPage === safeTotalPages;

	const baseItemClassName =
		"w-10 h-10 rounded shadow-card flex items-center justify-center text-[20px] font-medium";

	const inactiveItemClassName =
		"border-2 border-[#d7d7d7] text-[#333] bg-white";

	return (
		<nav
			className={twMerge(
				clsx("flex items-center justify-center gap-5", className),
			)}
			aria-label="Pagination"
		>
			<button
				type="button"
				className={clsx(
					baseItemClassName,
					inactiveItemClassName,
					isPrevDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
				)}
				disabled={isPrevDisabled}
				aria-label="Previous page"
				onClick={() => onPageChange(safeCurrentPage - 1)}
			>
				<ChevronLeft size={24} />
			</button>
			{items.map((item) => {
				const itemKey = `page-${item}`;
				const isCurrent = item === safeCurrentPage;
				return (
					<button
						key={itemKey}
						type="button"
						className={clsx(
							baseItemClassName,
							isCurrent
								? "bg-main text-white border-2 border-transparent"
								: inactiveItemClassName,
							isCurrent ? "cursor-default" : "cursor-pointer",
						)}
						disabled={isCurrent}
						aria-current={isCurrent ? "page" : undefined}
						onClick={() => onPageChange(item)}
					>
						{item}
					</button>
				);
			})}
			<button
				type="button"
				className={clsx(
					baseItemClassName,
					inactiveItemClassName,
					isNextDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
				)}
				disabled={isNextDisabled}
				aria-label="Next page"
				onClick={() => onPageChange(safeCurrentPage + 1)}
			>
				<ChevronRight size={24} />
			</button>
		</nav>
	);
}
