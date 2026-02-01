"use client";

import Link from "next/link";
import { z } from "zod";
import Button from "@/components/ui/button";
import { Field as FormField, Input, Label } from "@/components/ui/form";
import { useAppForm } from "@/hooks/useForm";

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

export default function LoginPage() {
	const form = useAppForm({
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

	return (
		<div className="bg-linear-to-b from-[#F8B819] to-[#F0D320] h-full flex items-center justify-center">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					void form.handleSubmit();
				}}
				className="flex flex-col items-center px-5 pt-15 pb-10 bg-white rounded-3xl gap-10 w-full max-w-md m-5"
			>
				<h1 className="font-bold text-black text-3xl">アカウント作成</h1>
				<div className="flex flex-col gap-5 w-full">
					<form.Field name="email">
						{(field) => {
							const errorMessage = field.state.meta.errors[0];
							const shouldShowError =
								field.state.meta.errors.length > 0 &&
								(field.state.meta.isTouched || form.state.isSubmitted);

							return (
								<FormField>
									<Label>メールアドレス</Label>
									<Input
										type="email"
										autoComplete="email"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										disabled={isSubmitting}
										aria-invalid={shouldShowError}
									/>
									{shouldShowError ? (
										<p className="text-sm text-red-600">
											{errorMessage?.message}
										</p>
									) : null}
								</FormField>
							);
						}}
					</form.Field>
					<form.Field name="password">
						{(field) => {
							const errorMessage = field.state.meta.errors[0];
							const shouldShowError =
								field.state.meta.errors.length > 0 &&
								(field.state.meta.isTouched || form.state.isSubmitted);

							return (
								<FormField>
									<Label>パスワード</Label>
									<Input
										type="password"
										autoComplete="new-password"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										disabled={isSubmitting}
										aria-invalid={shouldShowError}
									/>
									{shouldShowError ? (
										<p className="text-sm text-red-600">
											{errorMessage?.message}
										</p>
									) : null}
								</FormField>
							);
						}}
					</form.Field>
					<form.Field name="passwordConfirm">
						{(field) => {
							const errorMessage = field.state.meta.errors[0];
							const shouldShowError =
								field.state.meta.errors.length > 0 &&
								(field.state.meta.isTouched || form.state.isSubmitted);

							return (
								<FormField>
									<Label>パスワード確認</Label>
									<Input
										type="password"
										autoComplete="new-password"
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										disabled={isSubmitting}
										aria-invalid={shouldShowError}
									/>
									{shouldShowError ? (
										<p className="text-sm text-red-600">
											{errorMessage?.message}
										</p>
									) : null}
								</FormField>
							);
						}}
					</form.Field>
				</div>
				<Button className="w-full" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "アカウント作成中..." : "アカウント作成"}
				</Button>
				<Link href="/login" className="underline">
					アカウントをお持ちの方はコチラ
				</Link>
			</form>
		</div>
	);
}
