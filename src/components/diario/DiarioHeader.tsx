import { MdAdd } from "react-icons/md";
import { COLORS } from "../../constants/colors";

export const DiarioHeader = ({ onNewEntrada }: { onNewEntrada: () => void }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1
        className="text-3xl font-semibold"
        style={{ color: COLORS.texto_oscuro }}
      >
        Mi Diario
      </h1>

      <button
        onClick={onNewEntrada}
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm hover:brightness-110"
        style={{
          backgroundColor: COLORS.azul,
          color: COLORS.texto_claro,
        }}
      >
        <MdAdd size={20} />
        Nueva entrada
      </button>
    </div>
  );
};