"use client";

import { Bookmark, CircleUserRound, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/button";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<header className="flex items-center justify-between px-10 h-20 shrink-0">
			<Link href="/" className="text-2xl font-bold">
				FitJob
			</Link>
			<nav className="hidden md:flex items-center gap-10">
				<div className="flex items-center gap-10">
					<Link href="/favorite" className="flex font-bold items-center gap-2">
						<Bookmark size={18} />
						お気に入り
					</Link>
					<Link href="/mypage" className="flex font-bold items-center gap-2">
						<CircleUserRound size={18} />
						マイページ
					</Link>
				</div>
				<div className="flex items-center gap-5">
					<Button asChild variant="outline">
						<Link href="/login">ログイン</Link>
					</Button>
					<Button asChild>
						<Link href="/">求人募集</Link>
					</Button>
				</div>
			</nav>
			<button
				type="button"
				className="md:hidden"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <X size={32} /> : <Menu size={32} />}
			</button>
		</header>
	);
}
