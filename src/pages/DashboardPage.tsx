import { useState } from "react";
import DashboardContent from "../components/dashboard/DashboardContent";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Topbar } from "../components/dashboard/Topbar";

export type DashboardSection = 
  | "inicio" 
  | "registrar-emocion" 
  | "cuestionarios" 
  | "diario" 
  | "ejercicios" 
  | "contenido" 
  | "tips" 
  | "foro" 
  | "perfil";

export const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("inicio");

  return (
    <div className="flex min-h-screen bg-[#f5f5cf]">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex flex-col flex-1">
        <Topbar />
        <DashboardContent activeSection={activeSection} />
      </div>
    </div>
  );
};