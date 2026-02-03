import { BadgeJapaneseYen, MapPin } from "lucide-react";
import Button from "./ui/button";

export default function Card() {
	return (
		<div className="flex flex-col gap-4 p-5 rounded-3xl shadow-card  bg-white">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 ">
					<h3 className="font-bold text-2xl">荷物運搬スタッフ</h3>
					<p className="font-medium text-[#757575]">
						アマゾンジャパン合同会社 愛知笠寺デリバリーステーション
					</p>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-2 items-center">
						<div className="flex flex-row items-center gap-1 font-medium min-w-24 shrink-0">
							<BadgeJapaneseYen size={18} />
							<span>時給</span>
						</div>
						<span>1,200円〜</span>
					</div>
					<div className="flex flex-row gap-2 items-center">
						<div className="flex flex-row items-center gap-1 font-medium min-w-24 shrink-0">
							<MapPin size={18} />
							<span>アクセス</span>
						</div>
						<span>愛知県 名古屋市 名駅 / 名古屋駅 徒歩1分</span>
					</div>
				</div>
			</div>
			<div className="flex flex-row justify-between items-end">
				<div className="flex flex-col gap-4">
					<h3 className="font-bold text-xl">1時間あたりの運動目安</h3>
					<div className="flex flex-col gap-2">
						<div className="flex flex-row items-center gap-2">
							<span className="font-medium min-w-24 shrink-0">
								消費カロリー
							</span>
							<span>200kcal</span>
						</div>
						<div className="flex flex-row items-center gap-2">
							<span className="font-medium min-w-24 shrink-0">歩数</span>
							<span>800歩</span>
						</div>
						<div className="flex flex-row items-center gap-2">
							<span className="font-medium min-w-24 shrink-0">運動強度</span>
							<span className="bg-activity-level-1 rounded py-1 px-2 text-sm text-white">
								レベル1
							</span>
						</div>
					</div>
				</div>
				<Button>確認する</Button>
			</div>
		</div>
	);
}
