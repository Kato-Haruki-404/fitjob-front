import { Button as HeadlessButton } from "@headlessui/react";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "outline" | "link" | "ghost";

type SharedButtonProps = {
	variant?: Variant;
	className?: string;
};

type HeadlessButtonProps = Omit<
	ComponentPropsWithoutRef<typeof HeadlessButton>,
	"className"
> &
	SharedButtonProps & {
		asChild?: false;
	};

type SlotButtonProps = Omit<
	ComponentPropsWithoutRef<typeof Slot>,
	"className" | "children"
> &
	SharedButtonProps & {
		asChild: true;
		children?: ReactNode;
	};

type ButtonProps = HeadlessButtonProps | SlotButtonProps;

export default function Button(props: ButtonProps) {
	const { variant = "primary", className } = props;
	const baseClasses =
		"py-3 px-10 font-bold text-base rounded-xl hover:opacity-70 cursor-pointer transition-all duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";
	const variantClasses = {
		primary: "bg-main text-white",
		outline: "outline -outline-offset-1",
		link: "underline",
		ghost: "",
	}[variant];

	const mergedClassName = twMerge(clsx(baseClasses, variantClasses, className));

	if (props.asChild) {
		const { children, asChild: _asChild, ...rest } = props;
		void _asChild;
		return (
			<Slot className={mergedClassName} {...rest}>
				{children}
			</Slot>
		);
	}

	const { children, asChild: _asChild, ...rest } = props;
	void _asChild;
	return (
		<HeadlessButton className={mergedClassName} {...rest}>
			{children}
		</HeadlessButton>
	);
}
