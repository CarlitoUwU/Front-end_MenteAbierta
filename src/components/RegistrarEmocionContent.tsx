import { useState } from "react";
import { FaBolt, FaCloudRain, FaFrown, FaMeh, FaHeart, FaSmile } from "react-icons/fa";

const emociones = [
  { id: "feliz", label: "Feliz", color: "bg-yellow-400", icon: <FaSmile size={30} /> },
  { id: "tranquilo", label: "Tranquilo", color: "bg-green-500", icon: <FaHeart size={30} /> },
  { id: "neutral", label: "Neutral", color: "bg-gray-400", icon: <FaMeh size={30} /> },
  { id: "ansioso", label: "Ansioso", color: "bg-orange-400", icon: <FaBolt size={30} /> },
  { id: "triste", label: "Triste", color: "bg-sky-500", icon: <FaCloudRain size={30} /> },
  { id: "enojado", label: "Enojado", color: "bg-red-400", icon: <FaFrown size={30} /> },
];

export const RegistrarEmocionContent = () => {

  const [mostrarCaja, setMostrarCaja] = useState(false);

  const onClickEmocion = () => {
    setMostrarCaja(true);
  }
  const onCancelar = () => {
    setMostrarCaja(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800">¿Cómo te sientes hoy?</h1>
      <p className="text-gray-600 mt-2">Tómate un momento para registrar tu estado emocional</p>

      <div className="mt-6 bg-white rounded-xl p-6 shadow">
        <p className="font-medium text-gray-700 mb-4">Selecciona una emoción</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {emociones.map((emocion) => (
            <button
              key={emocion.id}
              className={`${emocion.color} rounded-xl flex flex-col items-center justify-center gap-2 p-6 py-10 text-white hover:opacity-90 transition`}
              onClick={onClickEmocion}
            >
              {emocion.icon}
              <span className="text-lg font-medium">{emocion.label}</span>
            </button>
          ))}
        </div>

        {mostrarCaja && (
          <div className="mt-6 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Intensidad</h2>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Baja</span>
                <span>Alta</span>
              </div>

              <div className="mt-2 relative">
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={3}
                  className="w-full accent-purple-500 cursor-pointer"
                  disabled
                />

                <div className="absolute -right-4 -top-3 bg-purple-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-lg font-semibold">
                  3
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold">Nota privada (opcional)</h2>
              <p className="text-sm text-gray-500 mb-4">
                Esta nota está encriptada y solo tú puedes verla
              </p>

              <textarea
                className="w-full h-32 p-4 bg-gray-50 rounded-lg outline-none resize-none text-gray-700 placeholder-gray-400"
                placeholder="¿Qué está pasando en tu día? ¿Hay algo específico que causó esta emoción?"
                maxLength={500}
              />

              <div className="text-right text-sm text-gray-500 mt-1">
                0 / 500 caracteres
              </div>
            </div>

          </div>
        )}

        <div className="flex items-center gap-4 mt-6">
          <button className="flex-1 bg-gray-200 text-gray-500 py-3 rounded-lg cursor-not-allowed">
            Guardar registro
          </button>

          <button className="text-gray-600 w-[200px] hover:underline" onClick={onCancelar}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};