import { COLORS } from "../../constants/colors";

type OpcionItemProps = {
  opcion: string;
  isSelected?: boolean;
  onClick: () => void;
};

export const OpcionItem = ({ opcion, isSelected, onClick }: OpcionItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all font-medium`}
      style={{
        borderColor: isSelected ? COLORS.azul : COLORS.azul_claro,
        backgroundColor: isSelected ? COLORS.azul_claro : "transparent",
        color: isSelected ? COLORS.texto_medio : COLORS.texto_oscuro,
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.azul;
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          (e.currentTarget as HTMLButtonElement).style.borderColor = COLORS.azul_claro;
        }
      }}
    >
      {opcion}
    </button>
  );
};
