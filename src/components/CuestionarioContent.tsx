import { MdAssignment, MdAccessTime, MdEdit } from "react-icons/md";

interface Cuestionario {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  preguntas: number;
}

export const CuestionarioContent = () => {
  const cuestionarios: Cuestionario[] = [
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
    console.log(`Iniciando cuestionario: ${id}`);
    // Aquí se implementará la lógica para iniciar el cuestionario
  };

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
              index === 2 ? "md:col-span-1" : ""
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