import { MdAccessTime, MdAssignment, MdEdit } from "react-icons/md";
import { COLORS } from "../../constants/colors";

type PreguntaCardProps = {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  preguntas: number;
  handleClickComenzar: (id: string) => void;
};

export const PreguntaCard = ({
  id,
  titulo,
  descripcion,
  duracion,
  preguntas,
  handleClickComenzar,
}: PreguntaCardProps) => {
  return (
    <div
      className="flex flex-col rounded-2xl p-6 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
      style={{ backgroundColor: COLORS.claro }}
    >
      {/* Icono y Título */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="rounded-full p-4 shrink-0 flex items-center justify-center"
          style={{ backgroundColor: COLORS.azul_claro }}
        >
          <MdAssignment className="text-3xl" style={{ color: COLORS.azul }} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.texto_oscuro }}>
            {titulo}
          </h2>
          <p className="leading-relaxed" style={{ color: COLORS.texto_medio }}>
            {descripcion}
          </p>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-6 mt-auto pt-4 border-t" style={{ borderColor: COLORS.azul_claro }}>
        <div className="flex items-center gap-2" style={{ color: COLORS.texto_medio }}>
          <MdAccessTime className="text-lg" />
          <span className="text-sm">{duracion}</span>
        </div>
        <div className="flex items-center gap-2" style={{ color: COLORS.texto_medio }}>
          <MdEdit className="text-lg" />
          <span className="text-sm">{preguntas} preguntas</span>
        </div>
      </div>

      {/* Botón */}
      <button
        onClick={() => handleClickComenzar(id)}
        className="mt-4 w-full font-semibold py-3 px-6 rounded-lg shadow-md transition-colors cursor-pointer hover:brightness-90"
        style={{ backgroundColor: COLORS.azul, color: COLORS.texto_claro }}
      >
        Comenzar cuestionario
      </button>
    </div>
  );
};
