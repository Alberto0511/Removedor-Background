import express from 'express';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';  

dotenv.config();

const { REMOVE_BG_API_KEY, REMOVE_BG_API_URL, PORT = 3000 } = process.env;
if (!REMOVE_BG_API_KEY || !REMOVE_BG_API_URL) {
  console.error("Error: Faltan variables de entorno necesarias.");
  process.exit(1);
}

const app = express();
const upload = multer();

app.use(
  cors({
    origin: [
      "http://localhost:5173", 
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((err, req, res, next) => {
  console.error("Error no controlado:", err);
  res.status(500).json({ detail: "Error interno del servidor." });
});

app.post("/remove-bg", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ detail: "No se ha subido ningún archivo." });
    }
  
    const type = await fileTypeFromBuffer(req.file.buffer);  
    if (!type || (type.mime !== "image/png" && type.mime !== "image/jpeg")) {
      return res.status(400).json({
        detail: "Formato de archivo no soportado. Solo se aceptan PNG y JPEG.",
      });
    }

    const formData = new FormData();
    formData.append("image_file", req.file.buffer, req.file.originalname);

    const headers = {
      ...formData.getHeaders(),
      "X-Api-Key": REMOVE_BG_API_KEY,
    };

    const response = await axios.post(REMOVE_BG_API_URL, formData, {
      headers,
      responseType: "arraybuffer",
    });

    if (response.status === 200) {
      res.setHeader(
        "Content-Disposition",
        `inline; filename=processed_${req.file.originalname}`
      );
      res.setHeader("Content-Type", "image/png");
      res.send(response.data);
    } else {
      console.error("Error en la API:", response.data);
      res.status(response.status).json({
        detail: `Error al remover el fondo: ${response.data}`,
      });
    }
  } catch (error) {
    console.error("Error interno del servidor:", error);
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ detail: "Ruta no encontrada." });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
