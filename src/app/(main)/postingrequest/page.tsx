"use client";

import { useForm, useStore } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import {
	FileField,
	NumberField,
	SelectField,
	TextField,
} from "@/components/ui/form-fields";
import {
	EMPLOYMENT_TYPES,
	PAY_TYPES,
	type PostingRequestFormValues,
	postingRequestSchema,
} from "@/schemas/posting-request";

export default function PostingRequestPage() {
	const router = useRouter();
	const defaultValues: Partial<PostingRequestFormValues> = {
		title: "",
		companyName: "",
		email: "",
		phoneNumber: "",
		payType: PAY_TYPES[0] as (typeof PAY_TYPES)[number],
		hourlyWage: undefined,
		employmentType: EMPLOYMENT_TYPES[0] as (typeof EMPLOYMENT_TYPES)[number],
		access: "",
		externalJobLink: "",
		jobImage: undefined,
	};

	const form = useForm({
		defaultValues,
		validators: {
			onChange: postingRequestSchema,
			onSubmit: postingRequestSchema,
		},
		onSubmit: async ({ value }) => {
			const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
			if (!apiBaseUrl) {
				return;
			}

			const formData = new FormData();
			// バリデーション後の値は完全であることを保証
			const validatedValue = value as PostingRequestFormValues;
			formData.append("title", validatedValue.title);
			formData.append("companyName", validatedValue.companyName);
			formData.append("email", validatedValue.email);
			formData.append("tel", validatedValue.phoneNumber);
			formData.append("salaryType", validatedValue.payType);
			formData.append("wage", String(validatedValue.hourlyWage));
			formData.append("employmentType", validatedValue.employmentType);
			formData.append("externalLinkUrl", validatedValue.externalJobLink);
			formData.append("image", validatedValue.jobImage);
			formData.append("access", validatedValue.access);

			const response = await fetch(`${apiBaseUrl}/api/jobs`, {
				method: "POST",
				body: formData,
				credentials: "include",
			});

			if (response.ok) {
				router.push("/postingrequest/complete");
			}
		},
	});

	const isSubmitting = useStore(form.store, (state) => state.isSubmitting);
	const shouldShowErrors =
		useStore(form.store, (state) => state.submissionAttempts) > 0;

	return (
		<div className="bg-linear-to-b from-[#F8B819] to-[#F0D320] min-h-screen flex flex-col items-center justify-start p-5">
			<div className="max-w-[620px] flex flex-col items-center px-5 pt-15 pb-10 bg-white rounded-3xl gap-10 w-full">
				<h1 className="text-center text-[28px] font-bold text-black">
					求人掲載申請フォーム
				</h1>
				<form
					className="flex w-full flex-col gap-5"
					onSubmit={(event) => {
						event.preventDefault();
						form.handleSubmit();
					}}
					onKeyDown={(event) => {
						if (
							event.key === "Enter" &&
							event.target instanceof HTMLInputElement
						) {
							event.preventDefault();
						}
					}}
				>
					<form.Field name="title">
						{(field) => (
							<TextField
								label="募集タイトル"
								placeholder="募集タイトル"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							/>
						)}
					</form.Field>
					<form.Field name="companyName">
						{(field) => (
							<TextField
								label="企業名"
								placeholder="企業名"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							/>
						)}
					</form.Field>
					<form.Field name="email">
						{(field) => (
							<TextField
								label="メールアドレス"
								placeholder="example@gmail.com"
								type="email"
								autoComplete="email"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							/>
						)}
					</form.Field>
					<form.Field name="phoneNumber">
						{(field) => (
							<TextField
								label="電話番号"
								placeholder="000-0000-0000"
								autoComplete="tel"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							/>
						)}
					</form.Field>
					<form.Field name="payType">
						{(field) => (
							<SelectField
								label="給与形態"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							>
								{PAY_TYPES.map((payType) => (
									<option key={payType} value={payType}>
										{payType}
									</option>
								))}
							</SelectField>
						)}
					</form.Field>
					<form.Field name="hourlyWage">
						{(field) => (
							<NumberField
								label="時給単価"
								placeholder="1200"
								min={0}
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							/>
						)}
					</form.Field>
					<form.Field name="employmentType">
						{(field) => (
							<SelectField
								label="雇用形態"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							>
								{EMPLOYMENT_TYPES.map((employmentType) => (
									<option key={employmentType} value={employmentType}>
										{employmentType}
									</option>
								))}
							</SelectField>
						)}
					</form.Field>
					<form.Field name="access">
						{(field) => (
							<TextField
								label="アクセス"
								placeholder="例： 愛知県名古屋市中村区太閤３丁目２−１４"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							/>
						)}
					</form.Field>
					<form.Field name="externalJobLink">
						{(field) => (
							<TextField
								label="外部の求人リンク"
								placeholder="https://example.com"
								autoComplete="url"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							/>
						)}
					</form.Field>
					<form.Field name="jobImage">
						{(field) => (
							<FileField
								label="求人イメージ"
								accept="image/*"
								field={field}
								isSubmitted={shouldShowErrors}
								disabled={isSubmitting}
							/>
						)}
					</form.Field>
					<Button
						className="mt-5 w-full rounded-[10px]"
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? "求人申請中..." : "求人申請"}
					</Button>
				</form>
			</div>
		</div>
	);
}
