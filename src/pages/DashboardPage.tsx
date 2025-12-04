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
import type { DashboardContentProps, Sections } from "../@types/dashboard";

type DiccionaryType = {
  text: string;
  icon: React.ReactNode;
  content: (props: DashboardContentProps) => React.ReactNode;
  active?: boolean;
};

const Diccionary: DiccionaryType[] = [
  {
    text: "Inicio",
    icon: <MdHome />,
    content: (props) => <InicioContent {...props} />
  },
  {
    text: "Registrar Emoción",
    icon: <MdFavorite />,
    content: (props) => <RegistrarEmocionContent {...props} />
  },
  {
    text: "Cuestionarios",
    icon: <MdQuiz />,
    content: (props) => <CuestionarioContent {...props} />
  },
  {
    text: "Diario",
    icon: <MdLibraryBooks />,
    content: (props) => <DiarioContent {...props} />
  },
  {
    text: "Ejercicios",
    icon: <MdSelfImprovement />,
    content: (props) => <EjerciciosContent {...props} />
  },
  {
    text: "Contenido",
    icon: <MdContentCopy />,
    content: (props) => <ContenidoContent {...props} />
  },
  {
    text: "Tips",
    icon: <MdLightbulb />,
    content: (props) => <TipsContent {...props} />
  },
  {
    text: "Foro",
    icon: <MdForum />,
    content: (props) => <ForoContent {...props} />
  },
  {
    text: "Perfil",
    icon: <MdPerson />,
    content: (props) => <PerfilContent {...props} />
  }
];


export const DashboardPage = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  const toSecction = (section: Sections) => {
    const index = Diccionary.findIndex(item => item.text === section);
    if (index !== -1) {
      setActiveIndex(index);
    }
  };

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
        <Topbar toPerfil={() => toSecction("Perfil")} />
        <DashboardContent>
          {Diccionary[activeIndex].content({ toSecction })}
        </DashboardContent>
      </div>
    </div>
  );
};