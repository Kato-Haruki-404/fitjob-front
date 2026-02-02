"use client";

import { useForm } from "@tanstack/react-form";
import { AuthLayout } from "@/components/auth/auth-layout";
import Button from "@/components/ui/button";
import {
	FileField,
	NumberField,
	SelectField,
	TextareaField,
	TextField,
} from "@/components/ui/form-fields";
import { profileSchema } from "@/schemas/profile";

export default function ProfilePage() {
	const form = useForm({
		defaultValues: {
			lastName: "",
			firstName: "",
			furiganaLastName: "",
			furiganaFirstName: "",
			dateOfBirth: undefined as number | undefined,
			monthOfBirth: undefined as number | undefined,
			yearOfBirth: undefined as number | undefined,
			age: undefined as number | undefined,
			gender: undefined as "male" | "female" | "other" | undefined,
			postalCode: "",
			prefecture: "",
			address: "",
			phoneNumber: "",
			identificationDocument: undefined as File | undefined,
			selfIntroduction: "",
			resume: undefined as File | undefined,
		},
		validators: {
			onChange: profileSchema,
			onSubmit: profileSchema,
		},
		onSubmit: async ({ value }) => {
			// Do something with form data
			alert(JSON.stringify(value, null, 2));
		},
	});

	const isSubmitting = form.state.isSubmitting;
	const isSubmitted = form.state.isSubmitted;

	const now = new Date();
	const nowYear = now.getFullYear();
	const nowMonth = now.getMonth() + 1;
	const nowDate = now.getDate();

	return (
		<AuthLayout title="プロフィール作成" maxWidth="2xl">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					void form.handleSubmit();
				}}
				className="flex flex-col items-center gap-10 w-full font-medium"
				onKeyDown={(e) => {
					if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
						e.preventDefault();
					}
				}}
			>
				<div className="flex flex-col gap-5 w-full">
					{/* 氏名 */}
					<h2>
						氏名 <span className="text-red-500">*</span>
					</h2>
					<div className="flex flex-row gap-3">
						<form.Field name="lastName">
							{(field) => (
								<TextField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="山田"
								/>
							)}
						</form.Field>
						<form.Field name="firstName">
							{(field) => (
								<TextField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="太郎"
								/>
							)}
						</form.Field>
					</div>

					{/* ふりがな */}
					<h2>
						ふりがな <span className="text-red-500">*</span>
					</h2>
					<div className="flex flex-row gap-3">
						<form.Field name="furiganaLastName">
							{(field) => (
								<TextField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="やまだ"
								/>
							)}
						</form.Field>
						<form.Field name="furiganaFirstName">
							{(field) => (
								<TextField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="たろう"
								/>
							)}
						</form.Field>
					</div>

					{/* 生年月日 */}
					<div className="flex flex-col gap-3">
						<h2>
							生年月日 <span className="text-red-500">*</span>
						</h2>
						<div className="flex flex-col md:flex-row gap-3">
							<form.Field name="yearOfBirth">
								{(field) => (
									<NumberField
										field={field}
										isSubmitted={isSubmitted}
										disabled={isSubmitting}
										placeholder={nowYear.toString()}
										min={0}
									/>
								)}
							</form.Field>
							<form.Field name="monthOfBirth">
								{(field) => (
									<NumberField
										field={field}
										isSubmitted={isSubmitted}
										disabled={isSubmitting}
										placeholder={nowMonth.toString()}
										min={0}
									/>
								)}
							</form.Field>
							<form.Field name="dateOfBirth">
								{(field) => (
									<NumberField
										field={field}
										isSubmitted={isSubmitted}
										disabled={isSubmitting}
										placeholder={nowDate.toString()}
										min={0}
									/>
								)}
							</form.Field>
						</div>
					</div>

					{/* 年齢 */}
					<div className="flex flex-col gap-3">
						<h2>
							年齢 <span className="text-red-500">*</span>
						</h2>
						<form.Field name="age">
							{(field) => (
								<NumberField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="20"
									min={0}
								/>
							)}
						</form.Field>
					</div>

					{/* 性別 */}
					<div className="flex flex-col gap-3">
						<h2>
							性別 <span className="text-red-500">*</span>
						</h2>
						<form.Field name="gender">
							{(field) => (
								<SelectField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
								>
									<option value="" disabled>
										選択してください
									</option>
									<option value="male">男</option>
									<option value="female">女</option>
									<option value="other">その他</option>
								</SelectField>
							)}
						</form.Field>
					</div>

					{/* 郵便番号 */}
					<div className="flex flex-col gap-3">
						<h2>
							郵便番号 <span className="text-red-500">*</span>
						</h2>
						<form.Field name="postalCode">
							{(field) => (
								<TextField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="000-1234"
								/>
							)}
						</form.Field>
					</div>

					{/* 都道府県 */}
					<div className="flex flex-col gap-3">
						<h2>
							都道府県 <span className="text-red-500">*</span>
						</h2>
						<form.Field name="prefecture">
							{(field) => (
								<TextField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="愛知県"
								/>
							)}
						</form.Field>
					</div>

					{/* 住所 */}
					<div className="flex flex-col gap-3">
						<h2>
							住所 <span className="text-red-500">*</span>
						</h2>
						<form.Field name="address">
							{(field) => (
								<TextField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="名古屋市中区栄1-1-1 フィットジョブビル101"
								/>
							)}
						</form.Field>
					</div>

					{/* 電話番号 */}
					<div className="flex flex-col gap-3">
						<h2>
							電話番号 <span className="text-red-500">*</span>
						</h2>
						<form.Field name="phoneNumber">
							{(field) => (
								<TextField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									placeholder="000-1234-5678"
								/>
							)}
						</form.Field>
					</div>

					{/* 本人確認書類 */}
					<div className="flex flex-col gap-3">
						<h2>
							本人確認書類 <span className="text-red-500">*</span>
						</h2>
						<form.Field name="identificationDocument">
							{(field) => (
								<FileField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									accept="image/*"
								/>
							)}
						</form.Field>
					</div>

					{/* 自己紹介 */}
					<div className="flex flex-col gap-3">
						<h2>自己紹介</h2>
						<form.Field name="selfIntroduction">
							{(field) => (
								<TextareaField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
								/>
							)}
						</form.Field>
					</div>

					{/* 履歴書 */}
					<div className="flex flex-col gap-3">
						<h2>履歴書</h2>
						<form.Field name="resume">
							{(field) => (
								<FileField
									field={field}
									isSubmitted={isSubmitted}
									disabled={isSubmitting}
									accept=".pdf,.doc,.docx,image/*"
								/>
							)}
						</form.Field>
					</div>
				</div>
				<Button className="w-full" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "プロフィールを作成中..." : "プロフィールを作成"}
				</Button>
			</form>
		</AuthLayout>
	);
}
