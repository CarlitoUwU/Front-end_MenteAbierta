import { useState } from "react";
import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { TipsContenedor } from "./tips/TipsContenedor";
import { TipsMainCard } from "./tips/TipsMainCard";
import { TipsCard } from "./tips/TipsCard";

type Categoria = "Todos" | "Diario" | "Estrés" | "Sueño" | "Bienestar";

interface Tip {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: Categoria;
}

export const TipsContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todos");
  const [tipActualIndex, setTipActualIndex] = useState(0);
  const categorias: Categoria[] = ["Todos", "Diario", "Estrés", "Sueño", "Bienestar"];
  const tips: Tip[] = [
    {
      id: "gratitud-matutina",
      titulo: "Práctica de gratitud matutina",
      descripcion: "Comienza tu día escribiendo tres cosas por las que estás agradecido. Esta práctica simple puede mejorar significativamente tu estado de ánimo.",
      categoria: "Diario",
    },
    {
      id: "cinco-sentidos",
      titulo: "Técnica de los 5 sentidos",
      descripcion: "Cuando te sientas abrumado, identifica: 5 cosas que ves, 4 que tocas, 3 que escuchas, 2 que hueles y 1 que saboreas. Te ayudará a volver al presente.",
      categoria: "Estrés",
    },
    {
      id: "rutina-desconexion",
      titulo: "Rutina de desconexión",
      descripcion: "Apaga las pantallas 1 hora antes de dormir. La luz azul puede interferir con tu ciclo de sueño natural y afectar la calidad de tu descanso.",
      categoria: "Sueño",
    },
    {
      id: "respiracion-consciente",
      titulo: "Respiración consciente",
      descripcion: "Dedica 5 minutos cada mañana a respirar profundamente. Esto oxigena tu cerebro y te prepara para enfrentar el día con más calma.",
      categoria: "Bienestar",
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

      <CategoriasContent>
        {categorias.map(categoria =>
          <CategoriaItem key={categoria} categoria={categoria} isActiva={categoria === categoriaActiva} onClick={() => setCategoriaActiva(categoria)} />
        )}
      </CategoriasContent>

      <TipsContenedor>
        <TipsMainCard
          titulo={tipActual.titulo}
          descripcion={tipActual.descripcion}
          index={tipActualIndex + 1}
          total={tipsFiltrados.length}
          onClick={siguienteTip}
        />

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tipsFiltrados.map((tip, index) =>
            <TipsCard key={tip.id} {...tip} isActive={tip.id === tipActual.id} onClick={() => setTipActualIndex(index)} />
          )}
        </div>
      </TipsContenedor>
    </div>
  );
}