import { BadgeJapaneseYen, Bookmark, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ActivityIcons from "./activityIcons";

type CardProps = {
	title: string;
	company: string;
	wage: string;
	location: string;
	imageSrc: string;
	imageAlt: string;
	activityLevel: number;
	bookmarkAriaLabel: string;
	className?: string;
	link: string;
};

export default function Card({
	title,
	company,
	wage,
	location,
	imageSrc,
	imageAlt,
	activityLevel,
	bookmarkAriaLabel,
	link,
	className,
}: CardProps) {
	const rootClassName =
		"flex flex-col sm:flex-row gap-5 items-start bg-white border border-[rgba(215,215,215,0.49)] rounded-[20px] shadow-card p-5 overflow-hidden" +
		(className ? ` ${className}` : "");
	return (
		<Link href={link}>
			<article className={rootClassName}>
				<div className="bg-[#cecece] w-full sm:w-50 aspect-10/7 shrink-0 overflow-hidden">
					<Image
						src={imageSrc}
						alt={imageAlt}
						width={200}
						height={140}
						className="h-full w-full object-cover"
						sizes="(min-width: 640px) 200px, 100vw"
					/>
				</div>
				<div className="flex flex-1 flex-col justify-between gap-5 self-stretch">
					<div className="flex flex-col gap-5">
						<div className="flex items-start justify-between gap-4">
							<div className="flex flex-col gap-2">
								<h3 className="text-xl font-bold text-foreground">{title}</h3>
								<p className="text-sm text-[#757575]">{company}</p>
							</div>
							<button
								type="button"
								aria-label={bookmarkAriaLabel}
								className="shrink-0"
							>
								<Bookmark size={28} />
							</button>
						</div>
						<div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
							<div className="flex items-center gap-2.5">
								<BadgeJapaneseYen size={20} />
								<p className="text-black font-medium leading-none">
									<span className="text-base">{wage} </span>
									<span className="text-sm">円</span>
								</p>
							</div>
							<div className="flex items-center gap-2.5">
								<MapPin size={20} />
								<p className="text-base font-medium text-foreground">
									{location}
								</p>
							</div>
						</div>
					</div>
					<ActivityIcons level={activityLevel} />
				</div>
			</article>
		</Link>
	);
}
