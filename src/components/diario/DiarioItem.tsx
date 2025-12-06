import { MdCalendarToday, MdEdit, MdDelete } from "react-icons/md";
import { COLORS } from "../../constants/colors";
import type { HumorLevel } from "../../types";

type DiarioItemProps = {
  titulo: string;
  preview: string;
  fecha: string;
  humor: HumorLevel;
  onEdit: () => void;
  onDelete: () => void;
};

export const DiarioItem = ({ titulo, preview, fecha, humor, onEdit, onDelete }: DiarioItemProps) => {
  const humorEmojis = {
    1: '😢',
    2: '😟',
    3: '😐',
    4: '🙂',
    5: '😄',
  };

  const formatFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div
      className="p-5 rounded-xl shadow-sm transition hover:shadow-md"
      style={{
        backgroundColor: COLORS.claro,
        color: COLORS.texto_oscuro,
        border: `1px solid ${COLORS.azul_claro}`,
      }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{humorEmojis[humor]}</span>
            <h2
              className="font-semibold text-lg flex-1"
              style={{ color: COLORS.texto_oscuro }}
            >
              {titulo}
            </h2>
          </div>

          <p
            className="text-sm mt-1 ml-11"
            style={{ color: COLORS.azul_semi }}
          >
            {preview}
          </p>

          <div
            className="flex items-center gap-2 mt-3 ml-11"
            style={{ color: COLORS.azul }}
          >
            <MdCalendarToday size={16} />
            <span className="text-xs">{formatFecha(fecha)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
            title="Editar"
          >
            <MdEdit size={20} style={{ color: COLORS.azul }} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-red-100 transition-colors"
            title="Eliminar"
          >
            <MdDelete size={20} className="text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
