type NotificacionItemProps = {
  color: string;
  text: string;
  time: string;
}

export const NotificacionItem = ({ color, text, time }: NotificacionItemProps) => {
  return (
    <div className="flex gap-3">
      {/* Barra de color */}
      <div className={`w-1 ${color} rounded-full shrink-0`}></div>

      {/* Contenido */}
      <div className="flex-1">
        <p className="text-sm text-gray-800 font-medium leading-snug mb-1">
          {text}
        </p>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
    </div>
  );
}