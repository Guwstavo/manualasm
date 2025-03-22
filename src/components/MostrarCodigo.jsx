import { forwardRef } from "react";
import "../styles/mostrarcodigo.css";
import AssemblyCodeBlock from "./AssemblyCodeBlock";

const MostrarCodigo = forwardRef(({ name = "Código Desconocido", description = "", code = "", execution = "" }, ref) => {
    return (
        <div ref={ref} id={(name || "codigo-desconocido").replace(/\s+/g, "-").toLowerCase()} className="mostrar-codigo">
            <h2>{name}</h2>
            <p>{description}</p>
            <AssemblyCodeBlock code={code} />
            <h3>Ejecución</h3>
            <div className="console-output">{execution}</div>
        </div>
    );
});

export default MostrarCodigo;