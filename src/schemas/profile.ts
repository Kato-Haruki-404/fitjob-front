import { z } from "zod";

export const profileSchema = z.object({
	lastName: z
		.string()
		.min(1, { error: "苗字を入力してください" })
		.max(100, { error: "苗字が長すぎます" }),
	firstName: z
		.string()
		.min(1, { error: "名前を入力してください" })
		.max(100, { error: "名前が長すぎます" }),
	furiganaLastName: z
		.string()
		.min(1, { error: "苗字のふりがなを入力してください" })
		.max(100, { error: "苗字のふりがなが長すぎます" }),
	furiganaFirstName: z
		.string()
		.min(1, { error: "名前のふりがなを入力してください" })
		.max(100, { error: "名前のふりがなが長すぎます" }),
	dateOfBirth: z
		.number({ error: "生年月日を入力してください" })
		.min(1, { error: "生年月日を入力してください" })
		.max(31, { error: "正しくない日付です" }),
	monthOfBirth: z
		.number({ error: "生年月日を入力してください" })
		.min(1, { error: "生年月日を入力してください" })
		.max(12, { error: "正しくない月です" }),
	yearOfBirth: z
		.number({ error: "生年月日を入力してください" })
		.min(1, { error: "生年月日を入力してください" })
		.max(new Date().getFullYear(), { error: "正しくない年です" }),
	age: z
		.number({ error: "年齢を入力してください" })
		.min(0, { error: "年齢を入力してください" })
		.max(150, { error: "正しくない年齢です" }),
	gender: z.enum(["male", "female", "other"], {
		error: "性別を選択してください",
	}),
	postalCode: z.string().min(1, { error: "郵便番号を入力してください" }),
	prefecture: z.string().min(1, { error: "都道府県を入力してください" }),
	address: z.string().min(1, { error: "残りの住所を入力してください" }),
	phoneNumber: z.string().min(1, { error: "電話番号を入力してください" }),
	identificationDocument: z.file({
		error: "本人確認書類をアップロードしてください",
	}),
	selfIntroduction: z.string().max(1000, { error: "自己紹介が長すぎます" }),
	resume: z.union([z.file(), z.undefined()]),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
