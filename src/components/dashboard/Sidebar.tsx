import {
  MdHome, MdFavorite, MdQuiz, MdLibraryBooks,
  MdSelfImprovement, MdLightbulb, MdForum, MdPerson,
  MdContentCopy
} from "react-icons/md";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-green-800 text-white p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">MenteAbierta</h2>

      <nav className="flex flex-col gap-4">
        <a className="flex items-center gap-3 p-3 rounded-lg bg-green-600">
          <MdHome className="text-xl" />
          Inicio
        </a>
        <a className="flex items-center gap-3 p-3 hover:bg-green-700 rounded-lg">
          <MdFavorite className="text-xl" />
          Registrar Emoción
        </a>
        <a className="flex items-center gap-3 p-3 hover:bg-green-700 rounded-lg">
          <MdQuiz className="text-xl" />
          Cuestionarios
        </a>
        <a className="flex items-center gap-3 p-3 hover:bg-green-700 rounded-lg">
          <MdLibraryBooks className="text-xl" />
          Diario
        </a>
        <a className="flex items-center gap-3 p-3 hover:bg-green-700 rounded-lg">
          <MdSelfImprovement className="text-xl" />
          Ejercicios
        </a>
        <a className="flex items-center gap-3 p-3 hover:bg-green-700 rounded-lg">
          <MdContentCopy className="text-xl" />
          Contenido
        </a>
        <a className="flex items-center gap-3 p-3 hover:bg-green-700 rounded-lg">
          <MdLightbulb className="text-xl" />
          Tips
        </a>
        <a className="flex items-center gap-3 p-3 hover:bg-green-700 rounded-lg">
          <MdForum className="text-xl" />
          Foro
        </a>
        <a className="flex items-center gap-3 p-3 hover:bg-green-700 rounded-lg">
          <MdPerson className="text-xl" />
          Perfil
        </a>
      </nav>
    </aside>
  );
}
