type AuthLayoutProps = {
	children: React.ReactNode;
	title: string;
	maxWidth?: "md" | "lg" | "xl" | "2xl";
};

const maxWidthClasses = {
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-215",
} as const;

export function AuthLayout({
	children,
	title,
	maxWidth = "md",
}: AuthLayoutProps) {
	return (
		<div className="bg-linear-to-b from-[#F8B819] to-[#F0D320] min-h-full flex items-center justify-center p-5">
			<div
				className={`flex flex-col items-center px-5 pt-15 pb-10 bg-white rounded-3xl gap-10 w-full ${maxWidthClasses[maxWidth]}`}
			>
				<h1 className="font-bold text-black text-3xl">{title}</h1>
				{children}
			</div>
		</div>
	);
}
