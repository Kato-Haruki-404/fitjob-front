"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ChangeEvent, useMemo } from "react";

type SortValue = "latest" | "calorie" | "exercise" | "wage" | "distance";

type SortControlsProps = {
	value?: SortValue;
	defaultValue?: SortValue;
	onSortAction?: (value: SortValue) => void;
	name?: string;
};

const isTruthyParam = (value: string | null) =>
	value === "true" || value === "1";

const normalizeSortValue = (value: string): SortValue | null => {
	const normalized = value.trim().toLowerCase();
	if (normalized === "latest" || normalized === "new") {
		return "latest";
	}
	if (normalized === "calorie" || normalized === "calories") {
		return "calorie";
	}
	if (normalized === "exercise" || normalized === "intensity") {
		return "exercise";
	}
	if (normalized === "wage") {
		return "wage";
	}
	if (normalized === "distance") {
		return "distance";
	}
	return null;
};

const resolveSortValue = (
	searchParams: ReturnType<typeof useSearchParams>,
): SortValue | null => {
	const sortValues = searchParams.getAll("sort");
	const sortArrayValues = searchParams.getAll("sort[]");
	for (const rawValue of sortValues.length ? sortValues : sortArrayValues) {
		const sortValue = normalizeSortValue(rawValue);
		if (sortValue) {
			return sortValue;
		}
	}
	if (isTruthyParam(searchParams.get("latest"))) {
		return "latest";
	}
	if (isTruthyParam(searchParams.get("calorie"))) {
		return "calorie";
	}
	if (isTruthyParam(searchParams.get("wage"))) {
		return "wage";
	}
	if (isTruthyParam(searchParams.get("exercise"))) {
		return "exercise";
	}
	if (isTruthyParam(searchParams.get("distance"))) {
		return "distance";
	}
	return null;
};

export default function SortControls({
	value,
	defaultValue = "latest",
	onSortAction,
	name = "sort",
}: SortControlsProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isDailyWage = pathname.includes("dailywage");
	const wageLabel = isDailyWage ? "日給順" : "時給順";
	const isControlled = value !== undefined;
	const resolvedValue = useMemo(
		() => resolveSortValue(searchParams) ?? defaultValue,
		[searchParams, defaultValue],
	);
	const currentValue = isControlled ? value : resolvedValue;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextValue = event.target.value as SortValue;
		onSortAction?.(nextValue);

		if (isControlled) {
			return;
		}

		const params = new URLSearchParams(searchParams.toString());
		params.delete("sort");
		params.delete("sort[]");
		params.delete("distance");
		params.delete("calorie");
		params.delete("wage");
		params.delete("exercise");
		params.delete("latest");
		params.set(name, nextValue);
		params.delete("page");
		const queryString = params.toString();
		router.push(queryString ? `${pathname}?${queryString}` : pathname);
	};

	return (
		<div className="flex flex-row items-center justify-end gap-5">
			<span className="font-medium">並び替え</span>
			<hr className="w-0.5 h-4 bg-black" />
			<label className="flex items-center">
				<input
					className="peer appearance-none"
					type="radio"
					name={name}
					value="latest"
					checked={currentValue === "latest"}
					onChange={handleChange}
				/>
				<span className="peer-checked:font-bold">新着順</span>
			</label>
			<label className="flex items-center">
				<input
					className="peer appearance-none"
					type="radio"
					name={name}
					value="wage"
					checked={currentValue === "wage"}
					onChange={handleChange}
				/>
				<span className="peer-checked:font-bold">{wageLabel}</span>
			</label>
			<label className="flex items-center">
				<input
					className="peer appearance-none"
					type="radio"
					name={name}
					value="calorie"
					checked={currentValue === "calorie"}
					onChange={handleChange}
				/>
				<span className="peer-checked:font-bold">消費カロリー</span>
			</label>
			<label className="flex items-center">
				<input
					className="peer appearance-none"
					type="radio"
					name={name}
					value="exercise"
					checked={currentValue === "exercise"}
					onChange={handleChange}
				/>
				<span className="peer-checked:font-bold">運動強度</span>
			</label>
			<label className="flex items-center">
				<input
					className="peer appearance-none"
					type="radio"
					name={name}
					value="distance"
					checked={currentValue === "distance"}
					onChange={handleChange}
				/>
				<span className="peer-checked:font-bold">距離</span>
			</label>
		</div>
	);
}
