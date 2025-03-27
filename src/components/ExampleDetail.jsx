import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa"; 
import CirculoLogo from "./CirculoLogo";
import FootBar from "./Footer";
import MostrarCodigo from "./MostrarCodigo";
import codes from "../data/Codes";
import "../styles/details.css";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
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

function ExampleDetail() {
  const { exampleName } = useParams();
  const code = codes.find(
    (c) => c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === exampleName
  );

  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, margin: "-50px" });

  if (!code) {
    return (
      <div>
        <CirculoLogo />
        <motion.div
          className="example-detail-content"
          ref={contentRef}
          initial="hidden"
          animate={isContentInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="back-button-container" variants={childVariants}>
            <Link to="/" className="back-button">
              <FaArrowLeft className="back-icon" />
              Volver
            </Link>
          </motion.div>
          <motion.h1 variants={childVariants}>Ejemplo no encontrado</motion.h1>
          <motion.p variants={childVariants}>
            El ejemplo que estás buscando no existe.
          </motion.p>
        </motion.div>
        <FootBar />
      </div>
    );
  }

  return (
    <div>
      <CirculoLogo />
      <motion.div
        className="example-detail-content"
        ref={contentRef}
        initial="hidden"
        animate={isContentInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="back-button-container" variants={childVariants}>
          <Link to="/" className="back-button">
            <FaArrowLeft className="back-icon" />
            Volver
          </Link>
        </motion.div>
        <motion.div variants={childVariants}>
          <MostrarCodigo
            name={code.name}
            description={code.description}
            code={code.code}
            execution={code.execution}
          />
        </motion.div>
      </motion.div>
      <FootBar />
    </div>
  );
}

export default ExampleDetail;