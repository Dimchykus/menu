"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { handleUpdateUserInfo, UserInfoFormData } from "./actions";
import { OrderDishesButton } from "./order-dishes-button";
import FormInput from "../form-input";
import { SelectUser } from "@/lib/db/schema/user";
import { useActionState } from "react";

interface Props {
  user: SelectUser;
}

const userInfoSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

const ProfileUserInfo: React.FC<Props> = ({ user }) => {
  const initialValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    __timestamp: String(Date.now()),
  };

  const [state, formAction, isPending] = useActionState(handleUpdateUserInfo, {
    values: initialValues,
    errors: {},
  });

  const methods = useForm<UserInfoFormData>({
    errors: state.errors,
    mode: "onBlur",
    values: state.values,
    resolver: zodResolver(userInfoSchema),
  });

  if (!user) return null;

  return (
    <FormProvider {...methods}>
      <div className="max-w-[500px] w-full">
        <p className="text-2xl font-bold mb-6">Setting</p>
        <form action={formAction}>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <FormInput name="name" className="mb-2" />
            </div>

            <div>
              <Label>Email</Label>
              <FormInput name="email" type="email" className="mb-2" />
            </div>

            {state.errors.root && (
              <div className="text-red-500 text-sm">{state.errors.root[0]}</div>
            )}

            <Button className="w-full mt-2" type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t">
          <OrderDishesButton />
        </div>
      </div>
    </FormProvider>
  );
};

export default ProfileUserInfo;
