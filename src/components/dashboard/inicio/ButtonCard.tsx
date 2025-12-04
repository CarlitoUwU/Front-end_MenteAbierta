import type { ButtonHTMLAttributes } from "react";
import { COLORS } from "../../../constants/colors";

type ButtonCardProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonCard = ({ onClick, children }: ButtonCardProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: COLORS.claro,
      }}
      className="rounded-lg p-6 transition-all cursor-pointer shadow hover:shadow-xl"
    >
      {children}
    </button>
  );
};
