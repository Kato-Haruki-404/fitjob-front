import {
	Field as HeadlessField,
	Input as HeadlessInput,
	Label as HeadlessLabel,
} from "@headlessui/react";
import type { ComponentPropsWithoutRef } from "react";

type FieldProps = ComponentPropsWithoutRef<typeof HeadlessField>;
type LabelProps = ComponentPropsWithoutRef<typeof HeadlessLabel>;
type InputProps = ComponentPropsWithoutRef<typeof HeadlessInput> &
	React.InputHTMLAttributes<HTMLInputElement>;

export function Field({ ...props }: FieldProps) {
	return <HeadlessField className="flex flex-col gap-3" {...props} />;
}

export function Label({ ...props }: LabelProps) {
	return <HeadlessLabel className="font-medium" {...props} />;
}

export function Input({ ...props }: InputProps) {
	return (
		<HeadlessInput
			className="py-3 px-5 text-3 border border-[#D7D7D7] -outline-offset-1 rounded-xl min-w-95"
			{...props}
		/>
	);
}
