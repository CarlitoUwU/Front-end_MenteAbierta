import { useState, useEffect } from "react";
import {
  MdPerson,
  MdEmail,
  MdCalendarToday,
  MdNotifications,
  MdLock,
  MdChevronRight,
  MdExitToApp,
} from "react-icons/md";
import type { DashboardContentProps } from "../@types/dashboard";
import { authService } from "../services/auth.service";
import type { Usuario } from "../types";

export const PerfilContent = (_props: DashboardContentProps) => {
  const [notificacionesEmail, setNotificacionesEmail] = useState(false);
  const [notificacionesPush, setNotificacionesPush] = useState(false);
  const [resumenSemanal, setResumenSemanal] = useState(true);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        console.log("🔍 Intentando cargar perfil...");
        const perfil = await authService.getProfile();
        console.log("✅ Perfil recibido:", perfil);
        setUsuario(perfil);
      } catch (error: any) {
        console.error("❌ Error al cargar perfil:", error);
        console.error("❌ Detalles del error:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  const handleCerrarSesion = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      authService.logout();
    }
  };

  // Obtener iniciales del usuario para el avatar
  const getIniciales = () => {
    if (usuario?.seudonimo) {
      return usuario.seudonimo.charAt(0).toUpperCase();
    }
    if (usuario?.email) {
      return usuario.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Formatear fecha de registro
  const getFechaRegistro = () => {
    if (!usuario?.date_joined) return "Fecha no disponible";
    
    const fecha = new Date(usuario.date_joined);
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    
    return `Miembro desde ${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Mi Perfil</h1>
      </div>

      {/* Sección 1: Tarjeta de Perfil */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna izquierda: Avatar y stats */}
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-5xl font-bold text-white">{getIniciales()}</span>
            </div>

            {/* Nombre y membresía */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {usuario?.seudonimo || usuario?.email?.split('@')[0] || 'Usuario'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{getFechaRegistro()}</p>
            </div>

            {/* Estadísticas */}
            <div className="w-full pt-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-xs text-purple-700 text-center">
                  📈 Las estadísticas se cargarán automáticamente<br/>cuando completes ejercicios y registres emociones
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha: Información Personal */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Información Personal</h3>

            {/* Formulario */}
            <div className="space-y-4">
              {/* Nombre de usuario */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de usuario / Seudónimo
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <MdPerson className="text-xl text-gray-500" />
                  <input
                    type="text"
                    value={usuario?.seudonimo || 'Sin seudónimo'}
                    readOnly
                    className="flex-1 bg-transparent outline-none text-gray-800"
                  />
                </div>
              </div>

              {/* Correo electrónico */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <MdEmail className="text-xl text-gray-500" />
                  <input
                    type="email"
                    value={usuario?.email || ''}
                    readOnly
                    className="flex-1 bg-transparent outline-none text-gray-800"
                  />
                </div>
              </div>

              {/* Estado de cuenta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de la cuenta
                </label>
                <div className="flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <MdCalendarToday className="text-xl text-gray-500" />
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">
                      {usuario?.is_active ? '✅ Cuenta activa' : '❌ Cuenta inactiva'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Registrado: {new Date(usuario?.date_joined || '').toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota informativa */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>🔒 Privacidad:</strong> Solo almacenamos tu correo y seudónimo para garantizar tu privacidad.
              </p>
            </div>

            {/* Botón guardar (deshabilitado porque los campos son readonly) */}
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 font-semibold py-3 px-6 rounded-lg mt-6 cursor-not-allowed"
            >
              Los datos de perfil no son editables
            </button>
          </div>
        </div>
      </div>

      {/* Grid de 2 columnas para Notificaciones y Seguridad */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sección 2: Notificaciones */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <MdNotifications className="text-3xl text-gray-700" />
            <h3 className="text-2xl font-bold text-gray-800">Notificaciones</h3>
          </div>

          <div className="space-y-6">
            {/* Notificaciones por correo */}
            <div className="flex items-start justify-between pb-6 border-b border-gray-200">
              <div className="flex-1 pr-4">
                <h4 className="font-semibold text-gray-800 mb-1">Notificaciones por correo</h4>
                <p className="text-sm text-gray-500">Recibe actualizaciones en tu email</p>
              </div>
              <button
                onClick={() => setNotificacionesEmail(!notificacionesEmail)}
                className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${
                  notificacionesEmail ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    notificacionesEmail ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Notificaciones push */}
            <div className="flex items-start justify-between pb-6 border-b border-gray-200">
              <div className="flex-1 pr-4">
                <h4 className="font-semibold text-gray-800 mb-1">Notificaciones push</h4>
                <p className="text-sm text-gray-500">Alertas en tiempo real</p>
              </div>
              <button
                onClick={() => setNotificacionesPush(!notificacionesPush)}
                className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${
                  notificacionesPush ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    notificacionesPush ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Resumen semanal */}
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className="font-semibold text-gray-800 mb-1">Resumen semanal</h4>
                <p className="text-sm text-gray-500">Estadísticas de tu progreso</p>
              </div>
              <button
                onClick={() => setResumenSemanal(!resumenSemanal)}
                className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${
                  resumenSemanal ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    resumenSemanal ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Sección 3: Seguridad y Privacidad */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <MdLock className="text-3xl text-gray-700" />
            <h3 className="text-2xl font-bold text-gray-800">Seguridad y Privacidad</h3>
          </div>

          <div className="space-y-4">
            {/* Cambiar contraseña */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group">
              <span className="font-medium text-gray-800">Cambiar contraseña</span>
              <MdChevronRight className="text-2xl text-purple-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Exportar datos */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group">
              <span className="font-medium text-gray-800">Exportar mis datos</span>
              <MdChevronRight className="text-2xl text-purple-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Eliminar cuenta */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-lg transition-colors group">
              <span className="font-medium text-red-600">Eliminar cuenta</span>
              <MdChevronRight className="text-2xl text-red-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer: Cerrar sesión */}
      <div className="pt-4">
        <button
          onClick={handleCerrarSesion}
          className="flex items-center gap-3 px-6 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <MdExitToApp className="text-2xl" />
          <span className="font-semibold">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
