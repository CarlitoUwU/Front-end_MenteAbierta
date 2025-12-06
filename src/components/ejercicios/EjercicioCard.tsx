import { MdAccessTime, MdCheckCircle } from "react-icons/md";
import { COLORS } from "../../constants/colors";

type EjercicioCardProps = {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  categoria: string;
  icono: React.ComponentType<{ className?: string }>;
  colorIcono: string;
  colorFondo: string;
  onCompletar?: () => void;
};

export const EjercicioCard = ({ id, icono, colorFondo, colorIcono, titulo, descripcion, duracion, categoria, onCompletar }: EjercicioCardProps) => {
  const IconoEjercicio = icono;

  return (
    <div
      key={id}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      {/* Icono y contenido */}
      <div className="flex gap-4 mb-4">
        <div className={`${colorFondo} rounded-2xl p-4 shrink-0 h-fit`}>
          <IconoEjercicio className={`text-4xl ${colorIcono}`} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {titulo}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {descripcion}
          </p>
        </div>
      </div>

      {/* Metadata inferior */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-gray-600">
          <MdAccessTime className="text-lg" />
          <span className="text-sm font-medium">{duracion}</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
            style={
              { background: COLORS.azul_claro, color: COLORS.texto_oscuro }
            }
          >
            {categoria}
          </span>
          {onCompletar && (
            <button
              onClick={onCompletar}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <MdCheckCircle className="text-lg" />
              Completar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};