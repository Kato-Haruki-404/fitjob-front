"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { z } from "zod";
import { AuthLayout } from "@/components/auth/auth-layout";
import Button from "@/components/ui/button";
import { TextField } from "@/components/ui/form-fields";

const signUpFormSchema = z
	.object({
		email: z.email("有効なメールアドレスを入力してください"),
		password: z
			.string()
			.min(8, "パスワードは8文字以上である必要があります")
			.max(100, "パスワードは100文字以内である必要があります")
			.regex(
				/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
				"パスワードは半角英数字混合である必要があります",
			),
		passwordConfirm: z.string().min(1, "確認用のパスワードを入力してください"),
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				path: ["passwordConfirm"],
				code: "custom",
				message: "パスワードが一致しません",
			});
		}
	});

export default function SignUpPage() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			passwordConfirm: "",
		},
		validators: {
			onChange: signUpFormSchema,
		},
		onSubmit: async ({ value }) => {
			// Do something with form data
			alert(JSON.stringify(value, null, 2));
		},
	});

	const isSubmitting = form.state.isSubmitting;
	const isSubmitted = form.state.isSubmitted;

	return (
		<AuthLayout title="アカウント作成">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					void form.handleSubmit();
				}}
				className="flex flex-col items-center gap-10 w-full"
			>
				<div className="flex flex-col gap-5 w-full">
					<form.Field name="email">
						{(field) => (
							<TextField
								label="メールアドレス"
								field={field}
								isSubmitted={isSubmitted}
								disabled={isSubmitting}
								placeholder="example@example.com"
								type="email"
								autoComplete="email"
							/>
						)}
					</form.Field>
					<form.Field name="password">
						{(field) => (
							<TextField
								label="パスワード"
								field={field}
								isSubmitted={isSubmitted}
								disabled={isSubmitting}
								placeholder="password"
								type="password"
								autoComplete="new-password"
							/>
						)}
					</form.Field>
					<form.Field name="passwordConfirm">
						{(field) => (
							<TextField
								label="パスワード確認"
								field={field}
								isSubmitted={isSubmitted}
								disabled={isSubmitting}
								placeholder="password"
								type="password"
								autoComplete="new-password"
							/>
						)}
					</form.Field>
				</div>
				<Button className="w-full" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "アカウント作成中..." : "アカウント作成"}
				</Button>
				<Link href="/login" className="underline">
					アカウントをお持ちの方はコチラ
				</Link>
			</form>
		</AuthLayout>
	);
}
