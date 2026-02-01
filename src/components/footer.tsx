import Link from "next/link";

export default function Footer() {
	return (
		<footer className="p-10 flex flex-col bg-foreground text-background font-medium gap-16">
			<div className="flex justify-between">
				<Link className="text-2xl" href="/">
					FitJob
				</Link>
				<nav>
					<ul className="flex gap-5 items-center">
						<li>
							<Link href="/">ホーム</Link>
						</li>
						<hr className="h-5 w-0.5 bg-white" />
						<li>
							<Link href="/favorite">お気に入り</Link>
						</li>
						<hr className="h-5 w-0.5 bg-white" />
						<li>
							<Link href="mypage">マイページ</Link>
						</li>
						<hr className="h-5 w-0.5 bg-white" />
						<li>
							<Link href="">求人募集</Link>
						</li>
					</ul>
				</nav>
			</div>
			<small>copyright © FitJob</small>
		</footer>
	);
}
