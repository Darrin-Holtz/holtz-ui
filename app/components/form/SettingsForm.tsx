"use client";

import { useActionState, useEffect, useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { type State, UpdateUserSettings } from "@/app/actions";
import { userSettingsSchema } from "@/lib/productSchema";
import { SubmitButton } from "../SubmitButtons";

interface iAppProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function SettingsForm({ email, firstName, lastName }: iAppProps) {
  const router = useRouter();
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useActionState(UpdateUserSettings, initalState);
  const [clientErrors, setClientErrors] = useState<State["errors"]>();

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state.message);
    } else if (state?.status === "success") {
      toast.success(state.message);
      setClientErrors(undefined);
      router.refresh();
    }
  }, [router, state]);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const validation = userSettingsSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    });

    if (!validation.success) {
      event.preventDefault();
      setClientErrors(z.flattenError(validation.error).fieldErrors);
      return;
    }

    setClientErrors(undefined);
  };

  const fieldErrors = clientErrors ?? state?.errors;

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you will find settings regarding your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="grid gap-2">
          <Label>First Name</Label>
          <Input name="firstName" type="text" defaultValue={firstName} />
          {fieldErrors?.["firstName"]?.[0] && (
            <p className="text-sm text-destructive">{fieldErrors["firstName"][0]}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label>Last Name</Label>
          <Input name="lastName" type="text" defaultValue={lastName} />
          {fieldErrors?.["lastName"]?.[0] && (
            <p className="text-sm text-destructive">{fieldErrors["lastName"][0]}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            disabled
            defaultValue={email}
          />
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton title="Update your settings" />
      </CardFooter>
    </form>
  );
}