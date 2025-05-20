import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/auth";
import ThemeDropdownButton from "../switch-theme-button/drop-down-button";
import Link from "next/link";
import Arrow from "@/icons/arrow-down.svg";
import Image from "next/image";
import userSrc from "@/icons/user.jpeg";

const Header = async () => {
  const session = await auth();

  return (
    <header className="flex items-center p-6 bg-neutral-900">
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Image
              src={userSrc}
              height={32}
              width={32}
              alt="user"
              className="rounded-[50%]"
            />
            <p className="text-white">{session?.user?.name}</p>
            <Arrow />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link href="/profile">Profile</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ThemeDropdownButton />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
