import Link from "next/link";
import { UserPen, HandPlatter } from "lucide-react";
import { isMobileDevice } from "@/utils/isMobile";

const Sidebar = async () => {
  const isMobile = await isMobileDevice();

  if (isMobile) {
    return null;
  }

  return (
    <div className="p-10 bg-neutral-100 border-r border-neutral-300">
      <div className="flex flex-col gap-4 text-neutral-950 font-medium">
        <Link href="/profile" className="flex items-center gap-2">
          <UserPen /> Profile
        </Link>
        <Link href="/restaurants" className="flex items-center gap-2">
          <HandPlatter />
          Restaurants
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
