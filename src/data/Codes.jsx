const codes = [
    { 
        name: "Hola, mundo!", 
        description: "Este código imprime 'Hola, mundo!' en la consola y luego termina el programa.", 
        code: 
        `;1.- ENSAMBLAMOS: nasm -f elf32 hola.asm -o hola.o
    ;2.- ENLAZAMOS: ld -m elf_i386 -s -o hola hola.o
    ;3.- EJECUTAMOS: ./hola


    ;db: define una variable de tipo byte, 8 bits.
    ;dw: define una variable de tipo palabra (word), 2 bytes = 16 bits.
    ;dd: define una variable de tipo doble palabra (double word), 2 palabras = 4 bytes = 32 bits.
    ;dq: define una variable de tipo cuádruple palabra (quad word), 4 palabras = 8 bytes = 64 bits.


    ;Nota: Si estás en un sistema de 64 bits, es posible que necesites ;instalar las bibliotecas de 32 bits:
    ;sudo apt install gcc-multilib


    section .data
        mensaje db "Hola, mundo!", 0xA  ; Mensaje con salto de línea (0xA representa un salto de línea (en ASCII).)
                                        ;msg db "Hola, mundo!", 10  ; Mensaje con salto de línea
        len equ $ - mensaje             ; Longitud del mensaje, $ representa la posición actual en la memoria. 
                                        ;len tendrá la cantidad de bytes del mensaje (incluyendo 0xA).

    section .text
        global _start             ; seccion ELF
                    ; ELF es un formato de archivo que se utiliza para almacenar aplicaciones ejecutables en sistemas operativos 
                    ;como Linux y BSD. El lenguaje ensamblador es un lenguaje de programación que se utiliza en microprocesadores. 


    _start:
        ; Llamada al sistema write (syscall número 1 en Linux)
        mov eax, 4       ; syscall número 4 -> sys_write (Carga el número de syscall 4 (sys_write))
        mov ebx, 1       ; File descriptor 1 -> stdout (Elige la salida estándar (stdout), que tiene el descriptor de archivo 1.)
        mov ecx, mensaje ; Dirección del mensaje ( Carga la dirección del mensaje en ecx.)
        mov edx, len     ; Longitud del mensaje ( Carga la longitud del mensaje en edx.)
        int 0x80         ; Llamado a la interrupción de Linux (Llama al kernel de Linux para ejecutar la syscall.)

        ; Llamada al sistema exit (syscall número 1 en Linux)
        mov eax, 1       ; syscall número 1 -> sys_exit ( Carga el número de syscall 1 (sys_exit).)
        xor ebx, ebx     ; Código de salida 0 (Coloca 0 en ebx, indicando que el programa terminó sin errores.)
        int 0x80         ; Llamado a la interrupción de Linux (Llama al kernel de Linux para ejecutar la syscall.)`,
        execution: "Hola, mundo!"
    },
    { 
        name: "Ciclo 'Hello' 10 veces",
        description: "Este código imprime la palabra 'Hello' seguida de un salto de línea, repitiéndolo 10 veces usando un bucle con el registro ECX.",
        code: 
        `;1.- ENSAMBLAMOS: nasm -f elf32 ciclo.asm -o ciclo.o
      ;2.- ENLAZAMOS: ld -m elf_i386 -s -o ciclo ciclo.o
      ;3.- EJECUTAMOS: ./ciclo
      
      section .data
          hello db "Hello", 10  ; "Hello" seguido de un salto de línea
          hello_len equ $ - hello
          N equ 10  ; Número de repeticiones
      
      section .text
          global _start
      
      _start:
          mov ecx, N      ; Usamos ECX como contador
      
      .loop:
          push ecx        ; Guardamos el valor del contador
          mov edx, hello_len  ; Longitud del mensaje
          mov ecx, hello  ; Dirección del mensaje
          mov ebx, 1      ; Descriptor de archivo (stdout)
          mov eax, 4      ; syscall: sys_write
          int 0x80        ; Llamada al sistema
          pop ecx         ; Restauramos el contador
          loop .loop      ; Decrementa ECX y salta si no es 0
      
          mov eax, 1      ; syscall: sys_exit
          xor ebx, ebx    ; Código de salida 0
          int 0x80        ; Llamada al sistema`,
        execution: 
        `Hello
        Hello
        Hello
        Hello
        Hello
        Hello
        Hello
        Hello
        Hello
        Hello
        `
    },
    { 
        name: "Leer un número",
        description: "Este código solicita al usuario que ingrese un número, lo almacena en un buffer y luego lo imprime en pantalla.",
        code: 
        `; nasm -f elf32 leer.asm -o leer.o
      ; ld -m elf_i386 leer.o -o leer
      ; ./leer
      
      section .bss
          buffer resb 10  ; Buffer para almacenar el número ingresado
      
      section .data
          msg db "Ingresa un número: ", 0
          msg_result db "Número ingresado: ", 0
          newline db 10, 0  ; Salto de línea
      
      section .text
          global _start
      
      _start:
          ; Mostrar mensaje
          mov eax, 4          ; syscall write
          mov ebx, 1          ; stdout
          mov ecx, msg        ; Dirección del mensaje
          mov edx, 18         ; Longitud del mensaje
          int 0x80            ; Llamado al sistema
      
          ; Leer número desde la entrada estándar
          mov eax, 3          ; syscall read
          mov ebx, 0          ; stdin
          mov ecx, buffer     ; Dirección donde guardar el número
          mov edx, 10         ; Longitud máxima
          int 0x80            ; Llamado al sistema
      
          ; Mostrar mensaje del resultado
          mov eax, 4
          mov ebx, 1
          mov ecx, msg_result
          mov edx, 18
          int 0x80
      
          ; Mostrar el número ingresado
          mov eax, 4
          mov ebx, 1
          mov ecx, buffer
          mov edx, 10
          int 0x80
      
          ; Imprimir salto de línea
          mov eax, 4
          mov ebx, 1
          mov ecx, newline
          mov edx, 1
          int 0x80
      
          ; Salir del programa
          mov eax, 1          ; syscall exit
          xor ebx, ebx        ; Código de salida 0
          int 0x80`,
        execution: `Ingresa un número: 
      [usuario ingresa un número]
      Número ingresado: 
      [número ingresado]`
    },
    { 
        name: "Suma de dos números",
        description: "Este código pide al usuario dos números de un solo dígito, los suma y muestra el resultado en pantalla.",
        code: 
        `;nasm -f elf32 suma.asm -o suma.o
      ;ld -m elf_i386 suma.o -o suma
      ;./suma
      
      ; Sección .bss, variables no inicializadas
      ;Dentro de esta sección se declaran y se reserva espacio para las variables de
      ;nuestro programa para las cuales no queremos dar un valor inicial.
      
      ;resb: reserva espacio en unidades de byte
      ;resw: reserva espacio en unidades de palabra, 2 bytes
      ;resd: reserva espacio en unidades de doble palabra, 4 bytes
      ;resq: reserva espacio en unidades de cuádruple palabra, 8 bytes
      
      section .bss
          num1 resb 2    ; Reservar espacio para num1
          num2 resb 2    ; Reservar espacio para num2
          resultado resb 64  ; Reservar espacio para el resultado
      
      section .data
          msg1 db "Ingresa el primer número?", 0
          msg2 db "Ingresa el segundo número?", 0
          msg_result db "La suma es: ", 0
          newline db 10, 0  ; Salto de línea
      
      section .text
          global _start
      
      _start:
          ; Mostrar mensaje 1
          mov eax, 4          ; syscall write
          mov ebx, 1          ; stdout
          mov ecx, msg1       ; Dirección del mensaje
          mov edx, 25         ; Longitud del mensaje
          int 0x80            ; Llamado al sistema
      
          ; Leer primer número
          mov eax, 3          ; syscall read
          mov ebx, 0          ; stdin
          mov ecx, num1       ; Dirección donde guardar el número
          mov edx, 2          ; Longitud (1 dígito + Enter)
          int 0x80            ; Llamado al sistema
      
          ; Mostrar mensaje 2
          mov eax, 4
          mov ebx, 1
          mov ecx, msg2
          mov edx, 26
          int 0x80
      
          ; Leer segundo número
          mov eax, 3
          mov ebx, 0
          mov ecx, num2
          mov edx, 2
          int 0x80
      
          ; Convertir caracteres ASCII a números
          mov al, [num1]  
          sub al, '0'      ; Convierte de ASCII a valor numérico
          mov bl, [num2]  
          sub bl, '0'
      
          ; Sumar los números
          add al, bl
          add al, '0'      ; Convertir resultado de vuelta a ASCII
          mov [resultado], al
      
          ; Mostrar mensaje del resultado
          mov eax, 4
          mov ebx, 1
          mov ecx, msg_result
          mov edx, 13
          int 0x80
      
          ; Mostrar el resultado
          mov eax, 4
          mov ebx, 1
          mov ecx, resultado
          mov edx, 1
          int 0x80
      
          ; Imprimir salto de línea
          mov eax, 4
          mov ebx, 1
          mov ecx, newline
          mov edx, 1
          int 0x80
      
          ; Salir del programa
          mov eax, 1          ; syscall exit
          xor ebx, ebx        ; Código de salida 0
          int 0x80`,
        execution: `Ingresa el primer número?
      [usuario ingresa un número]
      Ingresa el segundo número?
      [usuario ingresa otro número]
      La suma es: 
      [resultado de la suma]`
    },
    { 
        name: "Calculadora en ASM",
        description: "Este código implementa una calculadora en consola que permite sumar, restar, multiplicar o dividir dos números ingresados por el usuario.",
        code: 
        `;1.- ENSAMBLAMOS: nasm -f elf32 calculadora.asm -o calculadora.o
      ;2.- ENLAZAMOS: ld -m elf_i386 -s -o calculadora calculadora.o
      ;3.- EJECUTAMOS: ./calculadora
      
      section .data
       
         ; Mensajes
       
         msg1     db    10,'-Calculadora-',10,0
         lmsg1    equ      $ - msg1
       
         msg2     db    10,'Numero 1: ',0
         lmsg2    equ      $ - msg2
       
         msg3     db    'Numero 2: ',0
         lmsg3    equ      $ - msg3
       
         msg4     db    10,'1. Sumar',10,0
         lmsg4    equ      $ - msg4
       
         msg5     db    '2. Restar',10,0
         lmsg5    equ      $ - msg5
       
         msg6     db    '3. Multiplicar',10,0
         lmsg6    equ      $ - msg6
       
         msg7     db    '4. Dividir',10,0
         lmsg7    equ      $ - msg7
       
         msg8     db    'Operacion: ',0
         lmsg8    equ      $ - msg8
       
         msg9     db    10,'Resultado: ',0
         lmsg9    equ      $ - msg9
       
         msg10    db    10,'Opcion Invalida',10,0
         lmsg10   equ      $ - msg10
       
         nlinea   db    10,10,0
         lnlinea  equ      $ - nlinea
       
      section .bss
         opcion:     resb  2
         num1:       resb  2
         num2:       resb  2
         resultado:  resb  2
       
      section .text
         global _start
       
      _start:
         ; Mostrar título y solicitar números
         mov eax, 4
         mov ebx, 1
         mov ecx, msg1
         mov edx, lmsg1
         int 80h
      
         mov eax, 4
         mov ecx, msg2
         mov edx, lmsg2
         int 80h
      
         mov eax, 3
         mov ebx, 0
         mov ecx, num1
         mov edx, 2
         int 80h
      
         mov eax, 4
         mov ecx, msg3
         mov edx, lmsg3
         int 80h
      
         mov eax, 3
         mov ecx, num2
         mov edx, 2
         int 80h
      
         ; Mostrar menú de operaciones
         mov eax, 4
         mov ecx, msg4
         mov edx, lmsg4
         int 80h
      
         mov ecx, msg5
         mov edx, lmsg5
         int 80h
      
         mov ecx, msg6
         mov edx, lmsg6
         int 80h
      
         mov ecx, msg7
         mov edx, lmsg7
         int 80h
      
         ; Solicitar opción
         mov ecx, msg8
         mov edx, lmsg8
         int 80h
      
         mov eax, 3
         mov ebx, 0
         mov ecx, opcion
         mov edx, 2
         int 80h
      
         mov ah, [opcion]
         sub ah, '0'
      
         cmp ah, 1
         je sumar
         cmp ah, 2
         je restar
         cmp ah, 3
         je multiplicar
         cmp ah, 4
         je dividir
      
         ; Opción inválida
         mov eax, 4
         mov ebx, 1
         mov ecx, msg10
         mov edx, lmsg10
         int 80h
         jmp salir
      
      sumar:
         mov al, [num1]
         mov bl, [num2]
         sub al, '0'
         sub bl, '0'
         add al, bl
         add al, '0'
         mov [resultado], al
         jmp imprimir
      
      restar:
         mov al, [num1]
         mov bl, [num2]
         sub al, '0'
         sub bl, '0'
         sub al, bl
         add al, '0'
         mov [resultado], al
         jmp imprimir
      
      multiplicar:
         mov al, [num1]
         mov bl, [num2]
         sub al, '0'
         sub bl, '0'
         mul bl
         add ax, '0'
         mov [resultado], ax
         jmp imprimir
      
      dividir:
         mov al, [num1]
         mov bl, [num2]
         mov dx, 0
         mov ah, 0
         sub al, '0'
         sub bl, '0'
         div bl
         add ax, '0'
         mov [resultado], ax
      
      imprimir:
         mov eax, 4
         mov ebx, 1
         mov ecx, msg9
         mov edx, lmsg9
         int 80h
      
         mov eax, 4
         mov ecx, resultado
         mov edx, 2
         int 80h
         jmp salir
      
      salir:
         mov eax, 4
         mov ebx, 1
         mov ecx, nlinea
         mov edx, lnlinea
         int 80h
      
         mov eax, 1
         mov ebx, 0
         int 80h`,
        execution: `-Calculadora-
      
      Numero 1: 
      [usuario ingresa número 1]
      Numero 2: 
      [usuario ingresa número 2]
      1. Sumar
      2. Restar
      3. Multiplicar
      4. Dividir
      Operacion: 
      [usuario ingresa opción]
      Resultado: 
      [result]`
    },
    { 
        name: "Suma y ciclo con 'Hello'",
        description: "Este código solicita dos números al usuario, los suma, muestra el resultado y luego imprime 'Hello' tantas veces como el valor de la suma.",
        code:
        `;1.- ENSAMBLAMOS: nasm -f elf32 suma_y_ciclo.asm -o suma_y_ciclo.o
      ;2.- ENLAZAMOS: ld -m elf_i386 -s -o suma_y_ciclo suma_y_ciclo.o
      ;3.- EJECUTAMOS: ./suma_y_ciclo
      
      section .bss
          num1 resb 1         ; Reservar espacio para num1
          num2 resb 1         ; Reservar espacio para num2
          resultado resb 1    ; Reservar espacio para el resultado
          aux resb 1          ; Auxiliar (no usado directamente)
      
      section .data
          msg1 db "Ingresa el primer número?", 0
          msg2 db "Ingresa el segundo número?", 0
          msg_result db "La suma es: ", 0
          newline db 10, 0    ; Salto de línea
      
          hello db "Hello", 10  ; "Hello" + salto de línea
          hello_len equ $ - hello
      
      section .text
          global _start
      
      _start:
          ; Mostrar mensaje 1
          mov eax, 4
          mov ebx, 1
          mov ecx, msg1
          mov edx, 25
          int 0x80
      
          ; Leer primer número
          mov eax, 3
          mov ebx, 0
          mov ecx, num1
          mov edx, 2
          int 0x80
      
          ; Mostrar mensaje 2
          mov eax, 4
          mov ebx, 1
          mov ecx, msg2
          mov edx, 26
          int 0x80
      
          ; Leer segundo número
          mov eax, 3
          mov ebx, 0
          mov ecx, num2
          mov edx, 2
          int 0x80
      
          ; Convertir ASCII a números
          mov al, [num1]
          sub al, '0'
          mov bl, [num2]
          sub bl, '0'
      
          ; Sumar y convertir resultado a ASCII
          add al, bl
          add al, '0'
          mov [resultado], al
      
          ; Mostrar "La suma es: "
          mov eax, 4
          mov ebx, 1
          mov ecx, msg_result
          mov edx, 13
          int 0x80
      
          ; Mostrar el resultado
          mov eax, 4
          mov ebx, 1
          mov ecx, resultado
          mov edx, 1
          int 0x80
      
          ; Salto de línea
          mov eax, 4
          mov ebx, 1
          mov ecx, newline
          mov edx, 1
          int 0x80
      
          ; Volver a convertir los números y sumar (para usar como contador)
          mov al, [num1]
          sub al, '0'
          mov bl, [num2]
          sub bl, '0'
          add al, bl
          mov [resultado], al
          movzx ecx, byte [resultado] ; Extiende con ceros a 32 bits
      
      .loop:
          push ecx
          mov edx, hello_len
          mov ecx, hello
          mov ebx, 1
          mov eax, 4
          int 0x80
          pop ecx
          loop .loop
      
          ; Salir del programa
          mov eax, 1
          xor ebx, ebx
          int 0x80`,
        execution: `Ingresa el primer número?
      [usuario ingresa número 1]
      Ingresa el segundo número?
      [usuario ingresa número 2]
      La suma es: 
      [suma]
      Hello
      Hello
      ...
      (Se repite según la suma)`
    },
    { 
        name: "Calculadora con scanf/printf",
        description: "Este programa en ensamblador usa scanf y printf para recibir dos números y una operación (+, -, *, /), realiza el cálculo y muestra el resultado. También detecta división por cero.",
        code: 
        `section .data
          prompt1 db "Ingrese el primer numero: ", 0
          prompt2 db "Ingrese el segundo numero: ", 0
          prompt3 db "Ingrese la operacion (+, -, *, /): ", 0
          fmt_in_num db "%d", 0
          fmt_in_char db " %c", 0
          fmt_out db "Resultado: %d", 10, 0
          error_msg db "Error: Division por cero", 10, 0
      
      section .bss
          num1 resd 1
          num2 resd 1
          oper resb 1
          result resd 1
      
      section .text
          global main
          extern printf, scanf
      
      main:
          ; Pedir primer número
          push prompt1
          call printf
          add esp, 4
      
          push num1
          push fmt_in_num
          call scanf
          add esp, 8
      
          ; Pedir segundo número
          push prompt2
          call printf
          add esp, 4
      
          push num2
          push fmt_in_num
          call scanf
          add esp, 8
      
          ; Pedir operación
          push prompt3
          call printf
          add esp, 4
      
          push oper
          push fmt_in_char
          call scanf
          add esp, 8
      
          ; Cargar operandos en registros
          mov eax, [num1]  
          mov ebx, [num2]  
      
          ; Evaluar operación
          mov cl, [oper]   
          cmp cl, '+'
          je sumar
          cmp cl, '-'
          je restar
          cmp cl, '*'
          je multiplicar
          cmp cl, '/'
          je dividir
          jmp fin
      
      sumar:
          add eax, ebx
          jmp guardar_resultado
      
      restar:
          sub eax, ebx
          jmp guardar_resultado
      
      multiplicar:
          imul ebx
          jmp guardar_resultado
      
      dividir:
          cmp ebx, 0
          je error_division
          cdq
          idiv ebx
          jmp guardar_resultado
      
      error_division:
          push error_msg
          call printf
          add esp, 4
          jmp fin
      
      guardar_resultado:
          mov [result], eax
          push dword [result]
          push fmt_out
          call printf
          add esp, 8
      
      fin:
          xor eax, eax
          ret`,
        execution: `Ingrese el primer numero: 
      [usuario ingresa número]
      Ingrese el segundo numero: 
      [usuario ingresa otro número]
      Ingrese la operacion (+, -, *, /): 
      [usuario ingresa operador]
      Resultado: 
      [resultado calculado o error de división por cero]`
    },
    { 
        name: "Verificar si es par o impar",
        description: "Este programa en ensamblador verifica si un número es par o impar usando la instrucción 'test'. Si el bit menos significativo está encendido, es impar; si no, es par.",
        code:
        `;nasm -f elf32 es_par.asm -o es_par.o
      ;gcc -m32 es_par.o -o es_par -no-pie
      ;./es_par
      
      section .data
          num dd 10
          par db "El número es par", 10, 0
          inpar db "El número es impar", 10, 0
      
      section .text
          global main
          extern printf
      
      main:
          mov eax, dword [num]
          test eax, 1         ; Comprobar si el bit menos significativo es 1
          jz print_par        ; Saltar si es 0 (es par)
          push inpar
          call printf
          add esp, 4
          jmp end_programa
      
      print_par:
          push par
          call printf
          add esp, 4
      
      end_programa:
          xor eax, eax
          ret`,
        execution: `El número es par`
    },
    { 
        name: "Factorial de un número",
        description: "Este programa en ensamblador calcula el factorial de un número usando un bucle descendente. Utiliza 'imul' para multiplicaciones sucesivas y 'printf' para mostrar el resultado.",
        code: 
        `;nasm -f elf32 factorial.asm -o factorial.o
      ;gcc -m32 factorial.o -o factorial -no-pie
      ;./factorial
      
      section .data
          num dd 5
          fmt db "Factorial: %d", 10, 0
      
      section .bss
          res resb 4
      
      section .text
          global main
          extern printf
      
      main:
          mov eax, 1               ; Inicializar resultado en 1
          mov ecx, dword [num]     ; Cargar número
      
      factorial_loop:
          cmp ecx, 1               ; Si ecx <= 1, termina
          jle end_loop
          imul eax, ecx            ; Multiplicar eax * ecx
          dec ecx                  ; Decrementar contador
          jmp factorial_loop
      
      end_loop:
          mov [res], eax           ; Guardar resultado
      
          push dword [res]
          push fmt
          call printf
          add esp, 8
      
          xor eax, eax
          ret`,
        execution: `Factorial: 120`
    },
    { 
        name: "Leer e imprimir un número",
        description: "Este programa en ensamblador solicita al usuario un número entero usando scanf y luego lo muestra por pantalla con printf.",
        code:
        `; nasm -f elf32 leer.asm -o leer.o
      ; gcc -m32 leer.o -o leer -no-pie
      ; ./leer
      
      section .data
          prompt db "Ingrese un valor: ", 0
          fmt_in db "%d", 0
          fmt_out db "Valor ingresado: %d", 10, 0
      
      section .bss
          num resd 1  ; Espacio para almacenar el número ingresado
      
      section .text
          global main
          extern printf, scanf
      
      main:
          ; Mostrar mensaje de entrada
          push prompt
          call printf
          add esp, 4
      
          ; Leer el valor desde la consola
          push num
          push fmt_in
          call scanf
          add esp, 8
      
          ; Imprimir el valor ingresado
          push dword [num]
          push fmt_out
          call printf
          add esp, 8
      
          ; Terminar el programa
          xor eax, eax
          ret`,
        execution: `Ingrese un valor: 
      [usuario ingresa un número]
      Valor ingresado: 
      [número ingresado]`
    },
    { 
        name: "Pirámide de asteriscos",
        description: "Este programa en ensamblador imprime una pirámide de asteriscos en consola. El usuario ingresa el número de filas y se generan espacios y asteriscos alineados correctamente usando bucles.",
        code:
        `; nasm -f elf32 piramide.asm -o piramide.o
      ; gcc -m32 piramide.o -o piramide -no-pie
      ; ./piramide
      
      section .data
          prompt db "Ingrese el numero de filas: ", 0
          fmt_in db "%d", 0
          fmt_out db "%c", 0
          newline db 10, 0
          space db " ", 0
          asterisk db " * ", 0
      
      section .bss
          filas resd 1
      
      section .text
          global main
          extern printf, scanf
      
      main:
          ; Pedir el número de filas
          push prompt
          call printf
          add esp, 4
      
          push filas
          push fmt_in
          call scanf
          add esp, 8
      
          ; Cargar el número de filas en ECX
          mov ecx, [filas]
          mov edi, 1   ; Controla la cantidad de asteriscos por fila
      
      fila_loop:
          push ecx  ; Guardar ECX en la pila
      
          ; Imprimir espacios antes de los asteriscos
          mov eax, [filas]
          sub eax, edi
          mov ebx, eax
      
      espacio_loop:
          cmp ebx, 0
          je imprimir_asteriscos
          push space
          call printf
          add esp, 4
          dec ebx
          jmp espacio_loop
      
      imprimir_asteriscos:
          mov ebx, edi
      
      asterisco_loop:
          cmp ebx, 0
          je nueva_linea
          push asterisk
          call printf
          add esp, 4
          dec ebx
          jmp asterisco_loop
      
      nueva_linea:
          push newline
          call printf
          add esp, 4
      
          pop ecx
          inc edi
          loop fila_loop
      
          xor eax, eax
          ret`,
        execution: `Ingrese el numero de filas: 
      [usuario ingresa 5]
      
          * 
         * * 
        * * * 
       * * * * 
      * * * * *`
    },
    { 
        name: "Raíz cuadrada con FPU",
        description: "Este programa usa la unidad de punto flotante (FPU) para calcular la raíz cuadrada de un número de tipo `double` (64 bits) y mostrarlo en pantalla con `printf`.",
        code:
        `;nasm -f elf32 raiz.asm -o raiz.o
      ;gcc -m32 raiz.o -o raiz -no-pie
      ;./raiz
      
      section .data
          num dd 25.0             ; Número de entrada
          fmt db "Raíz cuadrada: %lf", 10, 0  ; %lf para double
      
      section .bss
          res resq 1              ; Espacio para un número de 8 bytes (double)
      
      section .text
          global main
          extern printf
      
      main:
          finit                   ; Inicializar la FPU para "unidades de punto flotante"
          fld dword [num]         ; Cargar el número en la FPU
          fsqrt                   ; Calcular la raíz cuadrada
          fstp qword [res]        ; Guardar el resultado en 64 bits
      
          push dword [res+4]      ; Parte alta del double
          push dword [res]        ; Parte baja del double
          push fmt
          call printf
          add esp, 12             ; Limpiar la pila
      
          xor eax, eax
          ret`,
        execution: `Raíz cuadrada: 5.000000`
    },
    { 
        name: "Suma de dos enteros",
        description: "Este programa realiza la suma de dos enteros definidos en la sección .data y muestra el resultado usando `printf`. Ideal para aprender manipulación básica de registros y salida en consola.",
        code:
        `;nasm -f elf32 suma.asm -o suma.o
      ;gcc -m32 suma.o -o suma -no-pie
      ;./suma
      
      ;sudo apt install gcc-multilib
      
      section .data
          num1 dd 500
          num2 dd 10
          fmt db "Resultado: %d", 10, 0
      
      section .bss
          res resb 4
      
      section .text
          global main
          extern printf
      
      main:
          mov eax, dword [num1]  ; Cargar num1 en eax
          add eax, dword [num2]  ; Sumar num2
          mov [res], eax         ; Guardar resultado
      
          push dword [res]       ; Pasar el resultado a printf
          push fmt
          call printf
          add esp, 8             ; Limpiar pila
      
          xor eax, eax
          ret`,
        execution: `Resultado: 510`
    },
];

export default codes;
