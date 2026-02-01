import type { AnyFieldApi } from "@tanstack/react-form";
import { Field, Input, Label, Select, Textarea } from "./form";

type BaseFieldProps = {
	label?: string;
	field: AnyFieldApi;
	isSubmitted: boolean;
	disabled?: boolean;
};

function getErrorState(field: AnyFieldApi, isSubmitted: boolean) {
	const errorMessage = field.state.meta.errors[0];
	const shouldShowError =
		field.state.meta.errors.length > 0 &&
		(field.state.meta.isTouched || isSubmitted);
	return { errorMessage, shouldShowError };
}

function ErrorMessage({ message }: { message?: string }) {
	if (!message) return null;
	return <p className="text-sm text-red-600">{message}</p>;
}

// TextField
type TextFieldProps = BaseFieldProps & {
	placeholder?: string;
	type?: "text" | "email" | "password";
	autoComplete?: string;
};

export function TextField({
	label,
	field,
	isSubmitted,
	disabled,
	placeholder,
	type = "text",
	autoComplete,
}: TextFieldProps) {
	const { errorMessage, shouldShowError } = getErrorState(field, isSubmitted);

	return (
		<Field>
			{label && <Label>{label}</Label>}
			<Input
				placeholder={placeholder}
				type={type}
				autoComplete={autoComplete}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				disabled={disabled}
				aria-invalid={shouldShowError}
			/>
			{shouldShowError && <ErrorMessage message={errorMessage?.message} />}
		</Field>
	);
}

// NumberField
type NumberFieldProps = BaseFieldProps & {
	placeholder?: string;
};

export function NumberField({
	label,
	field,
	isSubmitted,
	disabled,
	placeholder,
}: NumberFieldProps) {
	const { errorMessage, shouldShowError } = getErrorState(field, isSubmitted);

	return (
		<Field>
			{label && <Label>{label}</Label>}
			<Input
				type="number"
				placeholder={placeholder}
				name={field.name}
				value={field.state.value ?? ""}
				onBlur={field.handleBlur}
				onChange={(e) => {
					const value = e.target.value;
					field.handleChange(value === "" ? undefined : Number(value));
				}}
				disabled={disabled}
				aria-invalid={shouldShowError}
			/>
			{shouldShowError && <ErrorMessage message={errorMessage?.message} />}
		</Field>
	);
}

// SelectField
type SelectFieldProps = BaseFieldProps & {
	children: React.ReactNode;
};

export function SelectField({
	label,
	field,
	isSubmitted,
	disabled,
	children,
}: SelectFieldProps) {
	const { errorMessage, shouldShowError } = getErrorState(field, isSubmitted);

	return (
		<Field>
			{label && <Label>{label}</Label>}
			<Select
				value={field.state.value ?? ""}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				disabled={disabled}
				aria-invalid={shouldShowError}
			>
				{children}
			</Select>
			{shouldShowError && <ErrorMessage message={errorMessage?.message} />}
		</Field>
	);
}

// FileField
type FileFieldProps = BaseFieldProps & {
	accept?: string;
};

export function FileField({
	label,
	field,
	isSubmitted,
	disabled,
	accept,
}: FileFieldProps) {
	const { errorMessage, shouldShowError } = getErrorState(field, isSubmitted);

	return (
		<Field>
			{label && <Label>{label}</Label>}
			<Input
				type="file"
				name={field.name}
				onBlur={field.handleBlur}
				accept={accept}
				onChange={(e) => {
					const files = e.target.files;
					if (!files) return;
					field.handleChange(files[0]);
				}}
				disabled={disabled}
				aria-invalid={shouldShowError}
			/>
			{shouldShowError && <ErrorMessage message={errorMessage?.message} />}
		</Field>
	);
}

// TextareaField
type TextareaFieldProps = BaseFieldProps & {
	placeholder?: string;
};

export function TextareaField({
	label,
	field,
	isSubmitted,
	disabled,
	placeholder,
}: TextareaFieldProps) {
	const { errorMessage, shouldShowError } = getErrorState(field, isSubmitted);

	return (
		<Field>
			{label && <Label>{label}</Label>}
			<Textarea
				placeholder={placeholder}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				disabled={disabled}
				aria-invalid={shouldShowError}
			/>
			{shouldShowError && <ErrorMessage message={errorMessage?.message} />}
		</Field>
	);
}
