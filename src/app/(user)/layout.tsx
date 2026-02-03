import Footer from "@/components/footer";
import { GoBackHeader } from "@/components/header";

export default function UserLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<GoBackHeader />
			<main className="flex-1">{children}</main>
			<Footer />
		</>
	);
}
