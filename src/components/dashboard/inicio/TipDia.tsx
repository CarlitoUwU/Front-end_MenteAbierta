import { MdLightbulb } from "react-icons/md";
import { COLORS } from "../../../constants/colors";

type TipDiaProps = {
  phrase?: string;
};

export const TipDia = ({ phrase }: TipDiaProps) => {
  return (
    <div
      className="rounded-lg shadow-md p-6 border-l-4"
      style={{
        backgroundColor: COLORS.claro,
        borderColor: COLORS.azul,
      }}
    >
      <div className="flex items-start gap-4">
        <MdLightbulb
          className="text-4xl shrink-0"
          style={{ color: COLORS.azul_semi }}
        />
        <div>
          <h2
            className="text-xl font-bold mb-2"
            style={{ color: COLORS.texto_oscuro }}
          >
            Tip del día
          </h2>
          <p
            className="leading-relaxed"
            style={{ color: COLORS.texto_medio }}
          >
            {phrase ||
              "Practica la respiración consciente: Inhala profundamente por 4 segundos, mantén el aire por 4 segundos y exhala lentamente por 6 segundos. Repite este ciclo 5 veces para reducir el estrés y encontrar calma."}
          </p>
        </div>
      </div>
    </div>
  );
};
