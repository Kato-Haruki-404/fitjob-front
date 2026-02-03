"use client";

import { Bookmark, History } from "lucide-react";
import { useState } from "react";
import Card from "@/components/card";
import Pagenation from "@/components/pagenation";
import WideToggleLink from "@/components/ui/wideToggle";

const DUMMY_CARDS = Array.from({ length: 60 }, (_, index) => {
	const id = index + 1;
	return {
		id,
		title: `トレーニングジム スタッフ ${id}`,
		company: `フィットワークス ${id}`,
		wage: "1,200",
		location: "東京都渋谷区",
		imageSrc: "/twemoji-flexed-biceps.svg",
		imageAlt: "求人画像",
		activityLevel: (id % 5) + 1,
		bookmarkAriaLabel: "お気に入りに追加",
		link: `/jobs/${id}`,
	};
});

export default function FavoritePage() {
	const itemsPerPage = 4;
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.max(1, Math.ceil(DUMMY_CARDS.length / itemsPerPage));

	const startIndex = (currentPage - 1) * itemsPerPage;
	const visibleCards = DUMMY_CARDS.slice(startIndex, startIndex + itemsPerPage);

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

				<div className="flex flex-col gap-6">
					{visibleCards.map((card) => (
						<Card key={card.id} {...card} />
					))}
				</div>
				<Pagenation
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChangeAction={(page) => setCurrentPage(page)}
				/>
			</div>
		</div>
	);
}
