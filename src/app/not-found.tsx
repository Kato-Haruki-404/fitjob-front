import Link from "next/link";
import Footer from "@/components/footer";
import Button from "@/components/ui/button";

export default function NotFound() {
	return (
		<>
			<div className="flex flex-col items-center justify-center gap-8 h-full">
				<h1 className="text-3xl md:text-6xl font-bold">404 Not Found</h1>
				<p className="text-l md:text-2xl font-bold">
					ページが見つかりませんでした
				</p>

				<Button asChild variant="link">
					<Link href="/">トップに戻る</Link>
				</Button>
			</div>
			<Footer />
		</>
	);
}
