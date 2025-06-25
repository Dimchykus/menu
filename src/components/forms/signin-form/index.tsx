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
        <div className="max-w-[380px] w-full p-8 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl flex flex-col items-stretch shadow-2xl">
          <form action={handleSignIn}>
            <div className="flex flex-col m-auto">
              <h2 className="text-3xl text-center mb-8 font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <div className="gap-5 flex flex-col mb-6">
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
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Sign In
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
            <p className="text-slate-400">Don&apos;t have an account?</p>
            <Link
              href="/signup"
              className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default SigninForm;
