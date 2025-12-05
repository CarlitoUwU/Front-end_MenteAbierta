import type { DashboardContentProps } from "../@types/dashboard";
import { CategoriasContent } from "./ui/CategoriasContent";
import { CategoriaItem } from "./ui/CatergoriaItem";
import { useState } from "react";
import { ForoPostItem } from "./foro/ForoPostItem";
import { ForoHeader } from "./foro/ForoHeader";

type Categoria = "Todos" | "Ansiedad" | "Bienestar" | "Relaciones" | "Estrés";

const categorias: Categoria[] = ["Todos", "Ansiedad", "Bienestar", "Relaciones", "Estrés"];

type ForoPost = {
  user: string;
  name: string;
  time: string;
  categoria: Categoria;
  title: string;
  text: string;
  likes: number;
  replies: number;
}

const foroPosts: ForoPost[] = [
  {
    user: "MG",
    name: "María G.",
    time: "Hace 2 horas",
    categoria: "Ansiedad",
    title: "¿Cómo manejan la ansiedad antes de dormir?",
    text: "Últimamente me cuesta mucho conciliar el sueño porque mi mente no deja de pensar...",
    likes: 24,
    replies: 12,
  },
  {
    user: "CR",
    name: "Carlos R.",
    time: "Hace 5 horas",
    categoria: "Bienestar",
    title: "Compartiendo mi progreso con la medicación",
    text: "Llevo 30 días seguidos meditando y quería compartir que realmente veo una diferencia...",
    likes: 45,
    replies: 8,
  },
  {
    user: "AL",
    name: "Ana L.",
    time: "Hace 1 día",
    categoria: "Relaciones",
    title: "Recursos para establecer límites saludables",
    text: "¿Alguien puede recomendar recursos para aprender a decir que no sin sentirse culpable?",
    likes: 32,
    replies: 15,
  },
]

export const ForoContent = (_props: DashboardContentProps) => {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todos");
  const foroPostsFiltered = categoriaActiva === "Todos"
    ? foroPosts
    : foroPosts.filter(post => post.categoria === categoriaActiva);

  return (
    <div className="w-full px-6 py-6">
      <ForoHeader />

      <CategoriasContent>
        {categorias.map(categoria =>
          <CategoriaItem key={categoria} categoria={categoria} isActiva={categoria === categoriaActiva} onClick={() => setCategoriaActiva(categoria)} />
        )}
      </CategoriasContent>

      <div className="w-full flex flex-col gap-5">
        {foroPostsFiltered.map((t, i) => (
          <ForoPostItem key={i} {...t} />
        ))}
      </div>
    </div>
  );
};
