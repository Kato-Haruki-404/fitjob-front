import Link from "next/link";
import Button from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center gap-8 h-full">
			<h1 className="text-6xl font-bold">404 Not Found</h1>
			<p className="text-2xl font-bold">ページが見つかりませんでした</p>
			<Link href="/">
				<Button variant="link">トップに戻る</Button>
			</Link>
		</div>
	);
}
