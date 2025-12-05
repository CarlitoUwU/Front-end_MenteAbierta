import { useState } from "react";
import type { DashboardContentProps } from "../@types/dashboard";
import { PreguntaCard } from "./cuestionario/PreguntaCard";
import { PreguntaModal } from "./cuestionario/PreguntaModal";
import { PreguntaItem } from "./cuestionario/PreguntaItem";
import { OpcionItem } from "./cuestionario/OpcionItem";
import { InputSlider } from "./ui/InputSlider";
import { cuestionarios_data, preguntas_data } from "../data/cuestionario.json";


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

export const CuestionarioContent = (_props: DashboardContentProps) => {
  const [cuestionarioActivo, setCuestionarioActivo] = useState<string | null>(null);
  const [respuestas, setRespuestas] = useState<RespuestaRegistroDiario>({
    pregunta1: 5,
    pregunta2: 0,
    pregunta3: 1,
    pregunta4: 0,
    pregunta5: 0,
    pregunta6: 0,
  });

  const cuestionarios: Cuestionario[] = cuestionarios_data;

  const preguntas = preguntas_data as {
    id: number;
    label: string;
    type: "scale" | "options";
    options?: string[];
  }[];

  const handleComenzarCuestionario = (id: string) => {
    setCuestionarioActivo(id);
  };

  const handleCerrarCuestionario = () => {
    setCuestionarioActivo(null);
  };

  const handleEnviarRegistroDiario = () => {
    console.log("Respuestas enviadas:", respuestas);
    // Aquí se enviarían las respuestas al backend
  };

  const actualizarRespuesta = (pregunta: keyof RespuestaRegistroDiario, valor: number) => {
    setRespuestas(prev => ({ ...prev, [pregunta]: valor }));
  };

  // Modal del Registro Diario
  if (cuestionarioActivo === "registro-diario") {
    return (
      <PreguntaModal
        header={
          <>
            <span className="font-semibold text-purple-900">Importante:</span> Este registro diario te ayudará a conocer mejor tu estado emocional y tus hábitos de bienestar. Responder te tomará menos de un minuto. <span className="font-semibold">Tus respuestas no son un diagnóstico</span>, pero nos permiten ofrecerte recomendaciones personalizadas de autocuidado. Responde de la manera más honesta y cercana a cómo te has sentido hoy.
          </>
        }
        handleCerrar={handleCerrarCuestionario}
        handleSubmit={handleEnviarRegistroDiario}
      >
        {preguntas.filter(p => p.type === "scale").map((pregunta) => (
          <PreguntaItem
            key={pregunta.id}
            label={`${pregunta.id}. ${pregunta.label}`}
            isSlider={true}
          >
            <InputSlider
              value={respuestas.pregunta1}
              onChange={(newValue) => actualizarRespuesta("pregunta1", newValue)}
            />
          </PreguntaItem>
        ))}

        {preguntas.filter(p => p.type === "options").map((pregunta) => (
          <PreguntaItem
            key={pregunta.id}
            label={`${pregunta.id}. ${pregunta.label}`}
          >
            {pregunta.options!.map((opcion, index) => (
              <OpcionItem
                key={index}
                opcion={`${index}. ${opcion}`}
                isSelected={respuestas[`pregunta${pregunta.id}` as keyof RespuestaRegistroDiario] === index}
                onClick={() => actualizarRespuesta(`pregunta${pregunta.id}` as keyof RespuestaRegistroDiario, index)}
              />
            ))}
          </PreguntaItem>
        ))}
      </PreguntaModal>
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
        {cuestionarios.map((cuestionario) => (
          <PreguntaCard
            key={cuestionario.id}
            {...cuestionario}
            handleClickComenzar={handleComenzarCuestionario}
          />
        ))}
      </div>
    </div>
  );
}