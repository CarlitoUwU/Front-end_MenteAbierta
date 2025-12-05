import { COLORS } from "../../constants/colors";

type CategoriaItemProps = {
  categoria: string;
  isActiva?: boolean;
  onClick: (categoria: string) => void;
};

export const CategoriaItem = ({ categoria, isActiva, onClick }: CategoriaItemProps) => {
  return (
    <button
      onClick={() => onClick(categoria)}
      style={{
        backgroundColor: isActiva ? COLORS.azul : COLORS.claro,
        color: isActiva ? COLORS.texto_claro : COLORS.texto_oscuro,
      }}
      className={`px-6 py-2.5 rounded-full font-medium transition-all whitespace-nowrap shadow-sm cursor-pointer
        ${!isActiva ? "hover:brightness-95" : "shadow-md"}
      `}
    >
      {categoria}
    </button>
  );
};
