"use client";

import { Bookmark, CircleUserRound, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "@/../public/logo.svg";
import Button from "@/components/ui/button";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<header className="flex items-center justify-between px-10 h-20 shrink-0">
			<Link href="/" className="text-2xl font-bold">
				<Image src={logo.src} width={140} height={31} alt="FitJob" />
			</Link>
			<nav className="hidden md:flex items-center gap-10 shrink-0">
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

export function GoBackHeader() {
	const router = useRouter();
	return (
		<div className="flex justify-center px-10 py-5 bg-main">
			<div className="max-w-5xl w-full">
				<Button variant="back" onClick={() => router.back()} />
			</div>
		</div>
	);
}
