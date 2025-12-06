import { useState } from "react";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { COLORS } from "../../constants/colors";

type PreguntaModalProps = {
  header: string | React.ReactNode;
  children: React.ReactNode;
  handleCerrar: () => void;
  handleSubmit: () => void;
  isSubmitting?: boolean;
};

export const PreguntaModal = ({ header, children, handleCerrar, handleSubmit, isSubmitting = false }: PreguntaModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        onClick={handleCerrar}
      ></div>

      {/* Modal content */}
      <div
        className="relative rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 animate-fade-in"
        style={{ backgroundColor: COLORS.claro }}
      >
        {/* Header */}
        <div
          className="sticky top-0 flex items-center justify-between p-6 rounded-t-2xl shadow-sm z-10"
          style={{ backgroundColor: COLORS.claro, borderBottom: `1px solid ${COLORS.azul_claro}` }}
        >
          <h2 className="text-2xl font-bold" style={{ color: COLORS.texto_oscuro }}>
            Registro Diario
          </h2>
          <button
            onClick={handleCerrar}
            className="p-2 rounded-lg transition-colors hover:bg-gray-200 cursor-pointer"
          >
            <MdClose className="text-2xl" style={{ color: COLORS.texto_medio }} />
          </button>
        </div>

        {isSubmitted ? (
          // Vista completada
          <div className="p-8 text-center">
            <MdCheckCircle className="mx-auto mb-6" style={{ color: COLORS.azul, fontSize: '5rem' }} />
            <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.texto_oscuro }}>
              ¡Registro completado!
            </h3>
            <p className="mb-6" style={{ color: COLORS.texto_medio, lineHeight: '1.6' }}>
              Gracias por compartir cómo te sientes hoy. Esta información nos ayuda a brindarte mejores recomendaciones.
            </p>
            <button
              onClick={handleCerrar}
              className="font-semibold py-3 px-8 rounded-lg shadow-md transition-all hover:brightness-90 cursor-pointer"
              style={{ backgroundColor: COLORS.azul, color: COLORS.texto_claro }}
            >
              Volver a cuestionarios
            </button>
          </div>
        ) : (
          <>
            {/* Mensaje informativo */}
            <div
              className="mx-6 mt-6 p-6 rounded-lg"
              style={{ backgroundColor: COLORS.azul_claro, borderLeft: `4px solid ${COLORS.azul}` }}
            >
              <p style={{ color: COLORS.texto_oscuro, lineHeight: '1.6' }}>
                {header}
              </p>
            </div>

            {/* Contenido del formulario */}
            <div className="p-6 space-y-8">
              {children}
            </div>

            {/* Footer con botón */}
            <div
              className="sticky bottom-0 p-6 rounded-b-2xl shadow-sm"
              style={{ backgroundColor: COLORS.claro, borderTop: `1px solid ${COLORS.azul_claro}` }}
            >
              <button
                onClick={async () => { 
                  await handleSubmit(); 
                  setIsSubmitted(true); 
                }}
                disabled={isSubmitting}
                className={`w-full font-semibold py-4 px-6 rounded-lg shadow-md transition-all ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:brightness-90 hover:shadow-lg cursor-pointer'
                }`}
                style={{ backgroundColor: COLORS.azul, color: COLORS.texto_claro }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar cuestionario'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
