import { z } from "zod";

export const PREFECTURES = [
	"北海道",
	"青森県",
	"岩手県",
	"宮城県",
	"秋田県",
	"山形県",
	"福島県",
	"茨城県",
	"栃木県",
	"群馬県",
	"埼玉県",
	"千葉県",
	"東京都",
	"神奈川県",
	"新潟県",
	"富山県",
	"石川県",
	"福井県",
	"山梨県",
	"長野県",
	"岐阜県",
	"静岡県",
	"愛知県",
	"三重県",
	"滋賀県",
	"京都府",
	"大阪府",
	"兵庫県",
	"奈良県",
	"和歌山県",
	"鳥取県",
	"島根県",
	"岡山県",
	"広島県",
	"山口県",
	"徳島県",
	"香川県",
	"愛媛県",
	"高知県",
	"福岡県",
	"佐賀県",
	"長崎県",
	"熊本県",
	"大分県",
	"宮崎県",
	"鹿児島県",
	"沖縄県",
] as const;

export type Prefecture = (typeof PREFECTURES)[number];

export const prefectureSchema = z.enum(PREFECTURES, {
	error: "都道府県を選択してください",
});

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
		.max(100, { error: "苗字のふりがなが長すぎます" })
		.regex(/^[\u3041-\u3096]+$/, {
			message: "ふりがなはひらがなで入力してください",
		}),
	furiganaFirstName: z
		.string()
		.min(1, { error: "名前のふりがなを入力してください" })
		.max(100, { error: "名前のふりがなが長すぎます" })
		.regex(/^[\u3041-\u3096]+$/, {
			message: "ふりがなはひらがなで入力してください",
		}),
	dateOfBirth: z
		.number({ error: "日付を入力してください" })
		.min(1, { error: "日付を入力してください" })
		.max(31, { error: "正しくない日付です" }),
	monthOfBirth: z
		.number({ error: "月を入力してください" })
		.min(1, { error: "月を入力してください" })
		.max(12, { error: "正しくない月です" }),
	yearOfBirth: z
		.number({ error: "年を入力してください" })
		.min(1, { error: "年を入力してください" })
		.max(new Date().getFullYear(), { error: "正しくない年です" }),
	age: z
		.number({ error: "年齢を入力してください" })
		.min(0, { error: "年齢を入力してください" })
		.max(150, { error: "正しくない年齢です" }),
	gender: z.enum(["male", "female", "other"], {
		error: "性別を選択してください",
	}),
	postalCode: z
		.string()
		.min(1, { error: "郵便番号を入力してください" })
		.regex(/^[0-9-]+$/, {
			message: "郵便番号は数字とハイフンのみで入力してください",
		}),
	prefecture: prefectureSchema,
	address: z.string().min(1, { error: "残りの住所を入力してください" }),
	phoneNumber: z.string().min(1, { error: "電話番号を入力してください" }),
	identificationDocument: z.file({
		error: "本人確認書類をアップロードしてください",
	}),
	selfIntroduction: z.string().max(1000, { error: "自己紹介が長すぎます" }),
	resume: z.union([z.file(), z.undefined()]),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
