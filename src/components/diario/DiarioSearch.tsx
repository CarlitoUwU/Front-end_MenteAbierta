import { COLORS } from "../../constants/colors";

type DiarioSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const DiarioSearch = ({ value, onChange }: DiarioSearchProps) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar por título..."
        className="w-full p-4 rounded-lg shadow-sm outline-none transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundColor: COLORS.claro,
          border: `1px solid ${COLORS.azul_claro}`,
          color: COLORS.texto_oscuro,
        }}
      />
    </div>
  );
};