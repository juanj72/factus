export const Home = () => {
  return (
    <section className="bg-white py-12 px-4 ">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Imagen */}
        <img
          src="https://avatars.githubusercontent.com/u/69679681?v=4"
          alt="Foto de perfil"
          className="w-100 h-100 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />

        {/* Info */}
        <div className="text-center md:text-left space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">Juan José Jara</h1>
          <p className="text-gray-600 max-w-md">
            Desarrollador de software apasionado por construir soluciones
            reales. Me especializo en Python, Django, React y APIs REST. Siempre
            aprendiendo, siempre creando.
          </p>

          <a
            href="https://github.com/TU_USUARIO"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Visitar GitHub
          </a>
        </div>
      </div>
    </section>
  );
};
