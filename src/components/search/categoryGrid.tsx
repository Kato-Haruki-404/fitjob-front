import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { appendPayType } from "@/lib/urlUtils";

type CategoryItem = {
	label: string;
	href: string;
};

type CategoryGridProps = {
	items: CategoryItem[];
	isDailyWage?: boolean;
};

export default function CategoryGrid({
	items,
	isDailyWage = false,
}: CategoryGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl bg-[#D7D7D7] gap-0.5 p-0 border-2 border-[#D7D7D7]">
			{items.map((item, index) => (
				<CategoryLink
					key={`${item.label}-${index}`}
					href={appendPayType(item.href, isDailyWage)}
				>
					{item.label}
				</CategoryLink>
			))}
		</div>
	);
}

function CategoryLink({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) {
	return (
		<Link className="flex justify-between py-3 px-5 bg-background" href={href}>
			{children}
			<ChevronRight />
		</Link>
	);
}
