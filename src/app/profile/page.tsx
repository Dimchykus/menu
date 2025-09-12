import { getUser } from "@/lib/actions/auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const MenuEditor = dynamic(() => import("@/components/menu-editor"));
const ProfileUserInfo = dynamic(() => import("@/components/profile-user-info"));

export default async function Page() {
  const user = await getUser();

  return (
    <div>
      <ProfileUserInfo user={user} />
      <Suspense fallback={<div>Loading...</div>}>
        <MenuEditor />
      </Suspense>
    </div>
  );
}
