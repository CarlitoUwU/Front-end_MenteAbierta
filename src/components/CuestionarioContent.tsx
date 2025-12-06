import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { DashboardContentProps } from "../@types/dashboard";
import { PreguntaCard } from "./cuestionario/PreguntaCard";
import { PreguntaModal } from "./cuestionario/PreguntaModal";
import { PreguntaItem } from "./cuestionario/PreguntaItem";
import { OpcionItem } from "./cuestionario/OpcionItem";
import { InputSlider } from "./ui/InputSlider";
import { cuestionariosService } from "../services/cuestionarios.service";
import type { Cuestionario, Pregunta } from "../types";


export const CuestionarioContent = (_props: DashboardContentProps) => {
  const [cuestionarioActivo, setCuestionarioActivo] = useState<number | null>(null);
  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);
  const [loading, setLoading] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});

  // Cargar cuestionarios del backend
  useEffect(() => {
    const cargarCuestionarios = async () => {
      try {
        const data = await cuestionariosService.getAll();
        setCuestionarios(data);
      } catch (error) {
        console.error("Error al cargar cuestionarios:", error);
        toast.error("Error al cargar los cuestionarios");
      } finally {
        setLoading(false);
      }
    };

    cargarCuestionarios();
  }, []);

  const handleComenzarCuestionario = (id: number) => {
    setCuestionarioActivo(id);
    // Inicializar respuestas con valores por defecto
    const cuestionario = cuestionarios.find(c => c.id === id);
    if (cuestionario) {
      const respuestasIniciales: Record<number, number> = {};
      cuestionario.preguntas.forEach(p => {
        respuestasIniciales[p.id] = p.tipo_pregunta === 'ESCALA' ? 5 : 0;
      });
      setRespuestas(respuestasIniciales);
    }
  };

  const handleCerrarCuestionario = () => {
    setCuestionarioActivo(null);
  };

  const handleEnviarCuestionario = async () => {
    setEnviando(true);
    try {
      // Enviar cada respuesta al backend
      const promesas = Object.entries(respuestas).map(([preguntaId, valor]) =>
        cuestionariosService.responder({
          pregunta: parseInt(preguntaId),
          valor_respuesta: valor,
        })
      );

      await Promise.all(promesas);
      toast.success("Cuestionario completado exitosamente");
      setCuestionarioActivo(null);
      setRespuestas({});
    } catch (error: any) {
      console.error("Error al enviar cuestionario:", error);
      toast.error(error.response?.data?.detail || "Error al enviar las respuestas");
    } finally {
      setEnviando(false);
    }
  };

  const actualizarRespuesta = (preguntaId: number, valor: number) => {
    setRespuestas(prev => ({ ...prev, [preguntaId]: valor }));
  };

  // Modal del cuestionario activo
  if (cuestionarioActivo !== null) {
    const cuestionario = cuestionarios.find(c => c.id === cuestionarioActivo);
    if (!cuestionario) return null;

    return (
      <PreguntaModal
        header={
          <>
            <span className="font-semibold text-purple-900">Importante:</span> {cuestionario.descripcion || 'Este cuestionario te ayudará a conocer mejor tu estado emocional y tus hábitos de bienestar.'} <span className="font-semibold">Tus respuestas no son un diagnóstico</span>, pero nos permiten ofrecerte recomendaciones personalizadas de autocuidado. Responde de la manera más honesta posible.
          </>
        }
        handleCerrar={handleCerrarCuestionario}
        handleSubmit={handleEnviarCuestionario}
        isSubmitting={enviando}
      >
        {cuestionario.preguntas
          .sort((a, b) => a.orden - b.orden)
          .map((pregunta) => (
            <PreguntaItem
              key={pregunta.id}
              label={`${pregunta.orden}. ${pregunta.texto}`}
              isSlider={pregunta.tipo_pregunta === 'ESCALA'}
            >
              {pregunta.tipo_pregunta === 'ESCALA' ? (
                <InputSlider
                  value={respuestas[pregunta.id] || 5}
                  onChange={(newValue) => actualizarRespuesta(pregunta.id, newValue)}
                  minString="Muy mal"
                  maxString="Muy bien"
                />
              ) : pregunta.tipo_pregunta === 'BOOLEAN' ? (
                <div className="flex gap-4">
                  <OpcionItem
                    opcion="Sí"
                    isSelected={respuestas[pregunta.id] === 1}
                    onClick={() => actualizarRespuesta(pregunta.id, 1)}
                  />
                  <OpcionItem
                    opcion="No"
                    isSelected={respuestas[pregunta.id] === 0}
                    onClick={() => actualizarRespuesta(pregunta.id, 0)}
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500">Tipo de pregunta no soportado: {pregunta.tipo_pregunta}</p>
              )}
            </PreguntaItem>
          ))}
      </PreguntaModal>
    );
  }

  // Vista principal de cuestionarios
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando cuestionarios...</p>
      </div>
    );
  }

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
      {cuestionarios.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay cuestionarios disponibles en este momento</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cuestionarios.map((cuestionario) => (
            <PreguntaCard
              key={cuestionario.id}
              id={cuestionario.id.toString()}
              titulo={cuestionario.nombre}
              descripcion={cuestionario.descripcion || ''}
              duracion={cuestionario.tiempo_estimado}
              preguntas={cuestionario.preguntas.length}
              handleClickComenzar={() => handleComenzarCuestionario(cuestionario.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}