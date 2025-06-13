import Header from "@/components/header/index";
import Sidebar from "@/components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
