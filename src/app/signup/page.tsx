import AuthHeader from "@/components/auth-header";
import SignupForm from "@/components/forms/signup-form";

export default async function Page() {
  return (
    <div className="min-h-[100vh] flex flex-col items-center">
      <AuthHeader />
      <div className="m-auto">
        <SignupForm />
      </div>
    </div>
  );
}
