import { FiPlus } from "react-icons/fi";
import { COLORS } from "../../constants/colors";

export const ForoHeader = () => {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <h1
          className="text-3xl font-bold"
          style={{ color: COLORS.azul_oscuro }}
        >
          Foro Comunitario
        </h1>

        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition text-white self-start cursor-pointer md:self-auto"
          style={{ backgroundColor: COLORS.azul }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.azul_semi)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.azul)}
        >
          <FiPlus size={18} />
          Nueva publicación
        </button>
      </div>

      <p
        className="text-sm mb-6"
        style={{ color: COLORS.texto_medio }}
      >
        Un espacio seguro para compartir experiencias y apoyarnos mutuamente.
      </p>
    </>
  );
};