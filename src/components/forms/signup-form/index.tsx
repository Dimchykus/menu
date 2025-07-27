"use client";

import { handleSignUp } from "./actions";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import GitHubAuth from "@/components/sso/github";
import Link from "next/link";
import useFormAction from "@/lib/hooks/use-form-action";

const SignupForm = () => {
  const methods = useFormAction({ onAction: handleSignUp });

  return (
    <div>
      <FormProvider {...methods}>
        <div className="p-8 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl flex flex-col items-stretch shadow-2xl">
          <form action={methods.handleAction}>
            <div className="w-[380px] flex flex-col m-auto">
              <h2 className="text-3xl text-center mb-8 font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Create Account
              </h2>
              <div className="gap-5 flex flex-col mb-6">
                <FormInput
                  name="name"
                  placeholder="Full Name"
                  className="text-white"
                />
                <FormInput
                  name="email"
                  placeholder="Email Address"
                  className="text-white"
                />
                <FormInput
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="text-white"
                />
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <Checkbox
                  id="terms"
                  className="border-slate-600 data-[state=checked]:bg-blue-600"
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300"
                >
                  I agree to the terms and conditions
                </label>
              </div>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Create Account
              </Button>
            </div>
          </form>
          <div className="flex gap-3 items-center mt-6 mb-6">
            <hr className="h-0.5 flex-[1] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <p className="text-base text-slate-400 font-medium">OR</p>
            <hr className="h-0.5 flex-[1] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
          <GitHubAuth />
          <div className="flex items-center justify-center gap-2 mt-6">
            <p className="text-slate-400">Already have an account?</p>
            <Link
              href="/signin"
              className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default SignupForm;
