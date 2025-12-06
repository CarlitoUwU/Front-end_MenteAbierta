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
      className="rounded-lg p-6 transition-all cursor-pointer shadow"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      }}
    >
      {children}
    </button>
  );
};
