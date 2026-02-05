export default function SearchLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="bg-[#fafafa] px-5 py-10 sm:px-10 sm:py-15">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:flex-row">
				{children}
			</div>
		</div>
	);
}
