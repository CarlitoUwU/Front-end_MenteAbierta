import { FiPlus, FiMessageCircle, FiHeart } from "react-icons/fi";

export const ForoContent = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Foro Comunitario</h1>

        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition">
          <FiPlus size={18} />
          Nueva publicación
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Un espacio seguro para compartir experiencias y apoyarnos mutuamente.
      </p>

      {/* Categorías */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["Todos", "Ansiedad", "Bienestar", "Relaciones", "Estrés"].map(cat => (
          <button
            key={cat}
            className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tarjeta 1 */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-semibold text-green-700">
            MG
          </div>
          <div>
            <p className="font-semibold">María G.</p>
            <span className="text-xs text-gray-500">Hace 2 horas · Ansiedad</span>
          </div>
        </div>

        <h2 className="font-bold text-lg mb-2">¿Cómo manejan la ansiedad antes de dormir?</h2>
        <p className="text-gray-700 mb-4">
          Últimamente me cuesta mucho conciliar el sueño porque mi mente no deja de pensar...
        </p>

        <div className="flex gap-6 text-gray-600 text-sm">
          <span className="flex items-center gap-1">
            <FiHeart /> 24
          </span>
          <span className="flex items-center gap-1">
            <FiMessageCircle /> 12 respuestas
          </span>
        </div>
      </div>

      {/* Tarjeta 2 */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-semibold text-green-700">
            CR
          </div>
          <div>
            <p className="font-semibold">Carlos R.</p>
            <span className="text-xs text-gray-500">Hace 5 horas · Bienestar</span>
          </div>
        </div>

        <h2 className="font-bold text-lg mb-2">Compartiendo mi progreso con la medicación</h2>
        <p className="text-gray-700 mb-4">
          Llevo 30 días seguidos meditando y quería compartir que realmente veo una diferencia...
        </p>

        <div className="flex gap-6 text-gray-600 text-sm">
          <span className="flex items-center gap-1">
            <FiHeart /> 45
          </span>
          <span className="flex items-center gap-1">
            <FiMessageCircle /> 8 respuestas
          </span>
        </div>
      </div>

      {/* Tarjeta 3 */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-semibold text-green-700">
            AL
          </div>
          <div>
            <p className="font-semibold">Ana L.</p>
            <span className="text-xs text-gray-500">Hace 1 día · Relaciones</span>
          </div>
        </div>

        <h2 className="font-bold text-lg mb-2">
          Recursos para establecer límites saludables
        </h2>
        <p className="text-gray-700 mb-4">
          ¿Alguien puede recomendar recursos para aprender a decir que no sin sentirse culpable?
        </p>

        <div className="flex gap-6 text-gray-600 text-sm">
          <span className="flex items-center gap-1">
            <FiHeart /> 32
          </span>
          <span className="flex items-center gap-1">
            <FiMessageCircle /> 15 respuestas
          </span>
        </div>
      </div>
    </div>
  );
};
