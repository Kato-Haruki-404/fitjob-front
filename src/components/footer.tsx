import Link from "next/link";

export default function Footer() {
	return (
		<footer className="p-10 flex flex-col bg-foreground text-background font-medium gap-16">
			<div className="flex flex-col gap-5 justify-between md:flex-row md:gap-0">
				<Link className="text-2xl" href="/">
					FitJob
				</Link>
				<nav>
					<ul className="flex gap-3 md:gap-5 items-center text-xs md:text-base">
						<li>
							<Link href="/">ホーム</Link>
						</li>
						<li aria-hidden="true" className="h-4 md:h-5 w-0.5 bg-white" />
						<li>
							<Link href="favorite">お気に入り</Link>
						</li>
						<li aria-hidden="true" className="h-4 md:h-5  w-0.5 bg-white" />
						<li>
							<Link href="/postingrequest">求人申請</Link>
						</li>
					</ul>
				</nav>
			</div>
			<small>copyright © FitJob</small>
		</footer>
	);
}
