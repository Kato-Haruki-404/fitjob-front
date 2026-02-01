import { Button as HeadlessButton } from "@headlessui/react";
import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type Varient = "primary" | "outline" | "link" | "ghost";

type ButtonProps = Omit<
	ComponentPropsWithoutRef<typeof HeadlessButton>,
	"className"
> & {
	variant?: Varient;
	className?: string;
};

export default function Button({
	variant = "primary",
	children,
	className,
	...props
}: ButtonProps) {
	const baseClasses =
		"py-3 px-10 font-bold text-base rounded-xl hover:opacity-70 cursor-pointer transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";
	const variantClasses = {
		primary: "bg-main text-white",
		outline: "outline -outline-offset-1",
		link: "underline",
		ghost: "",
	}[variant];

	return (
		<HeadlessButton
			className={twMerge(clsx(baseClasses, variantClasses, className))}
			{...props}
		>
			{children}
		</HeadlessButton>
	);
}
