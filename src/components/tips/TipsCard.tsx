import type { ButtonHTMLAttributes } from "react";
import { COLORS } from "../../constants/colors";

type TipsCardProps = {
  titulo: string;
  descripcion: string;
  isActive?: boolean;
}

type TipsCardNative = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = TipsCardProps & TipsCardNative;

export const TipsCard = ({ titulo, descripcion, isActive, ...other }: Props) => {

  return (
    <button
      {...other}
      className=" w-72 md:w-80 shrink-0 rounded-2xl shadow-md p-6 text-left transition-all cursor-pointer hover:shadow-lg"
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${COLORS.azul} 0%, ${COLORS.azul_semi} 100%)`
          : COLORS.azul_claro,
        border: isActive ? `2px solid ${COLORS.azul_semi}` : "none",
        boxShadow: isActive
          ? `0 0 0 2px ${COLORS.azul_claro}`
          : undefined,
      }}
    >
      <h3
        className="text-xl font-bold mb-3"
        style={{
          color: isActive ? COLORS.texto_claro : COLORS.texto_oscuro
        }}
      >
        {titulo}
      </h3>

      <p
        className="text-sm leading-relaxed line-clamp-3"
        style={{
          color: isActive ? COLORS.texto_claro : COLORS.texto_medio
        }}
      >
        {descripcion}
      </p>
    </button>
  );
};
