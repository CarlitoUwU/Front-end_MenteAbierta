export const NotificacionesPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notificaciones</h2>
      <div className="space-y-4">
        {children}
      </div>
    </>
  );
}