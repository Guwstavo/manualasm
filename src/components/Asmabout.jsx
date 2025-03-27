import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion"; 
import "../styles/asmabout.css";


const FEATURES = [
  "Libre y de código abierto.",
  "Soporta múltiples formatos de salida, como ELF (Linux), COFF, Mach-O, bin, etc.",
  "Permite el uso de macros y directivas de ensamblador.",
  "Compatible con 16, 32 y 64 bits.",
  "Amplia documentación y comunidad activa.",
  "Lenguaje de bajo nivel",
  "Directamente relacionado con el CPU",
  "Alta velocidad y control total",

];

const COMMON_USES = [
  "Aprendizaje del funcionamiento interno del computador",
  "Optimización extrema de software",
  "Desarrollo de sistemas embebidos o sistemas operativos",
  "Creación de programas de alto rendimiento",
  "Desarrollo de controladores de dispositivos",
  "Integración con C/C++",
  "Creación de malware y virus informáticos",
  "Creación de software de bajo nivel",
  
];

// Variantes para las animaciones
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2, // Retraso entre hijos
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Asmabout = () => {
  // Referencias para detectar el scroll
  const gridRef = React.useRef(null);
 // const badgeRef = React.useRef(null);

  // Detectamos si los elementos están en la vista
  const isGridInView = useInView(gridRef, { once: true, margin: "-50px" });
 // const isBadgeInView = useInView(badgeRef, { once: true, margin: "-50px" }); 

  return (
    <motion.section
      className="nasm-container"
      aria-label="Información sobre NASM"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header variants={childVariants}>
        <h1 className="nasm-title">¿Qué es NASM (x86)?</h1>
      </motion.header>

      <motion.article
        className="nasm-section nasm-card"
        variants={childVariants}
      >
        <p>
          NASM (Netwide Assembler) es un ensamblador para la arquitectura x86
          que permite escribir programas de bajo nivel directamente con
          instrucciones del procesador. Es ampliamente usado para aprender cómo
          funciona el hardware, optimizar código o crear sistemas operativos
          pequeños.
        </p>
      </motion.article>

      <motion.div
        className="nasm-section nasm-grid"
        ref={gridRef}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.article className="nasm-card" variants={childVariants}>
          <h2>Características</h2>
          <ul className="nasm-list" role="list">
            {FEATURES.map((feature, index) => (
              <motion.li key={`feature-${index}`} variants={childVariants}>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.article>

        <motion.article className="nasm-card" variants={childVariants}>
          <h2>Usos Comunes</h2>
          <ul className="nasm-list" role="list">
            {COMMON_USES.map((use, index) => (
              <motion.li key={`use-${index}`} variants={childVariants}>
                {use}
              </motion.li>
            ))}
          </ul>
        </motion.article>
      </motion.div>
    </motion.section>
  );
};

export default Asmabout;