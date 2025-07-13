import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("-----children", children);

  return (
    <SidebarProvider className="flex flex-col">
      <Header />
      {children}
    </SidebarProvider>
  );
}
