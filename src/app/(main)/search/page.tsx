import ActivityLevels from "@/components/search/activityLevel";
import CategoryGrid from "@/components/search/categoryGrid";
import WideToggle from "@/components/ui/wideToggle";

type Props = {
	searchParams: Promise<{ type?: string }>;
};

export default async function Home({ searchParams }: Props) {
	const params = await searchParams;
	const isDailyWage = params.type === "dailyWage";

	return (
		<div className="py-15 px-5 md:px-10">
			<div className="flex flex-col gap-10 font-medium max-w-5xl mx-auto">
				<WideToggle
					toggle1={{
						text: "時給から探す",
						href: "/search",
					}}
					toggle2={{
						text: "日給から探す",
						href: "/search?type=dailyWage",
					}}
					activeToggle={isDailyWage ? "toggle2" : "toggle1"}
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
							{ label: "800kcal以上", href: "/search?min_calories=800" },
							{ label: "700kcal以上", href: "/search?min_calories=700" },
							{ label: "600kcal以上", href: "/search?min_calories=600" },
							{ label: "500kcal以上", href: "/search?min_calories=500" },
							{ label: "400kcal以上", href: "/search?min_calories=400" },
							{ label: "300kcal以上", href: "/search?min_calories=300" },
							{ label: "200kcal以上", href: "/search?min_calories=200" },
							{ label: "100kcal以上", href: "/search?min_calories=100" },
						]}
						isDailyWage={isDailyWage}
					/>
				</div>
				<div className="flex flex-col gap-5">
					<h2>歩数から探す</h2>
					<CategoryGrid
						items={[
							{ label: "20,000歩以上", href: "/search?min_stepcount=20000" },
							{ label: "15,000歩以上", href: "/search?min_stepcount=15000" },
							{ label: "10,000歩以上", href: "/search?min_stepcount=10000" },
							{ label: "8,000歩以上", href: "/search?min_stepcount=8000" },
							{ label: "5,000歩以上", href: "/search?min_stepcount=5000" },
							{ label: "3,000歩以上", href: "/search?min_stepcount=3000" },
						]}
						isDailyWage={isDailyWage}
					/>
				</div>
				<div className="flex flex-col gap-5">
					<h2>運動量から探す</h2>
					<ActivityLevels isDailyWage={isDailyWage} />
				</div>
			</div>
		</div>
	);
}
