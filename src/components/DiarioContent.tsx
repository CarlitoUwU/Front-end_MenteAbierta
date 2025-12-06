import { useMemo, useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { DashboardContentProps } from "../@types/dashboard";
import { DiarioItem } from "./diario/DiarioItem";
import { COLORS } from "../constants/colors";
import { DiarioModal } from "./diario/DiarioModal";
import { DiarioHeader } from "./diario/DiarioHeader";
import { SearchBard } from "./ui/SearchBard";
import { diarioService } from "../services/diario.service";
import type { DiarioEntry, HumorLevel } from "../types";

export const DiarioContent = (_props: DashboardContentProps) => {
  const [entradas, setEntradas] = useState<DiarioEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [humor, setHumor] = useState<HumorLevel>(3);
  const [searchTerm, setSearchTerm] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Cargar entradas del backend
  useEffect(() => {
    cargarEntradas();
  }, []);

  const cargarEntradas = async () => {
    try {
      const data = await diarioService.getAll();
      console.log("📚 Entradas cargadas del backend:", data);
      setEntradas(data);
    } catch (error) {
      console.error("Error al cargar entradas:", error);
      toast.error("Error al cargar las entradas del diario");
    } finally {
      setLoading(false);
    }
  };

  const entradasFiltered = useMemo(() => {
    if (!entradas) return [];
    return entradas.filter((entrada) =>
      (entrada.titulo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (entrada.contenido?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, entradas]);

  const handleCrearEntrada = async () => {
    if (!titulo.trim() || !contenido.trim()) {
      toast.error("El título y contenido son obligatorios");
      return;
    }

    setGuardando(true);
    try {
      if (editandoId) {
        // Actualizar entrada existente
        await diarioService.update(editandoId, { titulo, contenido, humor });
        toast.success("Entrada actualizada exitosamente");
      } else {
        // Crear nueva entrada
        await diarioService.create({ titulo, contenido, humor });
        toast.success("Entrada creada exitosamente");
      }

      // Recargar entradas
      await cargarEntradas();

      // Resetear formulario
      setTitulo("");
      setContenido("");
      setHumor(3);
      setEditandoId(null);
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Error al guardar entrada:", error);
      toast.error(error.response?.data?.detail || "Error al guardar la entrada");
    } finally {
      setGuardando(false);
    }
  };

  const handleEditarEntrada = (entrada: DiarioEntry) => {
    setEditandoId(entrada.id!);
    setTitulo(entrada.titulo);
    setContenido(entrada.contenido);
    setHumor(entrada.humor);
    setIsModalOpen(true);
  };

  const handleEliminarEntrada = async (id: string) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-semibold">¿Estás seguro de eliminar esta entrada?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await diarioService.delete(id);
                toast.success("Entrada eliminada");
                await cargarEntradas();
              } catch (error) {
                console.error("Error al eliminar:", error);
                toast.error("Error al eliminar la entrada");
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
          >
            Sí, eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
          >
            Cancelar
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
    });
  };

  const handleNuevaEntrada = () => {
    setEditandoId(null);
    setTitulo("");
    setContenido("");
    setHumor(3);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando entradas...</p>
      </div>
    );
  }

  return (
    <div
      className="p-6 min-h-screen"
      style={{ backgroundColor: COLORS.claro }}
    >
      {/* Header */}
      <DiarioHeader onNewEntrada={handleNuevaEntrada} />

      {/* Buscador */}
      <SearchBard value={searchTerm} onChange={setSearchTerm} placeholder="Buscar en el diario..." />

      {/* Lista de entradas */}
      {entradasFiltered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? "No se encontraron entradas" : "No tienes entradas aún. ¡Crea tu primera entrada!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {entradasFiltered.map((entrada) => (
            <DiarioItem
              key={entrada.id}
              titulo={entrada.titulo}
              preview={entrada.contenido.substring(0, 100) + (entrada.contenido.length > 100 ? '...' : '')}
              fecha={entrada.fecha_entrada || ''}
              humor={entrada.humor}
              onEdit={() => handleEditarEntrada(entrada)}
              onDelete={() => handleEliminarEntrada(entrada.id!)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <DiarioModal
          handleCerrar={() => {
            setIsModalOpen(false);
            setEditandoId(null);
            setTitulo("");
            setContenido("");
            setHumor(3);
          }}
          handleSubmit={handleCrearEntrada}
          value={{ titulo, contenido, humor }}
          onChange={{ setTitulo, setContenido, setHumor }}
          isEditing={editandoId !== null}
          isSubmitting={guardando}
        />
      )}
    </div>
  );
};
