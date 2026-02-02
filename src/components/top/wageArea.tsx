import CategoryGrid from "./categoryGrid";
import PayTypeToggle from "./payTypeToggle";

type WageAreaProps = {
	isDailyWage: boolean;
};

export default function WageArea({ isDailyWage }: WageAreaProps) {
	return (
		<div className="flex flex-col gap-10 md:gap-5">
			<PayTypeToggle isDailyWage={isDailyWage} />
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
		</div>
	);
}
