import Header from "@/components/header/index";
import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header title="Profile" />
        <div className="flex flex-1">
          <div className="flex-1 p-4 sm:p-6">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
