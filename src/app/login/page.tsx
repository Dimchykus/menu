import { auth } from "../../auth";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    const user = session.user;

    return (
      <div>
        <h2>{user.name}</h2>
        <h2>{user.email}</h2>
        <h2>{user.image}</h2>
        <h2>{user.id}</h2>
        <LogoutButton />
      </div>
    );
  }

  return (
    <h1>
      Not logged in
      <LoginButton />
    </h1>
  );
}
