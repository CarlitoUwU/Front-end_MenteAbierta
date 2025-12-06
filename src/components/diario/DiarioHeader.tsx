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
        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm"
        style={{
          backgroundColor: COLORS.azul,
          color: COLORS.texto_claro,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.azul_semi;
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.azul;
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
        }}
      >
        <MdAdd size={20} />
        Nueva entrada
      </button>
    </div>
  );
};