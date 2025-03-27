import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import "../styles/asmsetup.css";

// Instrucciones de instalación
const WINDOWS_INSTALL = [
  "Descarga el instalador desde la página oficial de NASM (nasm.us).",
  "Ejecuta el instalador y sigue las instrucciones, asegurándote de añadir NASM al PATH.",
  "Verifica la instalación ejecutando el siguiente comando en CMD o PowerShell:",
  "nasm -v",
];

const LINUX_INSTALL = [
  "Abre una terminal y actualiza los paquetes:",
  "sudo apt update",
  "Instala NASM con el administrador de paquetes:",
  "sudo apt install nasm",
  "Verifica la instalación ejecutando:",
  "nasm -v",
];

const MACOS_INSTALL = [
  "Instala Homebrew si no lo tienes:",
  '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
  "Instala NASM con Homebrew:",
  "brew install nasm",
  "Verifica la instalación ejecutando:",
  "nasm -v",
];

// Instrucciones de compilación y ejecución
const LINUX_EXECUTION = [
  "Escribe tu programa en un archivo con extensión `.asm`, por ejemplo, `hello.asm`.",
  "Compila el programa con NASM:",
  "nasm -f elf64 hello.asm -o hello.o",
  "Enlaza el objeto con `ld`:",
  "ld hello.o -o hello",
  "Dale permisos de ejecución:",
  "chmod +x hello",
  "Ejecuta el programa:",
  "./hello",
];

const WINDOWS_EXECUTION = [
  "Escribe tu programa en un archivo con extensión `.asm`, por ejemplo, `hello.asm`.",
  "Compila el programa con NASM:",
  "nasm -f win64 hello.asm -o hello.obj",
  "Enlaza el objeto con `gcc` (requiere MinGW):",
  "gcc hello.obj -o hello.exe",
  "Ejecuta el programa:",
  "hello.exe",
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

const NasmSetup = () => {
  const installRef = React.useRef(null);
  const execRef = React.useRef(null);

  const isInstallInView = useInView(installRef, { once: true, margin: "-50px" }); // eslint-disable-next-line react-hooks/exhaustive-deps
  const isExecInView = useInView(execRef, { once: true, margin: "-50px" }); // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <motion.section
      className="setup-container"
      aria-label="Instrucciones de instalación y ejecución de NASM"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.header variants={childVariants}>
        <h1 className="setup-title">Instalación y Ejecución de NASM</h1>
      </motion.header>

      {/* Sección de Instalación */}
      <motion.div
        className="setup-section setup-grid"
        ref={installRef}
        initial="hidden"
        animate={isInstallInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.article className="setup-card" variants={childVariants}>
          <h2>Instalación en Windows</h2>
          <ul className="setup-list" role="list">
            {WINDOWS_INSTALL.map((step, index) => (
              <motion.li key={`win-install-${index}`} variants={childVariants}>
                {step.startsWith("nasm") ? (
                  <span className="terminal-command">{step}</span>
                ) : (
                  step
                )}
              </motion.li>
            ))}
          </ul>
        </motion.article>

        <motion.article className="setup-card" variants={childVariants}>
          <h2>Instalación en Linux (Ubuntu/Debian)</h2>
          <ul className="setup-list" role="list">
            {LINUX_INSTALL.map((step, index) => (
              <motion.li key={`linux-install-${index}`} variants={childVariants}>
                {step.startsWith("sudo") || step.startsWith("nasm") ? (
                  <span className="terminal-command">{step}</span>
                ) : (
                  step
                )}
              </motion.li>
            ))}
          </ul>
        </motion.article>

        <motion.article className="setup-card" variants={childVariants}>
          <h2>Instalación en macOS</h2>
          <ul className="setup-list" role="list">
            {MACOS_INSTALL.map((step, index) => (
              <motion.li key={`macos-install-${index}`} variants={childVariants}>
                {step.startsWith("/bin/bash") || step.startsWith("brew") || step.startsWith("nasm") ? (
                  <span className="terminal-command">{step}</span>
                ) : (
                  step
                )}
              </motion.li>
            ))}
          </ul>
        </motion.article>
      </motion.div>

      {/* Sección de Compilación y Ejecución */}
      <motion.div
        className="setup-section setup-grid"
        ref={execRef}
        initial="hidden"
        animate={isExecInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.article className="setup-card" variants={childVariants}>
          <h2>Compilar y Ejecutar en Linux</h2>
          <ul className="setup-list" role="list">
            {LINUX_EXECUTION.map((step, index) => (
              <motion.li key={`linux-exec-${index}`} variants={childVariants}>
                {step.startsWith("nasm") || step.startsWith("ld") || step.startsWith("chmod") || step.startsWith("./") ? (
                  <span className="terminal-command">{step}</span>
                ) : (
                  step
                )}
              </motion.li>
            ))}
          </ul>
        </motion.article>

        <motion.article className="setup-card" variants={childVariants}>
          <h2>Compilar y Ejecutar en Windows</h2>
          <ul className="setup-list" role="list">
            {WINDOWS_EXECUTION.map((step, index) => (
              <motion.li key={`win-exec-${index}`} variants={childVariants}>
                {step.startsWith("nasm") || step.startsWith("gcc") || step.startsWith("hello.exe") ? (
                  <span className="terminal-command">{step}</span>
                ) : (
                  step
                )}
              </motion.li>
            ))}
          </ul>
        </motion.article>
      </motion.div>
    </motion.section>
  );
};

export default NasmSetup;