import clsx from "clsx";
import Link from "next/link";

type ToggleItem = {
	text: string;
	href: string;
	icon?: React.ReactNode;
};

type WideToggleLinkProps = {
	toggle1: ToggleItem;
	toggle2: ToggleItem;
	activeToggle: "toggle1" | "toggle2";
};

export default function WideToggleLink({
	toggle1,
	toggle2,
	activeToggle,
}: WideToggleLinkProps) {
	return (
		<div className="flex p-1 md:p-2 bg-main rounded-xl md:text-xl font-medium w-full">
			<Link
				href={toggle1.href}
				className={clsx(
					"flex gap-3 flex-1 py-2 justify-center items-center text-center rounded-md",
					activeToggle === "toggle1" ? "bg-white text-black" : "text-white",
				)}
			>
				{toggle1.icon}
				{toggle1.text}
			</Link>
			<Link
				href={toggle2.href}
				className={clsx(
					"flex gap-3 flex-1 py-2 justify-center items-center text-center rounded-md",
					activeToggle === "toggle2" ? "bg-white text-black" : "text-white",
				)}
			>
				{toggle2.icon}
				{toggle2.text}
			</Link>
		</div>
	);
}
