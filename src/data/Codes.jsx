const codes = [
    { 
        name: "hola.asm", 
        description: "Este código suma dos registros.", 
        code: "MOV AX, 1\nADD AX, BX" 
    },
    { 
        name: "ciclo.asm", 
        description: "Este código multiplica AX por BX.", 
        code: "MOV AX, 2\nMUL BX" 
    },
    { 
        name: "leer.asm", 
        description: "Este código compara AX con BX.", 
        code: "CMP AX, BX\nJZ etiqueta" 
    },
    { 
        name: "suma.asm", 
        description: "Este código compara AX con BX.", 
        code: "CMP AX, BX\nJZ etiqueta" 
    },
    { 
        name: "calculadora.asm", 
        description: "Este código compara AX con BX.", 
        code: "CMP AX, BX\nJZ etiqueta" 
    },
    { 
        name: "suma_y_ciclo.asm", 
        description: "Este código compara AX con BX.", 
        code: "CMP AX, BX\nJZ etiqueta" 
    }
];

export default codes;
