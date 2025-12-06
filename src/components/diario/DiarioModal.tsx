import { MdClose } from "react-icons/md";
import { COLORS } from "../../constants/colors";
import type { HumorLevel } from "../../types";

type DiarioModalProps = {
  handleCerrar: () => void;
  handleSubmit: () => void;
  value: {
    titulo: string;
    contenido: string;
    humor: HumorLevel;
  };
  onChange: {
    setTitulo: (titulo: string) => void;
    setContenido: (contenido: string) => void;
    setHumor: (humor: HumorLevel) => void;
  };
  isEditing?: boolean;
  isSubmitting?: boolean;
};

export const DiarioModal = ({ handleCerrar, handleSubmit, value, onChange, isEditing = false, isSubmitting = false }: DiarioModalProps) => {
  const { titulo, contenido, humor } = value;
  const { setTitulo, setContenido, setHumor } = onChange;

  const humorOptions = [
    { value: 1 as HumorLevel, label: '😢 Muy Mal', color: 'bg-red-500' },
    { value: 2 as HumorLevel, label: '😟 Mal', color: 'bg-orange-500' },
    { value: 3 as HumorLevel, label: '😐 Neutral', color: 'bg-yellow-500' },
    { value: 4 as HumorLevel, label: '🙂 Bien', color: 'bg-green-500' },
    { value: 5 as HumorLevel, label: '😄 Muy Bien', color: 'bg-blue-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        onClick={handleCerrar}
      />

      <div
        className="relative w-full max-w-lg rounded-xl p-6 shadow-lg animate-fade-in"
        style={{ backgroundColor: COLORS.claro }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className="text-xl font-semibold"
            style={{ color: COLORS.texto_oscuro }}
          >
            {isEditing ? 'Editar entrada' : 'Nueva entrada'}
          </h2>

          <button
            onClick={handleCerrar}
            className="p-1 rounded hover:bg-gray-200 cursor-pointer"
          >
            <MdClose
              size={24}
              style={{ color: COLORS.texto_medio }}
            />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-3 rounded-lg outline-none shadow-sm"
            style={{
              backgroundColor: COLORS.claro,
              border: `1px solid ${COLORS.azul_claro}`,
              color: COLORS.texto_oscuro,
            }}
          />
          
          {/* Selector de humor */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.texto_medio }}>
              ¿Cómo te sientes?
            </label>
            <div className="flex gap-2">
              {humorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setHumor(option.value)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    humor === option.value
                      ? `${option.color} text-white shadow-lg scale-105`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={5}
            placeholder="Escribe tu entrada..."
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full p-3 rounded-lg outline-none resize-none shadow-sm"
            style={{
              backgroundColor: COLORS.claro,
              border: `1px solid ${COLORS.azul_claro}`,
              color: COLORS.texto_oscuro,
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full mt-5 py-3 rounded-lg font-semibold transition-all shadow-md ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110 cursor-pointer'
          }`}
          style={{
            backgroundColor: COLORS.azul,
            color: COLORS.texto_claro,
          }}
        >
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar entrada' : 'Crear entrada')}
        </button>
      </div>
    </div>
  );
};