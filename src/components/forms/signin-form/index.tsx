"use client";

import { handleSignIn } from "./actions";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form-input";
import GitHubAuth from "@/components/sso/github";
import Link from "next/link";

const SigninForm = () => {
  const methods = useForm();

  return (
    <div>
      <FormProvider {...methods}>
        <div className="p-6 bg-gray-700 rounded-2xl flex flex-col items-stretch">
          <form action={handleSignIn}>
            <div className="w-[350px] flex flex-col m-auto">
              <h2 className="text-2xl text-center mb-6 font-bold">Login</h2>
              <div className="gap-4 flex flex-col mb-4">
                <FormInput name="email" placeholder="Email" />
                <FormInput
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <Button type="submit">Continue</Button>
            </div>
          </form>
          <div className="flex gap-2 items-center mt-4 mb-4">
            <hr className="h-0.5 flex-[1] bg-cyan-500" />
            <p className="text-base">OR</p>
            <hr className="h-0.5 flex-[1] bg-cyan-500" />
          </div>
          <GitHubAuth />
          <div className="flex items-center justify-center gap-2 mt-4">
            <p>Don&apos;t have an account? </p>{" "}
            <Link href="/signup" className="text-blue-500 underline">
              Register
            </Link>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default SigninForm;
