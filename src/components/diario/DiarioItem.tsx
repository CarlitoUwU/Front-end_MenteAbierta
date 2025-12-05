import { MdCalendarToday } from "react-icons/md";
import { COLORS } from "../../constants/colors";

type DiarioItemProps = {
  titulo: string;
  preview: string;
  fecha: string;
};

export const DiarioItem = ({ titulo, preview, fecha }: DiarioItemProps) => {
  return (
    <div
      className="p-5 rounded-xl shadow-sm flex justify-between items-center transition"
      style={{
        backgroundColor: COLORS.claro,
        color: COLORS.texto_oscuro,
        border: `1px solid ${COLORS.azul_claro}`,
      }}
    >
      <div>
        <h2
          className="font-semibold text-lg"
          style={{ color: COLORS.texto_oscuro }}
        >
          {titulo}
        </h2>

        <p
          className="text-sm mt-1"
          style={{ color: COLORS.azul_semi }}
        >
          {preview}
        </p>
      </div>

      <div
        className="flex items-center gap-2"
        style={{ color: COLORS.azul }}
      >
        <MdCalendarToday size={20} />
        <span className="text-sm">{fecha}</span>
      </div>
    </div>
  );
};
