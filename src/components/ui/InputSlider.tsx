import { COLORS } from "../../constants/colors";

type InputSliderProps = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  minString?: string;
  maxString?: string;
};

export const InputSlider = ({
  value,
  onChange,
  min = 0,
  max = 10,
  minString = "0 - Muy mal",
  maxString = "10 - Muy bien",
}: InputSliderProps) => {

  return (
    <div className="space-y-3">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: COLORS.azul_claro,
          accentColor: COLORS.azul,
        }}
      />
      <div className="flex justify-between text-sm" style={{ color: COLORS.texto_medio }}>
        <span>{minString}</span>
        <span className="font-bold text-lg" style={{ color: COLORS.azul }}>
          {value}
        </span>
        <span>{maxString}</span>
      </div>
    </div>
  );
};
