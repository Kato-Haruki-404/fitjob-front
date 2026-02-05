"use client";

import { Input } from "@headlessui/react";
import { MapPin, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchArea() {
	const router = useRouter();
	const pathname = usePathname();
	const [workLocationKeyword, setWorkLocationKeyword] = useState("");
	const [generalKeyword, setGeneralKeyword] = useState("");
	const searchBase = pathname?.startsWith("/search/dailywage")
		? "/search/dailywage"
		: "/search/hourlywage";

	return (
		<div className="py-10 px-5 md:p-10 bg-main">
			<div className="max-w-5xl mx-auto flex flex-col gap-2 py-3 px-6 bg-white rounded-lg font-medium">
				<div className="flex items-center gap-2">
					<MapPin size={18} className="shrink-0" />
					<Input
						className="flex-1 outline-none bg-transparent"
						placeholder="勤務地で探す"
						value={workLocationKeyword}
						onChange={(e) => setWorkLocationKeyword(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								if (!workLocationKeyword) {
									return;
								}
								router.push(
									`${searchBase}?workLocation=${encodeURIComponent(workLocationKeyword)}`,
								);
							}
						}}
					/>
				</div>
				<hr className="h-0.5 border-[#D7D7D7]" />
				<div className="flex items-center gap-2">
					<Search size={18} className="shrink-0" />
					<Input
						className="flex-1 outline-none bg-transparent"
						placeholder="キーワード検索"
						value={generalKeyword}
						onChange={(e) => setGeneralKeyword(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const trimmedKeyword = generalKeyword.trim();
								router.push(
									trimmedKeyword
										? `${searchBase}?keyword=${encodeURIComponent(trimmedKeyword)}`
										: searchBase,
								);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}
