import { useState } from "react";
import { COLORS } from "../../constants/colors";

type SidebarItemProps = {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
};

export const SidebarItem = ({ text, icon, onClick, active = false }: SidebarItemProps) => {
  const [hover, setHover] = useState(false);

  const background: string = active
    ? COLORS.azul
    : hover
      ? COLORS.azul_semi
      : COLORS.azul_oscuro;

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ backgroundColor: background }}
      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-white transition-colors"
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
};
