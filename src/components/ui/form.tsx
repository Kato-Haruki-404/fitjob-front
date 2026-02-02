import {
	Field as HeadlessField,
	Input as HeadlessInput,
	Label as HeadlessLabel,
	Select as HeadlessSelect,
	Textarea as HeadlessTextarea,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

type FieldProps = ComponentPropsWithoutRef<typeof HeadlessField>;
type LabelProps = ComponentPropsWithoutRef<typeof HeadlessLabel>;
type InputProps = ComponentPropsWithoutRef<typeof HeadlessInput> &
	React.InputHTMLAttributes<HTMLInputElement>;
type SelectProps = ComponentPropsWithoutRef<typeof HeadlessInput> &
	React.SelectHTMLAttributes<HTMLSelectElement>;
type TextareaProps = ComponentPropsWithoutRef<typeof HeadlessTextarea> &
	React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Field({ ...props }: FieldProps) {
	return (
		<HeadlessField className="flex flex-col gap-3 flex-1 min-w-0" {...props} />
	);
}

export function Label({ ...props }: LabelProps) {
	return <HeadlessLabel className="font-medium" {...props} />;
}

export function Input({ ...props }: InputProps) {
	return (
		<HeadlessInput
			className="py-3 px-5 text-3 border border-[#D7D7D7] -outline-offset-1 rounded-xl font-normal"
			{...props}
		/>
	);
}

export function Select({ ...props }: SelectProps) {
	return (
		<div className="relative w-full">
			<HeadlessSelect
				className="w-full py-3 px-5 text-3 border border-[#D7D7D7] -outline-offset-1 rounded-xl appearance-none pr-8"
				{...props}
			>
				{props.children}
			</HeadlessSelect>
			<ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
		</div>
	);
}

export function Textarea({ ...props }: TextareaProps) {
	return (
		<HeadlessTextarea
			className="py-3 px-5 text-3 border border-[#D7D7D7] -outline-offset-1 rounded-xl"
			{...props}
		/>
	);
}
