import { MdCalendarToday, MdAdd } from "react-icons/md";
import type { DashboardContentProps } from "../@types/dashboard";

export const DiarioContent = (_props: DashboardContentProps) => {
  // Ejemplo de entradas (las puedes traer de tu API luego)
  const entradas = [
    {
      titulo: "Reflexiones del lunes",
      preview: "Hoy fue un día productivo…",
      fecha: "2024-01-15",
    },
    {
      titulo: "Gratitud diaria",
      preview: "Estoy agradecido por…",
      fecha: "2024-01-14",
    },
    {
      titulo: "Sin título",
      preview: "Necesito procesar lo que pasó hoy…",
      fecha: "2024-01-13",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Mi Diario</h1>
        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          <MdAdd size={20} />
          Nueva entrada
        </button>
      </div>


      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por título..."
          className="w-full bg-white p-4 rounded-lg shadow-sm outline-none placeholder-gray-400"
        />
      </div>

      <div className="space-y-4">
        {entradas.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.titulo}</h2>
              <p className="text-gray-500 text-sm mt-1">{item.preview}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <MdCalendarToday size={20} />
              <span className="text-sm">{item.fecha}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
