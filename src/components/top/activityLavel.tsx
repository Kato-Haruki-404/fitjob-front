import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ActivityLavels() {
	return (
		<div className="flex flex-col gap-5">
			<ActivityLavel
				bgColor="bg-activity-level-1"
				title="レベル1："
				text="座って行う作業が中心で、体への負担がほとんどない仕事"
			/>
			<ActivityLavel
				bgColor="bg-activity-level-2"
				title="レベル2："
				text="軽い立ち作業や短い移動があり、少し体を動かす仕事"
			/>
			<ActivityLavel
				bgColor="bg-activity-level-3"
				title="レベル3："
				text="接客や巡回など動き回る場面が多く、適度に体力を使う仕事"
			/>
			<ActivityLavel
				bgColor="bg-activity-level-4"
				title="レベル4："
				text="荷物運びや清掃など全身を使う場面が多く、はっきり疲労を感じる仕事"
			/>
			<ActivityLavel
				bgColor="bg-activity-level-5"
				title="レベル5："
				text="長時間の屋外作業や力仕事が中心で、体力を大きく消耗する仕事"
			/>
		</div>
	);
}

export function ActivityLavel({
	bgColor,
	title,
	text,
}: {
	bgColor: string;
	title: string;
	text: string;
}) {
	return (
		<Link
			href=""
			className={`p-3 rounded-lg flex flex-row gap-5 justify-between items-center ${bgColor} text-white`}
		>
			<div className="flex flex-row gap-2 items-center">
				<h3 className="shrink-0">{title}</h3>
				<p>{text}</p>
			</div>
			<ChevronRight />
		</Link>
	);
}
