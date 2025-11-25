import { useState } from "react";
import { MdLibraryBooks, MdSelfImprovement, MdForum, MdLightbulb } from "react-icons/md";

export const InicioContent = () => {
  const [activeTab, setActiveTab] = useState<"diario" | "ejercicios" | "foro">("diario");

  const emotionalData = [
    { day: "Lun", level: "bajo", height: 30, color: "bg-yellow-400" },
    { day: "Mar", level: "medio", height: 60, color: "bg-green-400" },
    { day: "Mie", level: "alto", height: 90, color: "bg-blue-400" },
    { day: "Jue", level: "medio", height: 65, color: "bg-green-400" },
    { day: "Vie", level: "bajo", height: 35, color: "bg-yellow-400" },
    { day: "Sab", level: "alto", height: 85, color: "bg-blue-400" },
    { day: "Dom", level: "medio", height: 55, color: "bg-green-400" },
  ];

  const notifications = [
    { text: "Nuevo ejercicio de respiración disponible", time: "hace 2 horas", color: "bg-blue-500" },
    { text: "Has completado 3 días seguidos de registros", time: "hace 1 día", color: "bg-green-500" },
    { text: "Recordatorio: Completa tu cuestionario semanal", time: "hace 2 días", color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Fila 1: Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Hola, user123</h1>
      </div>

      {/* Fila 2: Tip del día */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-md p-6">
        <div className="flex items-start gap-4">
          <MdLightbulb className="text-4xl text-yellow-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Tip del día</h2>
            <p className="text-gray-700 leading-relaxed">
              Practica la respiración consciente: Inhala profundamente por 4 segundos, 
              mantén el aire por 4 segundos y exhala lentamente por 6 segundos. 
              Repite este ciclo 5 veces para reducir el estrés y encontrar calma.
            </p>
          </div>
        </div>
      </div>

      {/* Fila 3: Navegación horizontal */}
      <div className="grid grid-cols-3 gap-6">
        {/* Diario */}
        <button
          onClick={() => setActiveTab("diario")}
          className={`bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
            activeTab === "diario" ? "ring-2 ring-green-600" : ""
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <MdLibraryBooks className="text-5xl text-green-600" />
            <span className="text-lg font-semibold text-gray-800">Diario</span>
          </div>
        </button>

        {/* Ejercicios */}
        <button
          onClick={() => setActiveTab("ejercicios")}
          className={`bg-white rounded-lg shadow-md p-6 relative transition-all hover:shadow-lg ${
            activeTab === "ejercicios" ? "ring-2 ring-green-600" : ""
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <MdSelfImprovement className="text-5xl text-green-600" />
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span className="text-lg font-semibold text-gray-800">Ejercicios</span>
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              2
            </span>
          </div>
        </button>

        {/* Foro */}
        <button
          onClick={() => setActiveTab("foro")}
          className={`bg-white rounded-lg shadow-md p-6 relative transition-all hover:shadow-lg ${
            activeTab === "foro" ? "ring-2 ring-green-600" : ""
          }`}
        >
          <div className="flex flex-col items-center gap-3">
            <MdForum className="text-5xl text-green-600" />
            <span className="text-lg font-semibold text-gray-800">Foro</span>
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              1
            </span>
          </div>
        </button>
      </div>

      {/* Fila 4: Contenido principal (dos columnas) */}
      <div className="grid grid-cols-3 gap-6">
        {/* Columna izquierda: Gráfico (2/3 del ancho) */}
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tendencia Emocional</h2>
          
          <div className="flex gap-4">
            {/* Eje Y */}
            <div className="flex flex-col justify-between py-6 pr-2">
              <span className="text-sm font-medium text-gray-600">Alto</span>
              <span className="text-sm font-medium text-gray-600">Bajo</span>
            </div>

            {/* Gráfico de barras */}
            <div className="flex-1 flex items-end justify-between gap-3 border-l-2 border-b-2 border-gray-300 pl-4 pb-2">
              {emotionalData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 h-64">
                  <div className="w-full flex items-end justify-center h-full">
                    <div
                      className={`w-full ${data.color} rounded-t-md transition-all hover:opacity-80 cursor-pointer`}
                      style={{ height: `${data.height}%` }}
                      title={`${data.day}: Estado ${data.level}`}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 mt-3">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: Notificaciones (1/3 del ancho) */}
        <div className="col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Notificaciones</h2>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex gap-3">
                {/* Barra de color */}
                <div className={`w-1 ${notification.color} rounded-full flex-shrink-0`}></div>
                
                {/* Contenido */}
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium leading-snug mb-1">
                    {notification.text}
                  </p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}