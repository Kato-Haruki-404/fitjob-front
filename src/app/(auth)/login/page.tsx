"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { z } from "zod";
import { AuthLayout } from "@/components/auth/auth-layout";
import Button from "@/components/ui/button";
import { TextField } from "@/components/ui/form-fields";

const loginFormSchema = z.object({
	email: z.email("有効なメールアドレスを入力してください"),
	password: z.string().min(1, "パスワードを入力してください。"),
});

export default function LoginPage() {
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: loginFormSchema,
		},
		onSubmit: async ({ value }) => {
			// Do something with form data
			alert(JSON.stringify(value, null, 2));
		},
	});

	const isSubmitting = form.state.isSubmitting;
	const isSubmitted = form.state.isSubmitted;

	return (
		<AuthLayout title="ログイン">
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
								autoComplete="current-password"
							/>
						)}
					</form.Field>
				</div>
				<Button className="w-full" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "ログイン中..." : "ログイン"}
				</Button>
				<Link href="/signup" className="underline">
					アカウントをお持ちでない方はコチラ
				</Link>
			</form>
		</AuthLayout>
	);
}
