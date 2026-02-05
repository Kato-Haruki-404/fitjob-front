import { z } from "zod";

export const PAY_TYPES = ["時給", "日給"] as const;
export const EMPLOYMENT_TYPES = ["パートタイム", "アルバイト"] as const;

export const postingRequestSchema = z.object({
	title: z.string().min(1, { message: "募集タイトルを入力してください" }),
	companyName: z.string().min(1, { message: "企業名を入力してください" }),
	email: z.email({ message: "有効なメールアドレスを入力してください" }),
	phoneNumber: z.string().min(1, { message: "電話番号を入力してください" }),
	payType: z.enum(PAY_TYPES, { message: "給与形態を選択してください" }),
	hourlyWage: z.number({ message: "時給単価を入力してください" }),
	employmentType: z.enum(EMPLOYMENT_TYPES, {
		message: "雇用形態を選択してください",
	}),
	access: z.string().min(1, { message: "アクセスを入力してください" }),
	externalJobLink: z.url({ message: "有効なURLを入力してください" }),
	jobImage: z.instanceof(File, { message: "求人イメージを選択してください" }),
});

export type PostingRequestFormValues = z.infer<typeof postingRequestSchema>;
