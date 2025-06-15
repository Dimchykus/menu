import { auth } from "@/auth";
import AuthHeader from "@/components/auth-header";
import SigninForm from "@/components/forms/signin-form";

export default async function Page() {
  const session = await auth();

  return (
    <div className="min-h-[100vh] flex flex-col items-center">
      <AuthHeader />
      {!!session ? "Loged in" : "NOT logged in"}
      <div className="m-auto">
        <SigninForm />
      </div>
    </div>
  );
}
