import {
  MdHome, MdFavorite, MdQuiz, MdLibraryBooks,
  MdSelfImprovement, MdLightbulb, MdForum, MdPerson,
  MdContentCopy
} from "react-icons/md";
import type { DashboardSection } from "../../pages/DashboardPage";

interface SidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

interface MenuItem {
  id: DashboardSection;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const menuItems: MenuItem[] = [
  { id: "inicio", icon: MdHome, label: "Inicio" },
  { id: "registrar-emocion", icon: MdFavorite, label: "Registrar Emoción" },
  { id: "cuestionarios", icon: MdQuiz, label: "Cuestionarios" },
  { id: "diario", icon: MdLibraryBooks, label: "Diario" },
  { id: "ejercicios", icon: MdSelfImprovement, label: "Ejercicios" },
  { id: "contenido", icon: MdContentCopy, label: "Contenido" },
  { id: "tips", icon: MdLightbulb, label: "Tips" },
  { id: "foro", icon: MdForum, label: "Foro" },
  { id: "perfil", icon: MdPerson, label: "Perfil" },
];

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="w-64 bg-green-800 text-white p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">MenteAbierta</h2>

      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive 
                  ? "bg-green-600" 
                  : "hover:bg-green-700"
              }`}
            >
              <Icon className="text-xl" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
