"use client";

import { BadgeJapaneseYen, Bookmark, MapPin } from "lucide-react";
import Image from "next/image";
import ActivityIcons from "./activityIcons";

type CardProps = {
	title: string;
	companyName: string;
	salaryType: "時給" | "日給";
	wage: number;
	image: string;
	momentum: {
		calorie: number;
		steps: number;
		exerciseLevel: number;
	} | null;
	address: {
		prefecture: string;
		city: string;
		nearestStation: string;
	} | null;
	className?: string;
	onClick?: () => void;
	isBookmarked?: boolean;
	onBookmarkClick?: () => void;
};

export default function Card({
	title,
	companyName,
	salaryType,
	wage,
	image,
	momentum,
	address,
	className,
	onClick,
	isBookmarked = false,
	onBookmarkClick,
}: CardProps) {
	const rootClassName =
		"relative flex flex-col sm:flex-row gap-5 items-start bg-white border border-[rgba(215,215,215,0.49)] rounded-[20px] shadow-card p-5 overflow-hidden cursor-pointer" +
		(className ? ` ${className}` : "");
	const location = address
		? `${address.prefecture}${address.city} ${address.nearestStation}`
		: "未設定";
	const activityLevel = momentum?.exerciseLevel ?? 0;
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (onClick && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault();
			onClick();
		}
	};

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	const handleBookmarkClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (onBookmarkClick) {
			onBookmarkClick();
		}
	};

	const handleBookmarkKeyDown = (e: React.KeyboardEvent) => {
		if (onBookmarkClick && (e.key === "Enter" || e.key === " ")) {
			e.preventDefault();
			e.stopPropagation();
			onBookmarkClick();
		}
	};

	return (
		<article
			className={rootClassName}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			role={onClick ? "button" : undefined}
			tabIndex={onClick ? 0 : undefined}
		>
			<div className="bg-[#cecece] w-full sm:w-50 aspect-10/7 shrink-0 overflow-hidden">
				<Image
					src={image}
					alt={title}
					width={200}
					height={140}
					className="h-full w-full object-cover"
					sizes="(min-width: 640px) 200px, 100vw"
					unoptimized={true}
				/>
			</div>
			<div className="flex flex-1 flex-col justify-between gap-5 self-stretch">
				<div className="flex flex-col gap-5">
					<div className="flex items-start justify-between gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-xl font-bold text-foreground">{title}</h3>
							<p className="text-sm text-[#757575]">{companyName}</p>
						</div>
						<button
							type="button"
							aria-label={
								isBookmarked
									? `${title}のブックマークを解除`
									: `${title}をブックマーク`
							}
							aria-pressed={isBookmarked}
							className="relative z-20 shrink-0 transition-colors"
							onClick={handleBookmarkClick}
							onKeyDown={handleBookmarkKeyDown}
						>
							<Bookmark
								size={28}
								className={
									isBookmarked ? "fill-main text-main" : "text-gray-400"
								}
							/>
						</button>
					</div>
					<div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
						<div className="flex items-center gap-2.5">
							<BadgeJapaneseYen size={20} />
							<p className="text-black font-medium leading-none">
								<span className="text-base">
									{salaryType} {wage.toLocaleString()}
								</span>
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
	);
}
