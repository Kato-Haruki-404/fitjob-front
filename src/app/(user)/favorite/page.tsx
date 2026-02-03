import { Bookmark, ChevronLeft, ChevronRight, History } from "lucide-react";
import Link from "next/link";
import Card from "@/components/card";
import WideToggleLink from "@/components/ui/wideToggle";

export default function FavoritePage() {
	return (
		<div className="flex flex-col h-full items-center px-10 py-15">
			<div className="max-w-5xl w-full h-full flex flex-col gap-10">
				<WideToggleLink
					activeToggle="toggle1"
					toggle1={{
						text: "お気に入り",
						href: "/favorite",
						icon: <Bookmark size={24} />,
					}}
					toggle2={{
						text: "履歴",
						href: "/history",
						icon: <History size={24} />,
					}}
				/>
				<div className="flex flex-row items-center justify-end gap-5">
					<span className="font-medium">並び替え</span>
					<hr className="w-0.5 h-4 bg-black" />
					<label className="flex items-center">
						<input
							className="peer appearance-none"
							type="radio"
							name="sort"
							value="new"
							defaultChecked
						/>
						<span className="peer-checked:font-bold">新着順</span>
					</label>
					<label className="flex items-center">
						<input
							className="peer appearance-none"
							type="radio"
							name="sort"
							value="calories"
						/>
						<span className="peer-checked:font-bold">消費カロリー</span>
					</label>
					<label className="flex items-center">
						<input
							className="peer appearance-none"
							type="radio"
							name="sort"
							value="intensity"
						/>
						<span className="peer-checked:font-bold">運動強度</span>
					</label>
				</div>

				{/* お気に入りリスト（ここにコンテンツが入る） */}
				<Card />

				{/* ページネーション */}
				<nav aria-label="ページネーション" className="flex justify-center">
					<ul className="flex items-center gap-2">
						<li>
							<Link
								href="/favorite?page=1"
								className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100"
								aria-label="前のページ"
							>
								<ChevronLeft size={20} />
							</Link>
						</li>
						<li>
							<Link
								href="/favorite?page=1"
								className="flex items-center justify-center w-10 h-10 rounded-md bg-main text-white font-medium"
								aria-current="page"
							>
								1
							</Link>
						</li>
						<li>
							<Link
								href="/favorite?page=2"
								className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100"
							>
								2
							</Link>
						</li>
						<li>
							<Link
								href="/favorite?page=3"
								className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100"
							>
								3
							</Link>
						</li>
						<li>
							<span className="flex items-center justify-center w-10 h-10">
								...
							</span>
						</li>
						<li>
							<Link
								href="/favorite?page=10"
								className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100"
							>
								10
							</Link>
						</li>
						<li>
							<Link
								href="/favorite?page=2"
								className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100"
								aria-label="次のページ"
							>
								<ChevronRight size={20} />
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
