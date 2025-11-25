import type { DashboardSection } from "../../pages/DashboardPage";
import { InicioContent } from "../InicioContent";
import { RegistrarEmocionContent } from "../RegistrarEmocionContent";
import { CuestionarioContent } from "../CuestionarioContent";
import { DiarioContent } from "../DiarioContent";
import { EjerciciosContent } from "../EjerciciosContent";
import { ContenidoContent } from "../ContenidoContent";
import { TipsContent } from "../TipsContent";
import { ForoContent } from "../ForoContent";
import { PerfilContent } from "../PerfilContent";

interface DashboardContentProps {
  activeSection: DashboardSection;
}

export default function DashboardContent({ activeSection }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "inicio":
        return <InicioContent />;
      case "registrar-emocion":
        return <RegistrarEmocionContent />;
      case "cuestionarios":
        return <CuestionarioContent />;
      case "diario":
        return <DiarioContent />;
      case "ejercicios":
        return <EjerciciosContent />;
      case "contenido":
        return <ContenidoContent />;
      case "tips":
        return <TipsContent />;
      case "foro":
        return <ForoContent />;
      case "perfil":
        return <PerfilContent />;
      default:
        return <InicioContent />;
    }
  };

  return (
    <main className="p-8 flex flex-col gap-6">
      {renderContent()}
    </main>
  );
}
