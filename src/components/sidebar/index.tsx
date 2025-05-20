import Link from "next/link";
import ProfileIcon from "@/icons/profile.svg";

const Sidebar = () => {
  return (
    <div className="p-4 bg-zinc-700 ">
      <div className="flex flex-col gap-4 text-white">
        <Link href="/profile" className="flex items-center gap-2">
          <ProfileIcon /> Profile
        </Link>
        <Link href="/menu" className="flex items-center gap-2">
          <ProfileIcon />
          Menu
        </Link>
        <Link href="/menu" className="flex items-center gap-2">
          <ProfileIcon />
          Restaurants
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
