// Simulador de NASM para x86 (32-bit)
export class NasmSimulator {
    constructor() {
        this.registers = {
            eax: 0, ebx: 0, ecx: 0, edx: 0,
            esi: 0, edi: 0, esp: 0, ebp: 0
        };
        this.memory = {};
        this.dataSection = {};
        this.bssSection = {};
        this.output = "";
        this.errors = [];
        this.labels = {};
        this.stack = [];
    }

    reset() {
        this.registers = { eax: 0, ebx: 0, ecx: 0, edx: 0, esi: 0, edi: 0, esp: 0, ebp: 0 };
        this.memory = {};
        this.dataSection = {};
        this.bssSection = {};
        this.output = "";
        this.errors = [];
        this.labels = {};
        this.stack = [];
    }

    parseValue(value) {
        if (!value) return 0;
        value = value.trim();
        
        // Hex
        if (value.startsWith('0x')) {
            return parseInt(value, 16);
        }
        // Binary
        if (value.endsWith('b') && /^[01]+b$/.test(value)) {
            return parseInt(value.slice(0, -1), 2);
        }
        // Número decimal
        if (/^-?\d+$/.test(value)) {
            return parseInt(value, 10);
        }
        // Registro
        if (Object.prototype.hasOwnProperty.call(this.registers, value)) {
            return this.registers[value];
        }
        // Variable o etiqueta
        if (this.dataSection[value]) {
            return this.memory[value] || 0;
        }
        // Dirección de variable
        return value;
    }

    parseString(str) {
        // Elimina comillas y procesa secuencias de escape
        str = str.replace(/^["']|["']$/g, '');
        str = str.replace(/\\n/g, '\n');
        str = str.replace(/\\t/g, '\t');
        str = str.replace(/\\r/g, '\r');
        return str;
    }

    parseDataSection(lines) {
        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith(';')) continue;

            // db: define byte
            const dbMatch = line.match(/^(\w+)\s+db\s+(.+)/);
            if (dbMatch) {
                const [, name, value] = dbMatch;
                let content = '';
                
                // Dividir por comas para manejar múltiples valores
                const parts = value.split(',').map(p => p.trim());
                
                for (let part of parts) {
                    if (part.startsWith('"') || part.startsWith("'")) {
                        content += this.parseString(part);
                    } else if (part.startsWith('0x')) {
                        // Valor hexadecimal (como 0xA para newline)
                        content += String.fromCharCode(parseInt(part, 16));
                    } else {
                        // Número ASCII
                        const num = parseInt(part);
                        if (!isNaN(num)) {
                            content += String.fromCharCode(num);
                        }
                    }
                }
                
                this.dataSection[name] = content;
                this.memory[name] = content;
                continue;
            }

            // equ: constante
            const equMatch = line.match(/^(\w+)\s+equ\s+(.+)/);
            if (equMatch) {
                const [, name, expr] = equMatch;
                // $ - variable significa la longitud
                if (expr.includes('$')) {
                    const varMatch = expr.match(/\$\s*-\s*(\w+)/);
                    if (varMatch) {
                        const varName = varMatch[1];
                        this.dataSection[name] = this.dataSection[varName]?.length || 0;
                    }
                } else {
                    this.dataSection[name] = this.parseValue(expr);
                }
            }
        }
    }

    parseBssSection(lines) {
        for (let line of lines) {
            line = line.trim();
            if (!line || line.startsWith(';')) continue;

            // resb: reserve bytes
            const resbMatch = line.match(/^(\w+)\s+resb\s+(\d+)/);
            if (resbMatch) {
                const [, name, size] = resbMatch;
                this.bssSection[name] = '\0'.repeat(parseInt(size));
                this.memory[name] = this.bssSection[name];
            }
        }
    }

