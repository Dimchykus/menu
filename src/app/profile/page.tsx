import dynamic from "next/dynamic";
import { Suspense } from "react";
const MenuEditor = dynamic(() => import("@/components/menu-editor"));
const ProfileUserInfo = dynamic(() => import("@/components/profile-user-info"));

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileUserInfo />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <MenuEditor />
      </Suspense>
    </div>
  );
}
