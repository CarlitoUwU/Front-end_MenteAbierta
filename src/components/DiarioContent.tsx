import { useMemo, useState } from "react";
import type { DashboardContentProps } from "../@types/dashboard";
import { DiarioItem } from "./diario/DiarioItem";
import { COLORS } from "../constants/colors";
import { DiarioModal } from "./diario/DiarioModal";
import { DiarioHeader } from "./diario/DiarioHeader";
import { DiarioSearch } from "./diario/DiarioSearch";

type EntradaDiario = {
  titulo: string;
  preview: string;
  fecha: string;
};

const entradas = [
  {
    titulo: "Reflexiones del lunes",
    preview: "Hoy fue un día productivo…",
    fecha: "2025-11-15",
  },
  {
    titulo: "Gratitud diaria",
    preview: "Estoy agradecido por…",
    fecha: "2025-11-14",
  },
  {
    titulo: "Un día difícil",
    preview: "Necesito procesar lo que pasó hoy…",
    fecha: "2025-11-13",
  },
];

export const DiarioContent = (_props: DashboardContentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const entradasFiltered: EntradaDiario[] = useMemo(() => {
    return entradas.filter((entrada) =>
      entrada.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCrearEntrada = () => {
    const newEntrada: EntradaDiario = {
      titulo: titulo,
      preview: contenido,
      fecha: new Date().toISOString().split("T")[0],
    };

    console.log("Nueva entrada creada:", newEntrada);

    setTitulo("");
    setContenido("");
    setIsModalOpen(false);
  };

  return (
    <div
      className="p-6 min-h-screen"
      style={{ backgroundColor: COLORS.claro }}
    >
      {/* Header */}
      <DiarioHeader onNewEntrada={() => setIsModalOpen(true)} />

      {/* Buscador */}
      <DiarioSearch value={searchTerm} onChange={setSearchTerm} />

      {/* Lista de entradas */}
      <div className="space-y-4">
        {entradasFiltered.map((entrada, index) => (
          <DiarioItem key={index} {...entrada} />
        ))}
      </div>

      {isModalOpen && (
        <DiarioModal
          handleCerrar={() => setIsModalOpen(false)}
          handleSubmit={handleCrearEntrada}
          value={{ titulo, contenido }}
          onChange={{ setTitulo, setContenido }}
        />
      )}
    </div>
  );
};
