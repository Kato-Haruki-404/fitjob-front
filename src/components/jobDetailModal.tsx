import {
	BadgeJapaneseYen,
	Building2,
	Mail,
	MapPin,
	Phone,
	UserRound,
	X,
} from "lucide-react";
import Image from "next/image";
import Button from "@/components/ui/button";

type JobDetailModalProps = {
	title: string;
	company: string;
	imageSrc: string;
	imageAlt: string;
	calories: string;
	calorieIconCount?: number;
	steps: string;
	stepsIconCount?: number;
	intensityLevel?: number;
	wage: string;
	access: string;
	employmentType: string;
	tags: string[];
	companyName: string;
	email: string;
	phone: string;
	onClose?: () => void;
	onApply?: () => void;
	className?: string;
};

type IconMeterProps = {
	iconSrc: string;
	iconAlt: string;
	count: number;
	activeCount?: number;
	activeClassName?: string;
	inactiveClassName?: string;
};

function IconMeter({
	iconSrc,
	iconAlt,
	count,
	activeCount = count,
	activeClassName = "",
	inactiveClassName = "opacity-40",
}: IconMeterProps) {
	const iconKeys = Array.from({ length: count }, (_, index) => index + 1);
	return (
		<div className="flex items-center gap-3">
			{iconKeys.map((key, index) => {
				const isActive = index < activeCount;
				const colorClass = isActive ? activeClassName : inactiveClassName;
				return (
					<Image
						key={`${iconSrc}-${key}`}
						src={iconSrc}
						alt={iconAlt}
						width={24}
						height={24}
						unoptimized={true}
						className={`size-6 ${colorClass}`}
						aria-hidden="true"
					/>
				);
			})}
		</div>
	);
}

