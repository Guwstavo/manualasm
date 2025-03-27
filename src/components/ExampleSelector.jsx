import React, { useRef } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion"; 
import codes from "../data/Codes";
import "../styles/examples.css";

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

function ExampleSelector() {
  const selectorRef = useRef(null);
  const isSelectorInView = useInView(selectorRef, { once: true, margin: "-50px" });

  return (
    <motion.section
      className="example-selector"
      ref={selectorRef}
      initial="hidden"
      animate={isSelectorInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h1 className="examples-title" variants={childVariants}>
        Ejemplos de Código en Ensamblador
      </motion.h1>
      <motion.div className="examples-list" variants={containerVariants}>
        {codes.map((code) => (
          <motion.div key={code.name} variants={childVariants}>
            <Link
              to={`/examples/${code.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="example-link"
            >
              <div className="example-item">
                <h2>{code.name}</h2>
                <p>{code.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default ExampleSelector;