import logo from '../assets/logo.svg';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5cf] p-4">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-7" >
          <img
            src={logo}
          />
          <h1 className="text-3xl font-bold text-green-700">MenteAbierta</h1>
        </div>
        <p className="text-gray-700 mt-1">Bienvenido de vuelta</p>
      </div>

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md">
        <button className="w-full border rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition mb-6">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Registrarse con Google
        </button>

        <div className="text-center text-gray-500 text-sm mb-6">O regístrate con tu correo</div>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 text-sm">Correo electrónico *</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="mt-1 w-full border rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Alias (opcional)</label>
            <input
              type="text"
              placeholder="¿Cómo te gustaría que te llamemos?"
              className="mt-1 w-full border rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Contraseña *</label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              className="mt-1 w-full border rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Confirmar contraseña *</label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className="mt-1 w-full border rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex items-center gap-2 text-sm mt-2">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-gray-600">
              Acepto los
              <a href="#" className="text-purple-600 ml-1 underline">
                Términos y Condiciones
              </a>
              y la
              <a href="#" className="text-purple-600 ml-1 underline">
                Política de Privacidad
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 transition text-white py-3 rounded-xl font-semibold mt-2"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          ¿Ya tienes cuenta?
          <a href="#" className="text-purple-600 font-semibold hover:underline ml-1">
            Inicia sesión
          </a>
        </p>

        <p className="text-[10px] text-gray-400 text-center mt-6">
          Tus datos están protegidos y encriptados. Respetamos tu privacidad.
        </p>
      </div>
    </div>
  );
}