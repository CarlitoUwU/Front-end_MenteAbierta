import { MdClose } from "react-icons/md";
import { COLORS } from "../../constants/colors";

type DiarioModalProps = {
  handleCerrar: () => void;
  handleSubmit: () => void;
  value: {
    titulo: string;
    contenido: string;
  };
  onChange: {
    setTitulo: (titulo: string) => void;
    setContenido: (contenido: string) => void;
  };
};

export const DiarioModal = ({ handleCerrar, handleSubmit, value, onChange }: DiarioModalProps) => {
  const { titulo, contenido } = value;
  const { setTitulo, setContenido } = onChange;

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
            Nueva entrada
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
          className="w-full mt-5 py-3 rounded-lg font-semibold transition-all hover:brightness-110 shadow-md cursor-pointer"
          style={{
            backgroundColor: COLORS.azul,
            color: COLORS.texto_claro,
          }}
        >
          Crear entrada
        </button>
      </div>
    </div>
  );
};