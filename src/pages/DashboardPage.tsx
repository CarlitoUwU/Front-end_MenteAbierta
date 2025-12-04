import { MdContentCopy, MdFavorite, MdForum, MdHome, MdLibraryBooks, MdLightbulb, MdPerson, MdQuiz, MdSelfImprovement } from "react-icons/md";
import DashboardContent from "../components/dashboard/DashboardContent";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Topbar } from "../components/dashboard/Topbar";
import { InicioContent } from "../components/InicioContent";
import { RegistrarEmocionContent } from "../components/RegistrarEmocionContent";
import { CuestionarioContent } from "../components/CuestionarioContent";
import { DiarioContent } from "../components/DiarioContent";
import { EjerciciosContent } from "../components/EjerciciosContent";
import { ContenidoContent } from "../components/ContenidoContent";
import { TipsContent } from "../components/TipsContent";
import { ForoContent } from "../components/ForoContent";
import { PerfilContent } from "../components/PerfilContent";
import { SidebarItem } from "../components/dashboard/SidebarItem";
import { useState } from "react";

type DiccionaryType = {
  text: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  active?: boolean;
};

const Diccionary: DiccionaryType[] = [
  {
    text: "Inicio",
    icon: <MdHome />,
    content: <InicioContent />
  },
  {
    text: "Registrar Emoción",
    icon: <MdFavorite />,
    content: <RegistrarEmocionContent />
  },
  {
    text: "Cuestionarios",
    icon: <MdQuiz />,
    content: <CuestionarioContent />
  },
  {
    text: "Diario",
    icon: <MdLibraryBooks />,
    content: <DiarioContent />
  },
  {
    text: "Ejercicios",
    icon: <MdSelfImprovement />,
    content: <EjerciciosContent />
  },
  {
    text: "Contenido",
    icon: <MdContentCopy />,
    content: <ContenidoContent />
  },
  {
    text: "Tips",
    icon: <MdLightbulb />,
    content: <TipsContent />
  },
  {
    text: "Foro",
    icon: <MdForum />,
    content: <ForoContent />
  },
  {
    text: "Perfil",
    icon: <MdPerson />,
    content: <PerfilContent />
  }
];

export const DashboardPage = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const toPerfil = () => {
    setActiveIndex(Diccionary.findIndex(item => item.text === "Perfil"));
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar>
        {Diccionary.map((item, index) => (
          <SidebarItem
            key={item.text}
            text={item.text}
            icon={item.icon}
            active={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </Sidebar>

      <div className="flex flex-col flex-1">
        <Topbar toPerfil={toPerfil} />
        <DashboardContent>
          {Diccionary[activeIndex].content}
        </DashboardContent>
      </div>
    </div>
  );
};