    extractLabels(lines) {
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // Etiquetas terminan con ':'
            if (line.endsWith(':') && !line.startsWith(';')) {
                const label = line.slice(0, -1).trim();
                this.labels[label] = i;
            }
        }
    }

    executeInstruction(instruction, operands) {
        const ops = operands ? operands.split(',').map(s => s.trim()) : [];

        switch (instruction.toLowerCase()) {
            case 'mov': {
                if (ops.length !== 2) break;
                const dest = ops[0];
                const src = this.parseValue(ops[1]);
                
                if (Object.prototype.hasOwnProperty.call(this.registers, dest)) {
                    this.registers[dest] = typeof src === 'number' ? src : 
                                          this.dataSection[src] !== undefined ? this.dataSection[src] : src;
                }
                break;
            }

            case 'xor': {
                if (ops.length !== 2) break;
                const reg1 = ops[0];
                const reg2 = ops[1];
                if (Object.prototype.hasOwnProperty.call(this.registers, reg1)) {
                    const val2 = this.parseValue(reg2);
                    this.registers[reg1] ^= val2;
                }
                break;
            }

            case 'add': {
                if (ops.length !== 2) break;
                const addDest = ops[0];
                if (Object.prototype.hasOwnProperty.call(this.registers, addDest)) {
                    this.registers[addDest] += this.parseValue(ops[1]);
                }
                break;
            }

            case 'sub': {
                if (ops.length !== 2) break;
                const subDest = ops[0];
                if (Object.prototype.hasOwnProperty.call(this.registers, subDest)) {
                    this.registers[subDest] -= this.parseValue(ops[1]);
                }
                break;
            }

            case 'inc': {
                if (ops.length !== 1) break;
                if (Object.prototype.hasOwnProperty.call(this.registers, ops[0])) {
                    this.registers[ops[0]]++;
                }
                break;
            }

            case 'dec': {
                if (ops.length !== 1) break;
                if (Object.prototype.hasOwnProperty.call(this.registers, ops[0])) {
                    this.registers[ops[0]]--;
                }
                break;
            }

            case 'push': {
                if (ops.length !== 1) break;
                this.stack.push(this.parseValue(ops[0]));
                break;
            }

            case 'pop': {
                if (ops.length !== 1) break;
                if (this.stack.length > 0 && Object.prototype.hasOwnProperty.call(this.registers, ops[0])) {
                    this.registers[ops[0]] = this.stack.pop();
                }
                break;
            }

            case 'int': {
                if (ops.length !== 1) break;
                if (ops[0].trim() === '0x80' || ops[0].trim() === '0x80;' || ops[0].trim() === '128') {
                    this.handleSyscall();
                }
                break;
            }
        }
    }

    handleSyscall() {
        const syscallNum = this.registers.eax;

        switch (syscallNum) {
            case 1: { // sys_exit
                // Finaliza la ejecución
                break;
            }

            case 3: { // sys_read
                // Simulación básica de lectura
                const readFd = this.registers.ebx;
                const readBuf = this.registers.ecx;
                
                if (readFd === 0) { // stdin
                    // Simular entrada de usuario (valor por defecto)
                    if (typeof readBuf === 'string' && this.memory[readBuf] !== undefined) {
                        this.memory[readBuf] = '42\n';
                    }
                }
                break;
            }

            case 4: { // sys_write
                const fd = this.registers.ebx;
                const bufAddr = this.registers.ecx;
                const count = this.registers.edx;

                if (fd === 1) { // stdout
                    let text = '';
                    
                    // Si bufAddr es una dirección de variable
                    if (typeof bufAddr === 'string') {
                        if (this.memory[bufAddr]) {
                            text = this.memory[bufAddr];
                            
                            // Limitar por count si es un número
                            if (typeof count === 'number' && count < text.length) {
                                text = text.substring(0, count);
                            }
                        }
                    }
                    
                    this.output += text;
                }
                break;
            }
        }
    }

    executeTextSection(lines) {
        let i = 0;
        let loopCounter = 0;
        const MAX_ITERATIONS = 10000; // Prevenir loops infinitos

        while (i < lines.length && loopCounter < MAX_ITERATIONS) {
            loopCounter++;
            const line = lines[i].trim();
            
            // Ignorar líneas vacías, comentarios y etiquetas
            if (!line || line.startsWith(';') || line.endsWith(':') || 
                line.startsWith('section') || line.startsWith('global')) {
                i++;
                continue;
            }

            // Parsear instrucción
            const parts = line.split(/\s+/);
            const instruction = parts[0];
            const operands = parts.slice(1).join(' ').split(';')[0].trim();

            // Instrucción loop especial
            if (instruction.toLowerCase() === 'loop') {
                this.registers.ecx--;
                if (this.registers.ecx > 0) {
                    const label = operands.trim();
                    if (this.labels[label] !== undefined) {
                        i = this.labels[label] + 1;
                        continue;
                    }
                }
                i++;
                continue;
            }

            // Saltos condicionales e incondicionales
            if (['jmp', 'je', 'jne', 'jz', 'jnz', 'jg', 'jl'].includes(instruction.toLowerCase())) {
                const label = operands.trim();
                if (this.labels[label] !== undefined) {
                    i = this.labels[label] + 1;
                    continue;
                }
            }

            this.executeInstruction(instruction, operands);
            i++;
        }

        if (loopCounter >= MAX_ITERATIONS) {
            this.errors.push("Error: Posible bucle infinito detectado");
        }
    }

    simulate(code) {
        this.reset();
        
        try {
            const lines = code.split('\n');
            let currentSection = '';
            let sectionLines = { data: [], bss: [], text: [] };

            // Separar por secciones
            for (let line of lines) {
                const trimmed = line.trim();
                
                if (trimmed.startsWith('section .data')) {
                    currentSection = 'data';
                    continue;
                } else if (trimmed.startsWith('section .bss')) {
                    currentSection = 'bss';
                    continue;
                } else if (trimmed.startsWith('section .text')) {
                    currentSection = 'text';
                    continue;
                }

                if (currentSection) {
                    sectionLines[currentSection].push(line);
                }
            }

            // Procesar secciones en orden
            this.parseDataSection(sectionLines.data);
            this.parseBssSection(sectionLines.bss);
            this.extractLabels(sectionLines.text);
            this.executeTextSection(sectionLines.text);

            return {
                success: true,
                output: this.output || "(sin salida)",
                errors: this.errors,
                registers: { ...this.registers }
            };

        } catch (error) {
            return {
                success: false,
                output: "",
                errors: [`Error de ejecución: ${error.message}`],
                registers: { ...this.registers }
            };
        }
    }
}

export function simulateNasm(code) {
    const simulator = new NasmSimulator();
    return simulator.simulate(code);
}
