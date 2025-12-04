export const TendenciaEmocionalPanel = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tendencia Emocional</h2>

      <div className="flex gap-4">
        {/* Eje Y */}
        <div className="flex flex-col justify-between py-6 pr-2">
          <span className="text-sm font-medium text-gray-600">Alto</span>
          <span className="text-sm font-medium text-gray-600">Bajo</span>
        </div>

        {/* Gráfico de barras */}
        <div className="flex-1 flex items-end justify-between gap-3 border-l-2 border-b-2 border-gray-300 pl-4 pb-2">
          {children}
        </div>
      </div>
    </>
  );
};