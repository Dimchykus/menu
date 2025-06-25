import Link from "next/link";
import {
  UserPen,
  HandPlatter,
  ClipboardList,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";
import { isMobileDevice } from "@/utils/isMobile";
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const LINK_STYLES =
  "flex items-center gap-2 rounded-md p-2 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300";

const Sidebar = async () => {
  const isMobile = await isMobileDevice();

  if (isMobile) {
    return null;
  }

  return (
    <SidebarUI className="bg-neutral-100 border-r border-neutral-300">
      <SidebarHeader className="bg-neutral-100 h-[81px] justify-center items-center box-border border-b border-neutral-300">
        <Link href="/" className="font-bold text-2xl">
          MenuMaker
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4 flex flex-col gap-3 bg-neutral-100 text-neutral-950 font-medium">
        <Link href="/profile" className={LINK_STYLES}>
          <UserPen /> Profile
        </Link>
        <Link href="/restaurants" className={LINK_STYLES}>
          <HandPlatter />
          Restaurants
        </Link>
        <Link href="/orders" className={LINK_STYLES}>
          <ClipboardList />
          Orders
        </Link>
        <Link href="/analytics" className={LINK_STYLES}>
          <BarChart3 />
          Analytics
        </Link>
      </SidebarContent>
      <SidebarFooter className="p-4 bg-neutral-100 flex flex-col gap-3 border-t border-neutral-300">
        <Link href="/settings" className={LINK_STYLES}>
          <Settings />
          Settings
        </Link>
        <Link href="/help" className={LINK_STYLES}>
          <HelpCircle />
          Help
        </Link>
      </SidebarFooter>
    </SidebarUI>
  );
};

export default Sidebar;
