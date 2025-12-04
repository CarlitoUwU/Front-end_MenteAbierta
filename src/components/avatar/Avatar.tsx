import { COLORS } from "../../constants/colors";

export const Avatar = ({ letter = "U" }) => {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md"
      style={{
        background: `linear-gradient(135deg, ${COLORS.azul_semi}, ${COLORS.azul})`,
      }}
    >
      {letter}
    </div>
  );
};
