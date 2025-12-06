import { MdClose, MdAccessTime } from "react-icons/md";
import { COLORS } from "../../constants/colors";

type ArticuloModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imgSrc: string;
  categoria: string;
  duracion: string;
  titulo: string;
  contenido: string;
  fechaPublicacion: string;
};

export const ArticuloModal = ({
  isOpen,
  onClose,
  imgSrc,
  categoria,
  duracion,
  titulo,
  contenido,
  fechaPublicacion,
}: ArticuloModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        {/* Header con imagen */}
        <div className="relative">
          <img
            src={imgSrc}
            alt={titulo}
            className="w-full h-[300px] object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg z-10"
          >
            <MdClose className="text-2xl" style={{ color: COLORS.texto_oscuro }} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-8">
          {/* Metadata */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full font-medium text-sm"
              style={{
                backgroundColor: COLORS.azul_claro,
                color: COLORS.azul_oscuro,
              }}
            >
              {categoria}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-600">
              <MdAccessTime />
              {duracion}
            </span>
            <span className="text-sm text-gray-500">
              {new Date(fechaPublicacion).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {/* Título */}
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {titulo}
          </h1>

          {/* Contenido del artículo */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {contenido}
          </div>
        </div>
      </div>
    </div>
  );
};
