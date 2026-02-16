import { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export const metadata: Metadata = {
  title: "Aduanku - Dashboard",
  description: "Dashboard pengelolaan laporan dan analitik layanan publik",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#F5F6FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
