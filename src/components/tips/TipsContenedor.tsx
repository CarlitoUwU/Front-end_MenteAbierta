import { COLORS } from "../../constants/colors";

export const TipsContenedor = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen w-full p-6 space-y-6 border border-gray-200 rounded-2xl"
      style={{ backgroundColor: COLORS.claro }}
    >
      {children}
    </div>
  );
};
