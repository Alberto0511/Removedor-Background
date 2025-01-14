import React from "react";

const Footer = () => {
  return (
    <footer className="mt-8 text-center text-gray-600 text-sm">
      <p className="mb-2">
        © {new Date().getFullYear()} <span className="font-bold">Proyecto</span>. Creado por Betopy.
      </p>
      <div className="flex justify-center space-x-4">
        <a
          href="https://www.remove.bg/es/api"
          className="hover:text-purple-500 transition-colors duration-200"
        >
          Usando remove.bg API
        </a>
        <span>|</span>
        <a
          href="https://github.com/Alberto0511/Remove-Bg"
          className="hover:text-purple-500 transition-colors duration-200"
        >
          Ir al codigo
        </a>
      </div>
    </footer>
  );
};

export default Footer;
