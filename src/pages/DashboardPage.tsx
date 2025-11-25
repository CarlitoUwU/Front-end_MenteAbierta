import DashboardContent from "../components/dashboard/DashboardContent";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Topbar } from "../components/dashboard/Topbar";

export const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-[#f5f5cf]">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Topbar />
        <DashboardContent />
      </div>
    </div>
  );
};