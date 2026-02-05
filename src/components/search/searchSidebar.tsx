"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";

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

const hourlyWageOptions = [
	{ label: "ー", minValue: "", maxValue: "" },
	{ label: "1,700円以上", minValue: "1700", maxValue: "" },
	{ label: "1,600円以上", minValue: "1600", maxValue: "" },
	{ label: "1,500円以上", minValue: "1500", maxValue: "" },
	{ label: "1,400円以上", minValue: "1400", maxValue: "" },
	{ label: "1,300円以上", minValue: "1300", maxValue: "" },
	{ label: "1,200円以上", minValue: "1200", maxValue: "" },
	{ label: "1,100円以上", minValue: "1100", maxValue: "" },
	{ label: "1,000円以上", minValue: "1000", maxValue: "" },
];

const dailyWageOptions = [
	{ label: "ー", minValue: "", maxValue: "" },
	{ label: "20,000円以上", minValue: "20000", maxValue: "" },
	{ label: "18,000円以上", minValue: "18000", maxValue: "" },
	{ label: "16,000円以上", minValue: "16000", maxValue: "" },
	{ label: "14,000円以上", minValue: "14000", maxValue: "" },
	{ label: "12,000円以上", minValue: "12000", maxValue: "" },
	{ label: "10,000円以上", minValue: "10000", maxValue: "" },
	{ label: "8,000円以上", minValue: "8000", maxValue: "" },
	{ label: "6,500円以上", minValue: "6500", maxValue: "" },
];

const calorieOptions = [
	{ label: "ー", minValue: "", maxValue: "" },
	{ label: "600~699kcal/h", minValue: "600", maxValue: "699" },
	{ label: "500~599kcal/h", minValue: "500", maxValue: "599" },
	{ label: "400~499kcal/h", minValue: "400", maxValue: "499" },
	{ label: "300~399kcal/h", minValue: "300", maxValue: "399" },
	{ label: "200~299kcal/h", minValue: "200", maxValue: "299" },
	{ label: "100~199kcal/h", minValue: "100", maxValue: "199" },
];

const stepsOptions = [
	{ label: "ー", minValue: "", maxValue: "" },
	{ label: "5,000~5,999歩/h", minValue: "5000", maxValue: "5999" },
	{ label: "4,000~4,999歩/h", minValue: "4000", maxValue: "4999" },
	{ label: "3,000~3,999歩/h", minValue: "3000", maxValue: "3999" },
	{ label: "2,000~2,999歩/h", minValue: "2000", maxValue: "2999" },
	{ label: "1,000~1,999歩/h", minValue: "1000", maxValue: "1999" },
	{ label: "1~999歩/h", minValue: "1", maxValue: "999" },
];

type RangeOption = {
	label: string;
	minValue: string;
	maxValue: string;
};

type RangeFilterSelectProps = {
	id: string;
	label: string;
	options: RangeOption[];
	minParamName: string;
	maxParamName: string;
	gapClassName?: string;
};

function RangeFilterSelect({
	id,
	label,
	options,
	minParamName,
	maxParamName,
	gapClassName,
}: RangeFilterSelectProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentMin = searchParams.get(minParamName) ?? "";
	const currentMax = searchParams.get(maxParamName) ?? "";

	const currentValue = options.findIndex(
		(opt) => opt.minValue === currentMin && opt.maxValue === currentMax,
	);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedIndex = Number(e.target.value);
			const selected = options[selectedIndex];

			const params = new URLSearchParams(searchParams.toString());

			// Remove old values
			params.delete(minParamName);
			params.delete(maxParamName);

			// Set new values if not empty
			if (selected.minValue) {
				params.set(minParamName, selected.minValue);
			}
			if (selected.maxValue) {
				params.set(maxParamName, selected.maxValue);
			}

			// Reset to page 1
			params.delete("page");

			const queryString = params.toString();
			router.push(queryString ? `${pathname}?${queryString}` : pathname);
		},
		[router, pathname, searchParams, options, minParamName, maxParamName],
	);

	return (
		<div className={`flex flex-col ${gapClassName ?? "gap-3"}`}>
			<label htmlFor={id} className="text-base font-bold text-foreground">
				{label}
			</label>
			<div className="relative">
				<select
					id={id}
					className="w-full rounded-[5px] border border-[#d7d7d7] bg-white px-2.5 py-2 text-sm font-medium text-foreground appearance-none"
					value={currentValue === -1 ? 0 : currentValue}
					onChange={handleChange}
				>
					{options.map((option, index) => (
						<option key={option.label} value={index}>
							{option.label}
						</option>
					))}
				</select>
				<ChevronDown
					size={18}
					className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-foreground"
				/>
			</div>
		</div>
	);
}

type SearchSidebarContentProps = {
	total: number;
};

