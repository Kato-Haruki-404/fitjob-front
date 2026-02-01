import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import Button from "@/components/ui/button";
import { Field, Input, Label } from "@/components/ui/form";

const { fieldContext, formContext } = createFormHookContexts();

const fieldComponents = { Field, Input, Label };
const formComponents = { Button };

export const { useAppForm, withForm } = createFormHook({
	fieldComponents,
	formComponents,
	fieldContext,
	formContext,
});
