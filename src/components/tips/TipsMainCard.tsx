import { MdLightbulb, MdRefresh } from "react-icons/md";
import { COLORS } from "../../constants/colors";

type TipsMainCardProps = {
  titulo: string;
  descripcion: string;
  index: number;
  total: number;
  onClick: () => void;
};

export const TipsMainCard = ({
  titulo,
  descripcion,
  index,
  total,
  onClick,
}: TipsMainCardProps) => {
  return (
    <div
      className="rounded-3xl shadow-2xl p-8 relative overflow-hidden mx-auto transition-all"
      style={{
        background: `linear-gradient(135deg, ${COLORS.azul}, ${COLORS.azul_oscuro})`,
      }}
    >
      <div
        className="absolute top-6 left-6 rounded-full p-4"
        style={{
          backgroundColor: `${COLORS.claro}55`,
        }}
      >
        <MdLightbulb style={{ fontSize: 36, color: COLORS.texto_claro }} />
      </div>

      <div className="mt-16 mb-8">
        <h2
          className="text-3xl font-bold mb-4"
          style={{
            color: COLORS.texto_claro,
          }}
        >
          {titulo}
        </h2>

        <p
          className="text-lg leading-relaxed"
          style={{
            color: COLORS.texto_claro,
          }}
        >
          {descripcion}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span
          className="text-sm font-medium"
          style={{ color: COLORS.texto_claro }}
        >
          Tip {index} de {total}
        </span>

        <button
          onClick={onClick}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all cursor-pointer hover:shadow-md"
          style={{
            backgroundColor: `${COLORS.claro}33`,
            color: COLORS.texto_claro,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = `${COLORS.claro}55`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = `${COLORS.claro}33`)
          }
        >
          <MdRefresh style={{ fontSize: 22 }} />
          Siguiente tip
        </button>
      </div>
    </div>
  );
};
