import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import DashboardContent from "@/components/dashboard/Dashboard";

export default function LandingPage() {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-[#F5F6FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
