import { useState } from "react";
import { MdAssignment, MdAccessTime, MdEdit, MdClose, MdCheckCircle } from "react-icons/md";

interface Cuestionario {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  preguntas: number;
}

interface RespuestaRegistroDiario {
  pregunta1: number;
  pregunta2: number;
  pregunta3: number;
  pregunta4: number;
  pregunta5: number;
  pregunta6: number;
}

export const CuestionarioContent = () => {
  const [cuestionarioActivo, setCuestionarioActivo] = useState<string | null>(null);
  const [mostrarCompletado, setMostrarCompletado] = useState(false);
  const [respuestas, setRespuestas] = useState<RespuestaRegistroDiario>({
    pregunta1: 5,
    pregunta2: 0,
    pregunta3: 1,
    pregunta4: 0,
    pregunta5: 0,
    pregunta6: 0,
  });

  const cuestionarios: Cuestionario[] = [
    {
      id: "registro-diario",
      titulo: "Registro Diario",
      descripcion: "Evalúa tu estado emocional y bienestar del día",
      duracion: "1 min",
      preguntas: 6,
    },
    {
      id: "bienestar-general",
      titulo: "Bienestar General",
      descripcion: "Evalúa tu estado de bienestar actual en diferentes áreas de tu vida",
      duracion: "5-7 min",
      preguntas: 10,
    },
    {
      id: "manejo-estres",
      titulo: "Manejo del Estrés",
      descripcion: "Identifica cómo estás manejando el estrés en tu día a día",
      duracion: "3-5 min",
      preguntas: 8,
    },
    {
      id: "calidad-sueno",
      titulo: "Calidad del Sueño",
      descripcion: "Reflexiona sobre tus patrones de sueño y descanso",
      duracion: "4-6 min",
      preguntas: 9,
    },
  ];

  const handleComenzarCuestionario = (id: string) => {
    setCuestionarioActivo(id);
    setMostrarCompletado(false);
  };

  const handleCerrarCuestionario = () => {
    setCuestionarioActivo(null);
    setMostrarCompletado(false);
  };

  const handleEnviarRegistroDiario = () => {
    console.log("Respuestas enviadas:", respuestas);
    setMostrarCompletado(true);
    // Aquí se enviarían las respuestas al backend
  };

  const actualizarRespuesta = (pregunta: keyof RespuestaRegistroDiario, valor: number) => {
    setRespuestas(prev => ({ ...prev, [pregunta]: valor }));
  };

  // Modal del Registro Diario
  if (cuestionarioActivo === "registro-diario") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay semitransparente */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleCerrarCuestionario}
        ></div>
        
        {/* Contenido del modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header del modal */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
            <h2 className="text-2xl font-bold text-gray-800">Registro Diario</h2>
            <button
              onClick={handleCerrarCuestionario}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MdClose className="text-2xl text-gray-600" />
            </button>
          </div>

          {mostrarCompletado ? (
            // Vista de completado
            <div className="p-8 text-center">
              <div className="mb-6">
                <MdCheckCircle className="text-7xl text-green-500 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">¡Registro completado!</h3>
              <p className="text-gray-600 mb-6">
                Gracias por compartir cómo te sientes hoy. Esta información nos ayuda a brindarte mejores recomendaciones.
              </p>
              <button
                onClick={handleCerrarCuestionario}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Volver a cuestionarios
              </button>
            </div>
          ) : (
            <>
              {/* Mensaje informativo */}
              <div className="p-6 bg-purple-50 border-l-4 border-purple-600 mx-6 mt-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold text-purple-900">Importante:</span> Este registro diario te ayudará a conocer mejor tu estado emocional y tus hábitos de bienestar. Responder te tomará menos de un minuto. <span className="font-semibold">Tus respuestas no son un diagnóstico</span>, pero nos permiten ofrecerte recomendaciones personalizadas de autocuidado. Responde de la manera más honesta y cercana a cómo te has sentido hoy.
                </p>
              </div>

              {/* Formulario de preguntas */}
              <div className="p-6 space-y-8">
                {/* Pregunta 1 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    1. ¿Cómo te sentiste hoy en general?
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={respuestas.pregunta1}
                      onChange={(e) => actualizarRespuesta("pregunta1", parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>0 - Muy mal</span>
                      <span className="font-bold text-purple-600 text-lg">{respuestas.pregunta1}</span>
                      <span>10 - Muy bien</span>
                    </div>
                  </div>
                </div>

                {/* Pregunta 2 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    2. ¿Qué tan abrumado/a te sentiste hoy?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["En ningún momento", "En algunos momentos", "En varios momentos del día", "En gran parte del día"].map((opcion, index) => (
                      <button
                        key={index}
                        onClick={() => actualizarRespuesta("pregunta2", index)}
                        className={`p-4 rounded-lg border-2 transition-all font-medium ${
                          respuestas.pregunta2 === index
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-700"
                        }`}
                      >
                        {index}. {opcion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 3 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    3. ¿Pudiste dormir bien anoche?
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { valor: 0, texto: "No" },
                      { valor: 1, texto: "Parcialmente" },
                      { valor: 2, texto: "Sí" }
                    ].map((opcion) => (
                      <button
                        key={opcion.valor}
                        onClick={() => actualizarRespuesta("pregunta3", opcion.valor)}
                        className={`p-4 rounded-lg border-2 transition-all font-medium ${
                          respuestas.pregunta3 === opcion.valor
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-700"
                        }`}
                      >
                        {opcion.texto}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 4 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    4. ¿Experimentaste tensión o malestar físico durante el día?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["En ningún momento", "En algunos momentos", "En varios momentos del día", "En gran parte del día"].map((opcion, index) => (
                      <button
                        key={index}
                        onClick={() => actualizarRespuesta("pregunta4", index)}
                        className={`p-4 rounded-lg border-2 transition-all font-medium ${
                          respuestas.pregunta4 === index
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-700"
                        }`}
                      >
                        {index}. {opcion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 5 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    5. ¿Tuviste dificultades para concentrarte?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["En ningún momento", "En algunos momentos", "En varios momentos del día", "En gran parte del día"].map((opcion, index) => (
                      <button
                        key={index}
                        onClick={() => actualizarRespuesta("pregunta5", index)}
                        className={`p-4 rounded-lg border-2 transition-all font-medium ${
                          respuestas.pregunta5 === index
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-700"
                        }`}
                      >
                        {index}. {opcion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pregunta 6 */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    6. ¿Sentiste emociones intensas difíciles de manejar?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["En ningún momento", "En algunos momentos", "En varios momentos del día", "En gran parte del día"].map((opcion, index) => (
                      <button
                        key={index}
                        onClick={() => actualizarRespuesta("pregunta6", index)}
                        className={`p-4 rounded-lg border-2 transition-all font-medium ${
                          respuestas.pregunta6 === index
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-700"
                        }`}
                      >
                        {index}. {opcion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón enviar */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
                <button
                  onClick={handleEnviarRegistroDiario}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                >
                  Enviar registro diario
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Vista principal de cuestionarios
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Cuestionarios de Bienestar</h1>
        <p className="text-lg text-gray-600">
          Estos cuestionarios te ayudarán a reflexionar sobre diferentes aspectos de tu bienestar
        </p>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cuestionarios.map((cuestionario, index) => (
          <div
            key={cuestionario.id}
            className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col ${
              index === 3 ? "md:col-span-1" : ""
            }`}
          >
            {/* Icono y Título */}
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-purple-100 rounded-full p-4 flex-shrink-0">
                <MdAssignment className="text-3xl text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {cuestionario.titulo}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {cuestionario.descripcion}
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-6 mt-auto pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <MdAccessTime className="text-lg" />
                <span className="text-sm">{cuestionario.duracion}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MdEdit className="text-lg" />
                <span className="text-sm">{cuestionario.preguntas} preguntas</span>
              </div>
            </div>

            {/* Botón */}
            <button
              onClick={() => handleComenzarCuestionario(cuestionario.id)}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Comenzar cuestionario
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}