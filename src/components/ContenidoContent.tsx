import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { useMemo, useState } from "react";
import { SearchBard } from "./ui/SearchBard";
import { COLORS } from "../constants/colors";
import { ContenidoHeader } from "./contenido/ContenidoHeader";
import { ArticuloCard } from "./contenido/ArticuloCard";

type Categoria = "Todos" | "Ansiedad" | "Estrés" | "Sueño" | "Relaciones" | "Autocuidado";

type Articulo = {
  id: string;
  categoria: Categoria;
  duracion: string;
  titulo: string;
  descripcion: string;
  imgSrc: string;
}

const Articulos: Articulo[] = [
  {
    id: "articulo-1",
    categoria: "Ansiedad",
    duracion: "8 min",
    titulo: "Comprendiendo la Ansiedad: Una Guía Completa",
    descripcion: "Aprende qué es la ansiedad, sus síntomas y estrategias efectivas para manejarla en tu vida diaria.",
    imgSrc: "https://i.ibb.co/pvrhh2G8/f9573a86d50588bcb22b3222ac945b4a6e370c63.jpg",
  },
  {
    id: "articulo-2",
    categoria: "Estrés",
    duracion: "6 min",
    titulo: "Técnicas de Relajación para el Día a Día",
    descripcion: "Descubre técnicas simples que puedes usar en cualquier momento para reducir el estrés.",
    imgSrc: "https://i.ibb.co/TMSDPBRc/18be99baa82e7eb85e82d63513ea1126c582112c.jpg",
  },
  {
    id: "articulo-3",
    categoria: "Sueño",
    duracion: "10 min",
    titulo: "La Importancia del Sueño para tu Bienestar",
    descripcion: "Explora cómo el sueño afecta tu salud y aprende a mejorar tu higiene del sueño.",
    imgSrc: "https://i.ibb.co/VK6KVQW/fd37b48ef6eef5beee40a39db8171b467abb406f.jpg",
  },
  {
    id: "articulo-4",
    categoria: "Relaciones",
    duracion: "7 min",
    titulo: "Construyendo Relaciones Saludables",
    descripcion: "Consejos prácticos para cultivar conexiones significativas y mantener límites saludables.",
    imgSrc: "https://i.ibb.co/gLbhMVDX/1ff8ee7d96205008412d947f63f16f9123831a3e.jpg",
  },
];

export const ContenidoContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const categorias: Categoria[] = ["Todos", "Ansiedad", "Estrés", "Sueño", "Relaciones", "Autocuidado"];

  const articulosFiltered: Articulo[] = useMemo(() => {
    const articulosPorCategoria = categoriaActiva === "Todos"
      ? Articulos
      : Articulos.filter(articulo => articulo.categoria === categoriaActiva);

    return articulosPorCategoria.filter((entrada) =>
      entrada.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, categoriaActiva]);

  return (
    <div
      className="p-6 min-h-screen"
      style={{ backgroundColor: COLORS.claro }}
    >
      <ContenidoHeader />
      <SearchBard value={searchTerm} onChange={setSearchTerm} placeholder={"Buscar artículos..."} />

      <CategoriasContent>
        {categorias.map(categoria =>
          <CategoriaItem key={categoria} categoria={categoria} isActiva={categoria === categoriaActiva} onClick={() => setCategoriaActiva(categoria)} />
        )}
      </CategoriasContent>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articulosFiltered.map(articulo =>
          <ArticuloCard key={articulo.id} {...articulo} />
        )}
      </div>
    </div >
  );
};

