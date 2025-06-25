import { auth } from "@/auth";
import Header from "@/components/home/header";
import SigninForm from "@/components/forms/signin-form";

export default async function Page() {
  const session = await auth();

  return (
    <div className="min-h-[100vh] p-2 flex flex-col items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header session={session} />
      <div className="m-auto pt-20">
        <SigninForm />
      </div>
    </div>
  );
}