function SearchSidebarContent({ total }: SearchSidebarContentProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isDailyWage = pathname.includes("dailywage");
	const wageOptions = isDailyWage ? dailyWageOptions : hourlyWageOptions;
	const wageLabel = isDailyWage ? "日給" : "時給";
	const selectedTags = new Set([
		...searchParams.getAll("tags"),
		...searchParams.getAll("tags[]"),
	]);
	const selectedExerciseLevels = new Set([
		...searchParams.getAll("exercise_levels"),
		...searchParams.getAll("exercise_levels[]"),
		...searchParams.getAll("activityLevel"),
	]);
	const selectedExerciseLevel = Math.max(
		0,
		...Array.from(selectedExerciseLevels)
			.map(Number)
			.filter((level) => Number.isFinite(level)),
	);

	const applyArrayParams = (name: string, values: string[]) => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete(name);
		params.delete(`${name}[]`);
		if (name === "exercise_levels") {
			params.delete("activityLevel");
		}
		for (const value of values) {
			params.append(name, value);
		}
		params.delete("page");
		const queryString = params.toString();
		router.push(queryString ? `${pathname}?${queryString}` : pathname);
	};

	const handleTagToggle = (tag: string) => {
		const nextTags = new Set(selectedTags);
		if (nextTags.has(tag)) {
			nextTags.delete(tag);
		} else {
			nextTags.add(tag);
		}
		applyArrayParams("tags", Array.from(nextTags));
	};

	const handleExerciseLevelSelect = (level: number) => {
		if (level === selectedExerciseLevel) {
			applyArrayParams("exercise_levels", []);
			return;
		}
		applyArrayParams("exercise_levels", [String(level)]);
	};

	return (
		<aside className="flex w-full flex-col gap-10 rounded-[20px] border border-[#d7d7d7] bg-white px-5 py-8 shadow-card lg:w-70 lg:sticky lg:top-5 lg:self-start lg:max-h-[calc(100vh-40px)] lg:overflow-y-auto">
			<div className="flex items-end justify-center gap-2 font-medium">
				<span className="text-xl text-foreground">検索結果</span>
				<span className="text-[32px] text-[#ef4444]">{total}</span>
				<span className="text-xl text-foreground">件</span>
			</div>
			<div className="h-0.5 w-full bg-[#d7d7d7]" />
			<RangeFilterSelect
				id="filter-wage"
				label={wageLabel}
				options={wageOptions}
				minParamName="min_wage"
				maxParamName="max_wage"
			/>
			<div className="h-0.5 w-full bg-[#d7d7d7]" />
			<RangeFilterSelect
				id="filter-calories"
				label="消費カロリー"
				options={calorieOptions}
				minParamName="min_calorie"
				maxParamName="max_calorie"
				gapClassName="gap-5"
			/>
			<div className="h-0.5 w-full bg-[#d7d7d7]" />
			<RangeFilterSelect
				id="filter-steps"
				label="歩数"
				options={stepsOptions}
				minParamName="min_steps"
				maxParamName="max_steps"
				gapClassName="gap-5"
			/>
			<div className="h-0.5 w-full bg-[#d7d7d7]" />
			<div className="flex flex-col gap-5">
				<span className="text-base font-bold text-foreground">運動レベル</span>
				<div className="flex items-center gap-2">
					{[1, 2, 3, 4, 5].map((level) => {
						const isActive = level <= selectedExerciseLevel;
						return (
							<button
								key={`exercise-${level}`}
								type="button"
								onClick={() => handleExerciseLevelSelect(level)}
								className="rounded-[6px] border border-transparent p-1 transition hover:bg-[#f9fafb]"
								aria-label={`運動レベル${level}`}
							>
								<Image
									src="/twemoji-flexed-biceps.svg"
									alt=""
									aria-hidden="true"
									width={24}
									height={24}
									unoptimized={true}
									className={`h-6 w-6 ${isActive ? "" : "opacity-30"}`}
								/>
							</button>
						);
					})}
				</div>
			</div>
			<div className="h-0.5 w-full bg-[#d7d7d7]" />
			<div className="flex flex-col gap-5">
				<span className="text-base font-bold text-foreground">タグ</span>
				<div className="flex flex-wrap gap-2">
					{tagItems.map((tag) => (
						<button
							key={tag}
							type="button"
							onClick={() => handleTagToggle(tag)}
							className={`rounded-[5px] border px-2 py-1 text-xs font-medium text-foreground transition ${
								selectedTags.has(tag)
									? "border-[#111827] bg-[#f3f4f6]"
									: "border-[#d7d7d7] bg-white hover:bg-[#f9fafb]"
							}`}
						>
							{tag}
						</button>
					))}
				</div>
			</div>
		</aside>
	);
}

function SearchSidebarSkeleton() {
	return (
		<aside className="flex w-full flex-col gap-10 rounded-[20px] border border-[#d7d7d7] bg-white px-5 py-8 shadow-card lg:w-70 lg:sticky lg:top-5 lg:self-start lg:max-h-[calc(100vh-40px)] lg:overflow-y-auto animate-pulse">
			<div className="flex items-end justify-center gap-2 font-medium">
				<span className="text-xl text-foreground">検索結果</span>
				<span className="text-[32px] text-[#ef4444]">-</span>
				<span className="text-xl text-foreground">件</span>
			</div>
			<div className="h-0.5 w-full bg-[#d7d7d7]" />
			<div className="h-16 bg-gray-200 rounded" />
			<div className="h-0.5 w-full bg-[#d7d7d7]" />
			<div className="h-16 bg-gray-200 rounded" />
			<div className="h-0.5 w-full bg-[#d7d7d7]" />
			<div className="h-16 bg-gray-200 rounded" />
		</aside>
	);
}

type SearchSidebarProps = {
	total: number;
};

export default function SearchSidebar({ total }: SearchSidebarProps) {
	return (
		<Suspense fallback={<SearchSidebarSkeleton />}>
			<SearchSidebarContent total={total} />
		</Suspense>
	);
}
