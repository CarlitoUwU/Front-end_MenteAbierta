export type DashboardContentProps = {
  toSecction: (section: Sections) => void;
};

export type Sections = "Inicio" | "Registrar Emoción" | "Cuestionarios" | "Diario" | "Ejercicios" | "Contenido" | "Tips" | "Foro" | "Perfil";
