import { useState, type ChangeEvent } from "react";
import { FaBolt, FaCloudRain, FaFrown, FaMeh, FaHeart, FaSmile } from "react-icons/fa";
import toast from "react-hot-toast";
import type { DashboardContentProps } from "../@types/dashboard";
import { InputSlider } from "./ui/InputSlider";
import { COLORS } from "../constants/colors";
import { EmocionButton } from "./dashboard/registrarEmocion/EmocionButton";
import { emocionesService } from "../services/emociones.service";

const emociones = [
  { id: "feliz", label: "Feliz", color: "bg-yellow-400", icon: <FaSmile size={30} /> },
  { id: "tranquilo", label: "Tranquilo", color: "bg-green-500", icon: <FaHeart size={30} /> },
  { id: "neutral", label: "Neutral", color: "bg-gray-400", icon: <FaMeh size={30} /> },
  { id: "ansioso", label: "Ansioso", color: "bg-orange-400", icon: <FaBolt size={30} /> },
  { id: "triste", label: "Triste", color: "bg-sky-500", icon: <FaCloudRain size={30} /> },
  { id: "enojado", label: "Enojado", color: "bg-red-400", icon: <FaFrown size={30} /> },
];

export const RegistrarEmocionContent = (_props: DashboardContentProps) => {
  const [mostrarCaja, setMostrarCaja] = useState(false);
  const [valor, setValor] = useState(5);
  const [emocion, setEmocion] = useState<string | null>(null);
  const [textoNota, setTextoNota] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleSeleccionarEmocion = (emocionId: string) => {
    setEmocion(emocionId);
    setMostrarCaja(true);
  }

  const handleChangeNota = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 500) {
      setTextoNota(e.target.value);
    }
  }

  const handleGuardar = async () => {
    if (!emocion) {
      toast.error("Debes seleccionar una emoción");
      return;
    }

    setGuardando(true);
    try {
      await emocionesService.registrar({
        emocion: emocion.toUpperCase(),
        intensidad: valor,
        nota: textoNota.trim() || undefined,
      });

      toast.success("Emoción registrada exitosamente");
      
      // Resetear formulario
      setEmocion(null);
      setValor(5);
      setTextoNota("");
      setMostrarCaja(false);
    } catch (error: any) {
      console.error("Error al guardar emoción:", error);
      toast.error(error.response?.data?.detail || "Error al guardar el registro");
    } finally {
      setGuardando(false);
    }
  }

  const handleCancelar = () => {
    setEmocion(null);
    setValor(5);
    setTextoNota("");
    setMostrarCaja(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold" style={{ color: COLORS.texto_oscuro }}>
        ¿Cómo te sientes hoy?
      </h1>
      <p style={{ color: COLORS.texto_medio }} className="mt-2">
        Tómate un momento para registrar tu estado emocional
      </p>

      <div className="mt-6 bg-white rounded-xl p-6 shadow">
        <p style={{ color: COLORS.texto_medio }} className="font-medium mb-4">Selecciona una emoción</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emociones.map((e) => (
            <EmocionButton key={e.id} {...e} onClick={() => handleSeleccionarEmocion(e.id)} />
          ))}
        </div>

        {mostrarCaja && (
          <div className="mt-6 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4" style={{ color: COLORS.texto_oscuro }}>Intensidad</h2>
              <InputSlider value={valor} onChange={setValor} minString="Baja" maxString="Alta" />

              <h2 className="text-lg font-semibold" style={{ color: COLORS.texto_oscuro }}>Nota privada (opcional)</h2>
              <p className="text-sm mb-4" style={{ color: COLORS.texto_medio }}>
                Esta nota está encriptada y solo tú puedes verla
              </p>
              <textarea
                className="w-full h-32 p-4 rounded-lg outline-none resize-none border transition-colors"
                placeholder="¿Qué está pasando en tu día? ¿Hay algo específico que causó esta emoción?"
                maxLength={500}
                style={{ 
                  backgroundColor: COLORS.claro, 
                  color: COLORS.texto_oscuro,
                  borderColor: COLORS.gris_claro
                }}
                value={textoNota}
                onChange={handleChangeNota}
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.azul}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.gris_claro}
              />
              <div className="text-right text-sm mt-1" style={{ color: COLORS.texto_medio }}>{textoNota.length} / 500 caracteres</div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mt-6">
          <button 
            className="flex-1 py-3 rounded-lg font-semibold transition-all"
            style={{
              backgroundColor: mostrarCaja && !guardando ? COLORS.azul : COLORS.gris_medio,
              color: mostrarCaja && !guardando ? 'white' : COLORS.texto_medio,
              cursor: mostrarCaja && !guardando ? 'pointer' : 'not-allowed'
            }}
            onClick={handleGuardar}
            disabled={!mostrarCaja || guardando}
            onMouseEnter={(e) => {
              if (mostrarCaja && !guardando) {
                e.currentTarget.style.backgroundColor = COLORS.azul_semi;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (mostrarCaja && !guardando) {
                e.currentTarget.style.backgroundColor = COLORS.azul;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {guardando ? "Guardando..." : "Guardar registro"}
          </button>
          <button 
            className="w-[200px] transition-all"
            style={{ 
              color: mostrarCaja ? COLORS.azul : COLORS.gris_medio,
              cursor: mostrarCaja ? 'pointer' : 'not-allowed'
            }}
            onClick={handleCancelar}
            disabled={!mostrarCaja}
            onMouseEnter={(e) => {
              if (mostrarCaja) e.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none';
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
