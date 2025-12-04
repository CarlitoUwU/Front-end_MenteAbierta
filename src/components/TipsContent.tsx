import { useState } from "react";
import { 
  MdLightbulb, 
  MdSentimentVerySatisfied, 
  MdFlashOn, 
  MdNightlight, 
  MdFavorite,
  MdRefresh
} from "react-icons/md";
import type { DashboardContentProps } from "../@types/dashboard";

type Categoria = "Todos" | "Diario" | "Estrés" | "Sueño" | "Bienestar";

interface Tip {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  color: "yellow" | "purple" | "white";
}

export const TipsContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todos");
  const [tipActualIndex, setTipActualIndex] = useState(0);

  const categorias = [
    { nombre: "Todos" as Categoria, icono: MdLightbulb },
    { nombre: "Diario" as Categoria, icono: MdSentimentVerySatisfied },
    { nombre: "Estrés" as Categoria, icono: MdFlashOn },
    { nombre: "Sueño" as Categoria, icono: MdNightlight },
    { nombre: "Bienestar" as Categoria, icono: MdFavorite },
  ];

  const tips: Tip[] = [
    {
      id: "gratitud-matutina",
      titulo: "Práctica de gratitud matutina",
      descripcion: "Comienza tu día escribiendo tres cosas por las que estás agradecido. Esta práctica simple puede mejorar significativamente tu estado de ánimo.",
      categoria: "Diario",
      color: "yellow",
    },
    {
      id: "cinco-sentidos",
      titulo: "Técnica de los 5 sentidos",
      descripcion: "Cuando te sientas abrumado, identifica: 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles y 1 que saboreas. Te ayudará a volver al presente.",
      categoria: "Estrés",
      color: "white",
    },
    {
      id: "rutina-desconexion",
      titulo: "Rutina de desconexión",
      descripcion: "Apaga las pantallas 1 hora antes de dormir. La luz azul puede interferir con tu ciclo de sueño natural y afectar la calidad de tu descanso.",
      categoria: "Sueño",
      color: "white",
    },
    {
      id: "respiracion-consciente",
      titulo: "Respiración consciente",
      descripcion: "Dedica 5 minutos cada mañana a respirar profundamente. Esto oxigena tu cerebro y te prepara para enfrentar el día con más calma.",
      categoria: "Bienestar",
      color: "white",
    },
  ];

  const tipsFiltrados = categoriaActiva === "Todos"
    ? tips
    : tips.filter((tip) => tip.categoria === categoriaActiva);

  const tipActual = tipsFiltrados[tipActualIndex] || tips[0];

  const siguienteTip = () => {
    setTipActualIndex((prev) => (prev + 1) % tipsFiltrados.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Tips de Bienestar</h1>
        <p className="text-lg text-gray-600">
          Consejos prácticos para tu día a día
        </p>
      </div>

      {/* Filtros/Categorías - Pills horizontales con iconos */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {categorias.map((categoria) => {
            const Icono = categoria.icono;
            const isActive = categoriaActiva === categoria.nombre;
            
            return (
              <button
                key={categoria.nombre}
                onClick={() => {
                  setCategoriaActiva(categoria.nombre);
                  setTipActualIndex(0);
                }}
                className={`px-5 py-2.5 rounded-full font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200"
                }`}
              >
                <Icono className="text-lg" />
                {categoria.nombre}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta destacada grande (carousel principal) */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        {/* Icono circular superior izquierda */}
        <div className="absolute top-6 left-6 bg-white bg-opacity-30 rounded-full p-4">
          <MdLightbulb className="text-4xl text-white" />
        </div>

        {/* Contenido principal */}
        <div className="mt-16 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {tipActual.titulo}
          </h2>
          <p className="text-white text-lg leading-relaxed max-w-3xl">
            {tipActual.descripcion}
          </p>
        </div>

        {/* Footer inferior */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm font-medium">
            Tip {tipActualIndex + 1} de {tipsFiltrados.length}
          </span>
          <button
            onClick={siguienteTip}
            className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium px-5 py-2.5 rounded-full transition-all"
          >
            <MdRefresh className="text-xl" />
            Siguiente tip
          </button>
        </div>
      </div>

      {/* Tarjetas pequeñas (fila horizontal scrolleable) */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-max">
          {tipsFiltrados.map((tip, index) => {
            const isActive = index === tipActualIndex;
            
            return (
              <button
                key={tip.id}
                onClick={() => setTipActualIndex(index)}
                className={`w-80 flex-shrink-0 rounded-2xl shadow-md p-6 text-left transition-all hover:shadow-lg ${
                  isActive
                    ? "bg-gradient-to-br from-purple-500 to-purple-600 ring-2 ring-purple-600 ring-offset-2"
                    : "bg-white"
                }`}
              >
                <h3 className={`text-xl font-bold mb-3 ${
                  isActive ? "text-white" : "text-gray-800"
                }`}>
                  {tip.titulo}
                </h3>
                <p className={`text-sm leading-relaxed line-clamp-3 ${
                  isActive ? "text-white" : "text-gray-600"
                }`}>
                  {tip.descripcion}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}