import { ChevronDown } from "lucide-react";
import { Children } from "react";
import ActivityIcons from "@/components/activityIcons";
import Card from "@/components/card";
import Pagination from "@/components/pagination";
import SortControls from "@/components/sortControls";

const tagItems = [
	"歩く時間が多い",
	"立ちっぱなし",
	"重いものを持つ",
	"繰り返し動作が多い",
	"屋外作業",
	"屋内作業",
	"上半身",
	"下半身",
	"体幹",
	"全身",
];

const defaultCards = Array.from({ length: 8 }, (_, index) => ({
	id: index + 1,
	title: "荷物運搬スタッフ",
	company: "アマゾンジャパン合同会社 愛知笠寺デリバリーステーション",
	wage: "1,200",
	location: "名古屋市 名駅 / 名古屋駅 徒歩1分",
	imageSrc: "/logo.svg",
	imageAlt: "求人イメージ",
	activityLevel: 5,
}));

type FilterSelectProps = {
	id: string;
	label: string;
	gapClassName?: string;
};

function FilterSelect({ id, label, gapClassName }: FilterSelectProps) {
	return (
		<div className={`flex flex-col ${gapClassName ?? "gap-3"}`}>
			<label htmlFor={id} className="text-base font-bold text-foreground">
				{label}
			</label>
			<div className="relative">
				<select
					id={id}
					className="w-full rounded-[5px] border border-[#d7d7d7] bg-white px-2.5 py-2 text-sm font-medium text-foreground appearance-none"
					defaultValue=""
				>
					<option value="">ー</option>
				</select>
				<ChevronDown
					size={18}
					className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-foreground"
				/>
			</div>
		</div>
	);
}

export default function SearchLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const hasChildren = Children.count(children) > 0;

	return (
		<div className="bg-[#fafafa] px-5 py-10 sm:px-10 sm:py-15">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row">
				<aside className="flex w-full flex-col gap-10 rounded-[20px] border border-[#d7d7d7] bg-white px-5 py-8 shadow-card lg:w-[280px]">
					<div className="flex items-end justify-center gap-2 font-medium">
						<span className="text-xl text-foreground">検索結果</span>
						<span className="text-[32px] text-[#ef4444]">142</span>
						<span className="text-xl text-foreground">件</span>
					</div>
					<div className="h-0.5 w-full bg-[#d7d7d7]" />
					<FilterSelect id="filter-hourly" label="時給" />
					<FilterSelect id="filter-salary" label="給与" />
					<div className="h-0.5 w-full bg-[#d7d7d7]" />
					<FilterSelect
						id="filter-calories"
						label="消費カロリー"
						gapClassName="gap-5"
					/>
					<div className="h-0.5 w-full bg-[#d7d7d7]" />
					<FilterSelect id="filter-steps" label="歩数" gapClassName="gap-5" />
					<div className="h-0.5 w-full bg-[#d7d7d7]" />
					<div className="flex flex-col gap-5">
						<span className="text-base font-bold text-foreground">
							運動レベル
						</span>
						<ActivityIcons level={1} />
					</div>
					<div className="h-0.5 w-full bg-[#d7d7d7]" />
					<div className="flex flex-col gap-5">
						<span className="text-base font-bold text-foreground">タグ</span>
						<div className="flex flex-wrap gap-2">
							{tagItems.map((tag) => (
								<span
									key={tag}
									className="rounded-[5px] border border-[#d7d7d7] bg-white px-2 py-1 text-xs font-medium text-foreground"
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</aside>
				<section className="flex flex-1 flex-col gap-6">
					<div className="flex w-full justify-end">
						<SortControls />
					</div>
					<div className="flex flex-col gap-6">
						{hasChildren
							? children
							: defaultCards.map((card) => (
									<Card
										key={card.id}
										title={card.title}
										company={card.company}
										wage={card.wage}
										location={card.location}
										imageSrc={card.imageSrc}
										imageAlt={card.imageAlt}
										activityLevel={card.activityLevel}
										bookmarkAriaLabel={`${card.title}をお気に入りに追加`}
										link="/search/hourlywage"
									/>
								))}
					</div>
					<Pagination />
				</section>
			</div>
		</div>
	);
}
