import Link from "next/link";
import { UserPen, HandPlatter, Soup } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="p-10 bg-neutral-100 border-r border-neutral-300">
      <div className="flex flex-col gap-4 text-neutral-950 font-medium">
        <Link href="/profile" className="flex items-center gap-2">
          <UserPen /> Profile
        </Link>
        <Link href="/menu" className="flex items-center gap-2">
          <Soup />
          Menu
        </Link>
        <Link href="/menu" className="flex items-center gap-2">
          <HandPlatter />
          Restaurants
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
