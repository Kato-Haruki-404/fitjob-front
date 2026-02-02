import Footer from "@/components/footer";
import SearchArea from "@/components/searchArea";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<SearchArea />
			<main className="flex-1">{children}</main>
			<Footer />
		</>
	);
}
