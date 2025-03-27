import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../styles/nasmCommands.css";

// Lista de comandos/palabras clave de NASM
const NASM_COMMANDS = [
  {
    category: "Instrucción",
    command: "MOV",
    description: "Mueve un valor de un operando a otro (registro, memoria, o inmediato).",
    example: "MOV eax, ebx ; Copia el valor de ebx a eax",
  },
  {
    category: "Instrucción",
    command: "ADD",
    description: "Suma el valor de un operando al destino y almacena el resultado.",
    example: "ADD eax, 5 ; Suma 5 a eax",
  },
  {
    category: "Instrucción",
    command: "SUB",
    description: "Resta el valor de un operando del destino y almacena el resultado.",
    example: "SUB eax, 3 ; Resta 3 a eax",
  },
  {
    category: "Interrupción",
    command: "INT 0x80",
    description: "Invoca una interrupción de software para realizar una llamada al sistema en Linux.",
    example: "INT 0x80 ; Llama al kernel (Linux) para syscalls como escribir o salir",
  },
  {
    category: "Instrucción",
    command: "PUSH",
    description: "Coloca un valor en la pila y decrementa el puntero de pila (ESP).",
    example: "PUSH eax ; Coloca el valor de eax en la pila",
  },
  {
    category: "Instrucción",
    command: "POP",
    description: "Saca un valor de la pila e incrementa el puntero de pila (ESP).",
    example: "POP ebx ; Saca un valor de la pila y lo guarda en ebx",
  },
  {
    category: "Instrucción",
    command: "CMP",
    description: "Compara dos operandos y establece flags (usado para condiciones).",
    example: "CMP eax, ebx ; Compara eax y ebx",
  },
  {
    category: "Instrucción",
    command: "JMP",
    description: "Salta a una dirección específica (salto incondicional).",
    example: "JMP label ; Salta a la etiqueta 'label'",
  },
  {
    category: "Instrucción",
    command: "JE",
    description: "Salta si los operandos son iguales (salto condicional).",
    example: "JE label ; Salta a 'label' si son iguales",
  },
  {
    category: "Instrucción",
    command: "JNE",
    description: "Salta si los operandos no son iguales (salto condicional).",
    example: "JNE label ; Salta a 'label' si no son iguales",
  },
  {
    category: "Instrucción",
    command: "CALL",
    description: "Llama a una subrutina y guarda la dirección de retorno en la pila.",
    example: "CALL subroutine ; Llama a 'subroutine'",
  },
  {
    category: "Instrucción",
    command: "RET",
    description: "Retorna de una subrutina, sacando la dirección de retorno de la pila.",
    example: "RET ; Retorna al punto de llamada",
  },
  {
    category: "Directiva",
    command: "SECTION",
    description: "Define una sección en el código (como .data o .text).",
    example: "SECTION .data ; Define la sección de datos",
  },
  {
    category: "Directiva",
    command: "DB",
    description: "Define un byte o una cadena de bytes (usado en .data).",
    example: "mensaje DB 'Hola', 0xA ; Define una cadena",
  },
  {
    category: "Directiva",
    command: "DW",
    description: "Define una palabra (2 bytes).",
    example: "valor DW 1234 ; Define una palabra con el valor 1234",
  },
  {
    category: "Directiva",
    command: "DD",
    description: "Define una doble palabra (4 bytes).",
    example: "numero DD 12345678 ; Define una doble palabra",
  },
  {
    category: "Directiva",
    command: "EQU",
    description: "Define una constante simbólica.",
    example: "len EQU $ - mensaje ; Calcula la longitud de 'mensaje'",
  },
  {
    category: "Directiva",
    command: "GLOBAL",
    description: "Declara un símbolo como global (visible para el enlazador).",
    example: "GLOBAL _start ; Declara '_start' como punto de entrada",
  },
  {
    category: "Registro",
    command: "EAX",
    description: "Registro de acumulador de 32 bits, usado para operaciones aritméticas y syscalls.",
    example: "MOV eax, 1 ; Carga el código de syscall 'exit' en eax",
  },
  {
    category: "Registro",
    command: "EBX",
    description: "Registro base de 32 bits, usado para pasar argumentos en syscalls.",
    example: "MOV ebx, 0 ; Carga el código de salida 0 en ebx",
  },
  {
    category: "Registro",
    command: "ECX",
    description: "Registro contador de 32 bits, usado para bucles y argumentos de syscalls.",
    example: "MOV ecx, mensaje ; Carga la dirección de 'mensaje' en ecx",
  },
  {
    category: "Registro",
    command: "EDX",
    description: "Registro de datos de 32 bits, usado para argumentos de syscalls.",
    example: "MOV edx, len ; Carga la longitud de 'mensaje' en edx",
  },
  {
    category: "Registro",
    command: "ESP",
    description: "Puntero de pila de 32 bits, apunta a la cima de la pila.",
    example: "PUSH eax ; Decrementa ESP y coloca eax en la pila",
  },
  {
    category: "Registro",
    command: "EBP",
    description: "Puntero base de 32 bits, usado para acceder a variables locales en la pila.",
    example: "MOV ebp, esp ; Establece el marco de pila",
  },
];

// Variantes para las animaciones (igual que en NasmSetup)
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

function NasmCommands() {
  const commandsRef = useRef(null);
  const isCommandsInView = useInView(commandsRef, { once: true, margin: "-50px" });

  return (
    <motion.section
      className="commands-container"
      ref={commandsRef}
      initial="hidden"
      animate={isCommandsInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h1 className="commands-title" variants={childVariants}>
        Comandos y Palabras Clave Principales de NASM
      </motion.h1>
      <motion.div className="commands-table-wrapper" variants={childVariants}>
        <table className="commands-table">
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Comando/Palabra Clave</th>
              <th>Descripción</th>
              <th>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            {NASM_COMMANDS.map((cmd, index) => (
              <motion.tr key={`cmd-${index}`} variants={childVariants}>
                <td>{cmd.category}</td>
                <td>{cmd.command}</td>
                <td>{cmd.description}</td>
                <td>
                  <code>{cmd.example}</code>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.section>
  );
}

export default NasmCommands;