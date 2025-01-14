import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UploadForm from "./components/UploadForm";
import ResultForm from "./components/ResultForm";
import Footer from "./components/Footer";
import Typewriter from "./components/Typewriter";
import "@fontsource-variable/jetbrains-mono";

const App = () => {
  const [stage, setStage] = useState("upload");
  const [processedImage, setProcessedImage] = useState(null);

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative font-jetbrains min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <Typewriter phrases={["Bienvenido", "Al Removedor de Fondos"]} />

      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {stage === "upload" && (
            <motion.div
              key="upload"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <UploadForm
                onProcessComplete={(imageURL) => {
                  setProcessedImage(imageURL);
                  setStage("result");
                }}
              />
            </motion.div>
          )}
          {stage === "result" && (
            <motion.div
              key="result"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ResultForm
                image={processedImage}
                onReset={() => {
                  setStage("upload");
                  setProcessedImage(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Footer />
    </div>
  );
};

export default App;
