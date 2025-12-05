import { MdAccessTime } from "react-icons/md";
import { COLORS } from "../../constants/colors";

type ArticuloCardProps = {
  imgSrc: string;
  categoria: string;
  duracion: string;
  titulo: string;
  descripcion: string;
};

export const ArticuloCard = ({
  imgSrc,
  categoria,
  duracion,
  titulo,
  descripcion,
}: ArticuloCardProps) => {
  return (
    <div
      className="rounded-lg shadow overflow-hidden"
      style={{ backgroundColor: COLORS.azul }}
    >
      <img
        src={imgSrc}
        className="w-full h-[250px] object-cover"
      />

      <div className="p-4 space-y-2">
        {/* Metadata */}
        <div className="flex items-center gap-3 text-xs">
          {/* Categoría */}
          <span
            className="px-2 py-0.5 rounded font-medium"
            style={{
              backgroundColor: COLORS.azul_claro,
              color: COLORS.azul_oscuro,
            }}
          >
            {categoria}
          </span>

          {/* Duración */}
          <span
            className="flex items-center gap-1"
            style={{ color: COLORS.texto_medio }}
          >
            <MdAccessTime style={{ color: COLORS.texto_medio }} />
            {duracion}
          </span>
        </div>

        {/* Título */}
        <h2
          className="font-semibold text-lg"
          style={{ color: COLORS.texto_oscuro }}
        >
          {titulo}
        </h2>

        {/* Descripción */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: COLORS.texto_medio }}
        >
          {descripcion}
        </p>
      </div>
    </div>
  );
};
