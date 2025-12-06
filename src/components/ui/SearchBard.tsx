import { COLORS } from "../../constants/colors";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

type SearchNativeProps = React.InputHTMLAttributes<HTMLInputElement>

type Props = SearchProps & Omit<SearchNativeProps, "onChange">;

export const SearchBard = ({ value, onChange, ...other }: Props) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        {...other}
        className="w-full p-4 rounded-lg shadow-sm outline-none transition-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          backgroundColor: COLORS.claro,
          border: `1px solid ${COLORS.azul_claro}`,
          color: COLORS.texto_oscuro,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = COLORS.azul;
          e.currentTarget.style.boxShadow = `0 0 0 3px ${COLORS.azul_claro}`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = COLORS.azul_claro;
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </div>
  );
};
