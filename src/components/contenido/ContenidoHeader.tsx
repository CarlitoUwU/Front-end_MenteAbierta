import { COLORS } from "../../constants/colors";

export const ContenidoHeader = () => {
  return (
    <div
      className="flex flex-col"
      style={{ color: COLORS.texto_oscuro, gap: "0.4rem" }}
    >
      <h1
        className="text-2xl font-bold"
        style={{
          color: COLORS.azul_oscuro,
          marginBottom: "0.25rem",
        }}
      >
        Biblioteca de Contenido
      </h1>

      <p
        className="text-sm leading-relaxed"
        style={{ color: COLORS.texto_medio }}
      >
        Artículos y recursos para apoyar tu bienestar emocional.
      </p>
    </div>
  );
};
