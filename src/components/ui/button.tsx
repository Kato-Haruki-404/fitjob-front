import { Button as HeadlessButton } from "@headlessui/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Varient = "primary" | "outline" | "link" | "ghost";

type ButtonProps = {
	variant?: Varient;
	children: React.ReactNode;
};

export default function Button({ variant = "primary", children }: ButtonProps) {
	const baseClasses =
		"py-3 px-10 font-bold text-base rounded-xl hover:opacity-80";
	const variantClasses = {
		primary: "bg-main text-white",
		outline: "text-foreground outline outline-foreground -outline-offset-1",
		link: "text-foreground underline",
		ghost: "text-foreground",
	}[variant];

	return (
		<HeadlessButton className={twMerge(clsx(baseClasses, variantClasses))}>
			{children}
		</HeadlessButton>
	);
}
