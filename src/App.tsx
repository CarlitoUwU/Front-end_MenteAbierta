import { Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RoutesEnum } from "./utils/routes";
import { COLORS } from "./constants/colors";

function App() {
  return (
    <div style={{ backgroundColor: COLORS.azul_claro, minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={<Navigate to={RoutesEnum.LOGIN} />} />
        <Route path={RoutesEnum.REGISTER} element={<RegisterPage />} />
        <Route path={RoutesEnum.LOGIN} element={<LoginPage />} />
        <Route path={RoutesEnum.DASHBOARD} element={<DashboardPage />} />

        {/* Ruta 404 */}
        <Route path="*" element={<h1>Página no encontrada</h1>} />
      </Routes>
    </div>
  );
}

export default App;
