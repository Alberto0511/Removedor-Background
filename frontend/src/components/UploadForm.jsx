import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Trash, X, Loader } from "lucide-react";

const loaderAnimation = {
  animate: { rotate: 360 },
  transition: { repeat: Infinity, duration: 1 },
};

const UploadForm = ({ onProcessComplete }) => {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleRemoveBackground = async () => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", image);

      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/remove-bg`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const processedURL = URL.createObjectURL(blob);
        onProcessComplete(processedURL);
      } else {
        console.error("Error al procesar la imagen:", await response.text());
      }
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Subir Imagen
      </h1>
      {!image ? (
        <div
          className="relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-100 hover:border-purple-700 transition"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={handleFileInput}
          />
          <Upload className="mx-auto text-gray-600 mb-2 hover:text-purple-700 transition" size={32} />
          <p className="text-gray-600 hover:text-purple-700 transition">
            Haz clic aquí o arrastra tu imagen
          </p>
        </div>
      ) : (
        <div className="relative">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>
      )}
      <button
        onClick={handleRemoveBackground}
        disabled={isProcessing || !image}
        className="mt-6 w-full bg-purple-700 hover:bg-purple-900 text-white py-2 rounded-lg flex items-center justify-center disabled:bg-gray-300"
      >
        {isProcessing ? (
          <motion.div
            {...loaderAnimation}
            className="flex items-center justify-center"
          >
            <Loader size={24} className="text-black" />
          </motion.div>
        ) : (
          <>
            <Trash className="mr-2" size={20} /> Quitar Fondo
          </>
        )}
      </button>
    </>
  );
};

export default UploadForm;
