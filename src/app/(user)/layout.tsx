import Footer from "@/components/footer";

export default function UserLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<main className="flex-1">{children}</main>
			<Footer />
		</>
	);
}
