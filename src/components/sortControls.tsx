import { type ChangeEvent, useState } from "react";

type SortValue = "new" | "calories" | "intensity";

type SortControlsProps = {
	value?: SortValue;
	defaultValue?: SortValue;
	onSort?: (value: SortValue) => void;
	name?: string;
};

export default function SortControls({
	value,
	defaultValue = "new",
	onSort,
	name = "sort",
}: SortControlsProps) {
	const isControlled = value !== undefined;
	const [internalValue, setInternalValue] = useState<SortValue>(defaultValue);
	const currentValue = isControlled ? value : internalValue;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextValue = event.target.value as SortValue;
		if (!isControlled) {
			setInternalValue(nextValue);
		}
		onSort?.(nextValue);
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
					value="new"
					checked={currentValue === "new"}
					onChange={handleChange}
				/>
				<span className="peer-checked:font-bold">新着順</span>
			</label>
			<label className="flex items-center">
				<input
					className="peer appearance-none"
					type="radio"
					name={name}
					value="calories"
					checked={currentValue === "calories"}
					onChange={handleChange}
				/>
				<span className="peer-checked:font-bold">消費カロリー</span>
			</label>
			<label className="flex items-center">
				<input
					className="peer appearance-none"
					type="radio"
					name={name}
					value="intensity"
					checked={currentValue === "intensity"}
					onChange={handleChange}
				/>
				<span className="peer-checked:font-bold">運動強度</span>
			</label>
		</div>
	);
}
