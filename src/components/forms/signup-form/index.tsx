"use client";

import { handleSignUp } from "./actions";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import GitHubAuth from "@/components/sso/github";
import Link from "next/link";

const SignupForm = () => {
  const methods = useForm();

  return (
    <div>
      <FormProvider {...methods}>
        <div className="p-6 bg-gray-700 rounded-2xl flex flex-col items-stretch">
          <form action={handleSignUp}>
            <div className="w-[350px] flex flex-col m-auto">
              <h2 className="text-2xl text-center mb-6 font-bold">Register</h2>
              <div className="gap-4 flex flex-col mb-4">
                <FormInput name="name" placeholder="Name" />
                <FormInput name="email" placeholder="Email" />
                <FormInput
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
              <Button type="submit">Register</Button>
            </div>
          </form>
          <div className="flex gap-2 items-center mt-4 mb-4">
            <hr className="h-0.5 flex-[1] bg-cyan-500" />
            <p className="text-base">OR</p>
            <hr className="h-0.5 flex-[1] bg-cyan-500" />
          </div>
          <GitHubAuth />
          <div className="flex items-center justify-center gap-2 mt-4">
            <p>Already have an account? </p>{" "}
            <Link href="/signin" className="text-blue-500 underline">
              Login
            </Link>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default SignupForm;
