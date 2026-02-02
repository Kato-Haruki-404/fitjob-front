import Link from "next/link";
import ActivityLavels from "@/components/top/activityLavel";
import CategorieGrid from "@/components/top/categorieGrid";
import PayTypeToggle from "@/components/top/payTypeToggle";

const linkclass =
	"flex-1 py-3 px-5 text-center border-2 border-[#D7D7D77D] rounded-lg";

export default function Home() {
	return (
		<div className="flex flex-col py-15 px-5 md:px-10 gap-10 font-medium max-w-5xl mx-auto">
			<PayTypeToggle />
			<CategorieGrid
				items={[
					{ label: "1,700円以上", href: "/search?min_wage=1700" },
					{ label: "1,600円以上", href: "/search?min_wage=1600" },
					{ label: "1,500円以上", href: "/search?min_wage=1500" },
					{ label: "1,400円以上", href: "/search?min_wage=1400" },
					{ label: "1,300円以上", href: "/search?min_wage=1300" },
					{ label: "1,200円以上", href: "/search?min_wage=1200" },
					{ label: "1,100円以上", href: "/search?min_wage=1100" },
					{ label: "1,000円以上", href: "/search?min_wage=1000" },
				]}
			/>
			<div className="flex flex-col gap-5">
				<h2>勤務期間から探す</h2>
				<div className="flex flex-row gap-5">
					<Link href="/" className={linkclass}>
						単発
					</Link>
					<Link href="/" className={linkclass}>
						短期
					</Link>
					<Link href="/" className={linkclass}>
						長期
					</Link>
				</div>
			</div>
			<div className="flex flex-col gap-5">
				<h2>消費カロリーから探す</h2>
				<CategorieGrid
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
				/>
			</div>
			<div className="flex flex-col gap-5">
				<h2>歩数から探す</h2>
				<CategorieGrid
					items={[
						{ label: "20,000歩以上", href: "/search?min_stepcount=20000" },
						{ label: "15,000歩以上", href: "/search?min_stepcount=15000" },
						{ label: "10,000歩以上", href: "/search?min_stepcount=10000" },
						{ label: "8,000歩以上", href: "/search?min_stepcount=8000" },
						{ label: "5,000歩以上", href: "/search?min_stepcount=5000" },
						{ label: "3,000歩以上", href: "/search?min_stepcount=3000" },
					]}
				/>
			</div>
			<div className="flex flex-col gap-5">
				<h2>運動量から探す</h2>
				<ActivityLavels />
			</div>
		</div>
	);
}
