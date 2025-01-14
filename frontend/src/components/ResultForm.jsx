import React from "react";
import { motion } from "framer-motion";
import { Download, RotateCw } from "lucide-react";

const ResultForm = ({ image, onReset }) => {
  return (
    <>
      <motion.h1
        className="text-2xl font-semibold text-gray-800 mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        Resultado
      </motion.h1>
      <motion.img
        src={image}
        alt="Processed"
        className="w-full h-auto rounded-lg mb-4 shadow-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
      />
      <a
        href={image}
        download="processed-image.png"
        className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md text-center hover:bg-green-600 transition flex items-center justify-center"
      >
        <Download className="mr-2" size={20} /> Descargar Imagen
      </a>
      <button
        onClick={onReset}
        className="mt-4 w-full bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 transition flex items-center justify-center"
      >
        <RotateCw className="mr-2" size={20} /> Subir Otra Imagen
      </button>
    </>
  );
};

export default ResultForm;
