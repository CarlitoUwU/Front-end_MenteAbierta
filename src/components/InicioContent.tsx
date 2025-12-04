import { MdLibraryBooks, MdSelfImprovement, MdForum } from "react-icons/md";
import { TipDia } from "./dashboard/inicio/TipDia";
import type { DashboardContentProps } from "../@types/dashboard";
import { ButtonCard } from "./dashboard/inicio/ButtonCard";
import { TendenciaEmocionalPanel } from "./dashboard/inicio/TendenciaEmocionalPanel";
import { ColumnItem } from "./dashboard/inicio/ColumnItem";
import { NotificacionesPanel } from "./dashboard/inicio/NotificacionesPanel";
import { NotificacionItem } from "./dashboard/inicio/NotificacionItem";
import { COLORS } from "../constants/colors";

export const InicioContent = ({ toSecction }: DashboardContentProps) => {

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
        <h1 style={{ color: COLORS.texto_oscuro }} className="text-4xl font-bold">
          Hola, user123
        </h1>
      </div>

      {/* Fila 2: Tip del día */}
      <TipDia />

      {/* Fila 3: Navegación horizontal */}
      <div className="grid grid-cols-3 gap-6">
        {/* Diario */}
        <ButtonCard onClick={() => toSecction("Diario")}>
          <div className="flex flex-col items-center gap-3">
            <MdLibraryBooks className="text-5xl" style={{ color: COLORS.azul }} />
            <span style={{ color: COLORS.texto_medio }} className="text-lg font-semibold">
              Diario
            </span>
          </div>
        </ButtonCard>

        {/* Ejercicios */}
        <ButtonCard onClick={() => toSecction("Ejercicios")}>
          <div className="flex flex-col items-center gap-3">
            <MdSelfImprovement className="text-5xl" style={{ color: COLORS.azul }} />
            <span style={{ color: COLORS.texto_medio }} className="text-lg font-semibold">
              Ejercicios
            </span>
          </div>
        </ButtonCard>

        {/* Foro */}
        <ButtonCard onClick={() => toSecction("Foro")}>
          <div className="flex flex-col items-center gap-3">
            <MdForum className="text-5xl" style={{ color: COLORS.azul }} />
            <span style={{ color: COLORS.texto_medio }} className="text-lg font-semibold">
              Foro
            </span>
          </div>
        </ButtonCard>
      </div>

      {/* Fila 4: Contenido principal (dos columnas) */}
      <div className="grid grid-cols-3 gap-6">
        {/* Columna izquierda: Gráfico (2/3 del ancho) */}
        <div style={{ backgroundColor: COLORS.claro }} className="col-span-2 rounded-lg shadow-md p-6">
          <TendenciaEmocionalPanel>
            {emotionalData.map((data, index) => (
              <ColumnItem {...data} key={index} />
            ))}
          </TendenciaEmocionalPanel>
        </div>

        {/* Columna derecha: Notificaciones (1/3 del ancho) */}
        <div style={{ backgroundColor: COLORS.claro }} className="col-span-1 rounded-lg shadow-md p-6">
          <NotificacionesPanel>
            {notifications.map((notification, index) => (
              <NotificacionItem {...notification} key={index} />
            ))}
          </NotificacionesPanel>
        </div>
      </div>
    </div>
  );
};