import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	baseUrl: string;
	searchParams?: Record<string, string | string[] | undefined>;
	className?: string;
};

type PageItem = number;

function buildPageItems(_currentPage: number, totalPages: number): PageItem[] {
	if (totalPages <= 3) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const currentPage = Math.min(Math.max(1, _currentPage), totalPages);
	const windowSize = 3;
	let start = Math.max(1, currentPage - 2);
	const end = Math.min(totalPages, start + windowSize - 1);
	start = Math.max(1, end - windowSize + 1);

	return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function buildPageUrl(
	baseUrl: string,
	page: number,
	searchParams?: Record<string, string | string[] | undefined>,
): string {
	const params = new URLSearchParams();

	if (searchParams) {
		for (const [key, value] of Object.entries(searchParams)) {
			if (key === "page") continue;
			if (value === undefined) continue;

			if (Array.isArray(value)) {
				for (const v of value) {
					params.append(key, v);
				}
			} else {
				params.append(key, value);
			}
		}
	}

	params.set("page", page.toString());

	return `${baseUrl}?${params.toString()}`;
}

export default function Pagination({
	currentPage,
	totalPages,
	baseUrl,
	searchParams,
	className,
}: PaginationProps) {
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
			{isPrevDisabled ? (
				<span
					className={clsx(
						baseItemClassName,
						inactiveItemClassName,
						"opacity-40 cursor-not-allowed",
					)}
				>
					<ChevronLeft size={24} />
				</span>
			) : (
				<Link
					href={buildPageUrl(baseUrl, safeCurrentPage - 1, searchParams)}
					className={clsx(
						baseItemClassName,
						inactiveItemClassName,
						"cursor-pointer",
					)}
					aria-label="Previous page"
				>
					<ChevronLeft size={24} />
				</Link>
			)}
			{items.map((item) => {
				const itemKey = `page-${item}`;
				const isCurrent = item === safeCurrentPage;
				return isCurrent ? (
					<span
						key={itemKey}
						className={clsx(
							baseItemClassName,
							"bg-main text-white border-2 border-transparent cursor-default",
						)}
						aria-current="page"
					>
						{item}
					</span>
				) : (
					<Link
						key={itemKey}
						href={buildPageUrl(baseUrl, item, searchParams)}
						className={clsx(
							baseItemClassName,
							inactiveItemClassName,
							"cursor-pointer",
						)}
					>
						{item}
					</Link>
				);
			})}
			{isNextDisabled ? (
				<span
					className={clsx(
						baseItemClassName,
						inactiveItemClassName,
						"opacity-40 cursor-not-allowed",
					)}
				>
					<ChevronRight size={24} />
				</span>
			) : (
				<Link
					href={buildPageUrl(baseUrl, safeCurrentPage + 1, searchParams)}
					className={clsx(
						baseItemClassName,
						inactiveItemClassName,
						"cursor-pointer",
					)}
					aria-label="Next page"
				>
					<ChevronRight size={24} />
				</Link>
			)}
		</nav>
	);
}
