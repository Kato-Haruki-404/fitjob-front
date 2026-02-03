"use client";

import { useState } from "react";
import ActivityLevels from "@/components/search/activityLevel";
import CategoryGrid from "@/components/search/categoryGrid";
import WideToggle from "@/components/ui/wideToggle";

export default function Home() {
	const [isDailyWage, setIsDailyWage] = useState(false);

	return (
		<div className="py-15 px-5 md:px-10">
			<div className="flex flex-col gap-10 font-medium max-w-5xl mx-auto">
				<WideToggle
					toggle1={{
						text: "時給から探す",
						href: "/search/hourlywage",
					}}
					toggle2={{
						text: "日給から探す",
						href: "/search/dailywage",
					}}
					activeToggle={isDailyWage ? "toggle2" : "toggle1"}
					onToggle1={() => setIsDailyWage(false)}
					onToggle2={() => setIsDailyWage(true)}
				/>
				<CategoryGrid
					items={
						isDailyWage
							? [
									{ label: "20,000円以上", href: "/search?min_wage=20000" },
									{ label: "18,000円以上", href: "/search?min_wage=18000" },
									{ label: "16,000円以上", href: "/search?min_wage=16000" },
									{ label: "14,000円以上", href: "/search?min_wage=14000" },
									{ label: "12,000円以上", href: "/search?min_wage=12000" },
									{ label: "10,000円以上", href: "/search?min_wage=10000" },
									{ label: "8,000円以上", href: "/search?min_wage=8000" },
									{ label: "6,500円以上", href: "/search?min_wage=6500" },
								]
							: [
									{ label: "1,700円以上", href: "/search?min_wage=1700" },
									{ label: "1,600円以上", href: "/search?min_wage=1600" },
									{ label: "1,500円以上", href: "/search?min_wage=1500" },
									{ label: "1,400円以上", href: "/search?min_wage=1400" },
									{ label: "1,300円以上", href: "/search?min_wage=1300" },
									{ label: "1,200円以上", href: "/search?min_wage=1200" },
									{ label: "1,100円以上", href: "/search?min_wage=1100" },
									{ label: "1,000円以上", href: "/search?min_wage=1000" },
								]
					}
					isDailyWage={isDailyWage}
				/>
				<div className="flex flex-col gap-5">
					<h2>消費カロリーから探す</h2>
					<CategoryGrid
						items={[
							{
								label: "600~699kcal/h",
								href: "/search?min_calories=600&max_calories=699",
							},
							{
								label: "500~599kcal/h",
								href: "/search?min_calories=500&max_calories=599",
							},
							{
								label: "400~499kcal/h",
								href: "/search?min_calories=400&max_calories=499",
							},
							{
								label: "300~399kcal/h",
								href: "/search?min_calories=300&max_calories=399",
							},
							{
								label: "200~299kcal/h",
								href: "/search?min_calories=200&max_calories=299",
							},
							{
								label: "100~199kcal/h",
								href: "/search?min_calories=100&max_calories=199",
							},
						]}
						isDailyWage={isDailyWage}
					/>
				</div>
				<div className="flex flex-col gap-5">
					<h2>歩数から探す</h2>
					<CategoryGrid
						items={[
							{
								label: "5,000~5,999歩/h",
								href: "/search?min_stepcount=5000&max_stepcount=5999",
							},
							{
								label: "4,000~4,999歩/h",
								href: "/search?min_stepcount=4000&max_stepcount=4999",
							},
							{
								label: "3,000~3,999歩/h",
								href: "/search?min_stepcount=3000&max_stepcount=3999",
							},
							{
								label: "2,000~2,999歩/h",
								href: "/search?min_stepcount=2000&max_stepcount=2999",
							},
							{
								label: "1,000~1,999歩/h",
								href: "/search?min_stepcount=1000&max_stepcount=1999",
							},
							{
								label: "1~999歩/h",
								href: "/search?min_stepcount=1&max_stepcount=999",
							},
						]}
						isDailyWage={isDailyWage}
					/>
				</div>
				<div className="flex flex-col gap-5">
					<h2>運動レベル</h2>
					<ActivityLevels isDailyWage={isDailyWage} />
				</div>
			</div>
		</div>
	);
}