export default function JobDetailModal({
	title,
	company,
	imageSrc,
	imageAlt,
	calories,
	calorieIconCount = 12,
	steps,
	stepsIconCount = 12,
	intensityLevel = 5,
	wage,
	access,
	employmentType,
	tags,
	companyName,
	email,
	phone,
	onClose,
	onApply,
	className,
}: JobDetailModalProps) {
	const rootClassName =
		"flex w-full min-w-[320px] sm:min-w-3xl max-w-[780px] flex-col gap-10 rounded-[20px] bg-white p-8 shadow-card" +
		(className ? ` ${className}` : "");
	const intensityCount = Math.max(0, Math.min(5, Math.round(intensityLevel)));
	const tagCounts = new Map<string, number>();
	const tagItems = tags.map((tag) => {
		const count = (tagCounts.get(tag) ?? 0) + 1;
		tagCounts.set(tag, count);
		return { tag, key: `${tag}-${count}` };
	});

	return (
		<section className={rootClassName}>
			<div className="flex items-center justify-end">
				<button
					type="button"
					aria-label="閉じる"
					onClick={onClose}
					className="flex size-10 items-center justify-center rounded-full transition hover:bg-black/5"
				>
					<X className="size-5 text-black" />
				</button>
			</div>

			<div className="flex justify-center">
				<div className="relative w-full max-w-105 overflow-hidden bg-[#cecece] aspect-4/3">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover"
						sizes="(min-width: 768px) 420px, 100vw"
						unoptimized={true}
					/>
				</div>
			</div>

			<div className="flex flex-col gap-3">
				<h2 className="text-[24px] font-bold text-foreground">{title}</h2>
				<p className="text-base text-[#757575]">{company}</p>
			</div>

			<div className="flex flex-col gap-5">
				<h3 className="text-[24px] font-bold text-foreground">
					1時間あたりの運動目安
				</h3>
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-5">
						<p className="min-w-24 text-[20px] font-medium text-foreground">
							消費カロリー
						</p>
						<div className="flex items-center gap-3">
							<p className="text-[20px] font-medium text-black">{calories}</p>
							<IconMeter
								iconSrc="/emoji_burger.svg"
								iconAlt=""
								count={calorieIconCount}
								activeClassName=""
								inactiveClassName="opacity-40"
							/>
						</div>
					</div>
					<div className="flex items-center gap-11">
						<p className="min-w-24 text-[20px] font-medium text-foreground">
							歩数
						</p>
						<div className="flex items-center gap-7.5">
							<p className="text-[20px] font-medium text-black">{steps}</p>
							<IconMeter
								iconSrc="/emoji_shoes.svg"
								iconAlt=""
								count={stepsIconCount}
								activeClassName=""
								inactiveClassName="opacity-40"
							/>
						</div>
					</div>
					<div className="flex items-center gap-11">
						<p className="min-w-24 text-[20px] font-medium text-foreground">
							運動強度
						</p>
						<IconMeter
							iconSrc="/twemoji-flexed-biceps.svg"
							iconAlt=""
							count={5}
							activeCount={intensityCount}
							activeClassName=""
							inactiveClassName="invisible"
						/>
					</div>
				</div>
			</div>

			<div className="h-0.5 w-full bg-[#d7d7d7]" />

			<div className="flex flex-col gap-5">
				<h3 className="text-[24px] font-bold text-foreground">求人情報</h3>
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-5">
						<div className="flex min-w-23 items-center gap-2">
							<BadgeJapaneseYen className="size-6" />
							<span className="text-[20px] font-medium text-foreground">
								時給
							</span>
						</div>
						<p className="text-foreground font-medium">
							<span className="text-[20px]">{wage} </span>
							<span className="text-[16px]">円</span>
						</p>
					</div>
					<div className="flex items-center gap-5">
						<div className="flex min-w-23 items-center gap-2">
							<MapPin className="size-6" />
							<span className="text-[20px] font-medium text-foreground">
								アクセス
							</span>
						</div>
						<p className="text-[20px] font-medium text-foreground">{access}</p>
					</div>
					<div className="flex items-center gap-5">
						<div className="flex min-w-23 items-center gap-2">
							<UserRound className="size-6" />
							<span className="text-[20px] font-medium text-foreground">
								雇用形態
							</span>
						</div>
						<p className="text-[20px] font-medium text-foreground">
							{employmentType}
						</p>
					</div>
				</div>
				<div className="flex flex-wrap gap-x-5 gap-y-2">
					{tagItems.map(({ tag, key }) => (
						<span
							key={key}
							className="rounded-[5px] border border-[#d7d7d7] px-2 py-2 text-[16px] font-medium text-foreground"
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			<div className="h-0.5 w-full bg-[#d7d7d7]" />

			<div className="flex flex-col gap-5">
				<h3 className="text-[24px] font-bold text-foreground">企業情報</h3>
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-5">
						<div className="flex min-w-23 items-center gap-2">
							<Building2 className="size-6" />
							<span className="text-[20px] font-medium text-foreground">
								企業名
							</span>
						</div>
						<p className="text-[20px] font-medium text-foreground">
							{companyName}
						</p>
					</div>
					<div className="flex items-center gap-5">
						<div className="flex min-w-23 items-center gap-2">
							<Mail className="size-6" />
							<span className="text-[20px] font-medium text-foreground">
								メールアドレス
							</span>
						</div>
						<p className="text-[20px] font-medium text-foreground">{email}</p>
					</div>
					<div className="flex items-center gap-5">
						<div className="flex min-w-23 items-center gap-2">
							<Phone className="size-6" />
							<span className="text-[20px] font-medium text-foreground">
								電話番号
							</span>
						</div>
						<p className="text-[20px] font-medium text-foreground">{phone}</p>
					</div>
				</div>
			</div>

			<div className="flex justify-center">
				<Button
					onClick={onApply}
					className="inline-flex h-12 w-full max-w-105 items-center justify-center rounded-[10px] py-0 text-[20px] font-medium leading-none"
				>
					募集を見る
				</Button>
			</div>
		</section>
	);
}
