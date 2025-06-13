import MenuEditor from "@/components/menu-editor";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const ProfileUserInfo = dynamic(() => import("@/components/profile-user-info"));

export default function Page() {
  return (
    <div>
      <ProfileUserInfo />
      <Suspense fallback={<div>Loading...</div>}>
        <MenuEditor />
      </Suspense>
    </div>
  );
}
