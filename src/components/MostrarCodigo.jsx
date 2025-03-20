import { forwardRef } from "react";
import "../styles/mostrarcodigo.css";
import AssemblyCodeBlock from "./AssemblyCodeBlock";

const MostrarCodigo = forwardRef(({ name = "Código Desconocido", description = "", code = "" }, ref) => {
    return (
        <div ref={ref} id={(name || "codigo-desconocido").replace(/\s+/g, "-").toLowerCase()} className="mostrar-codigo">
            <h2>{name}</h2>
            <p>{description}</p>
            <AssemblyCodeBlock code={code} />
        </div>
    );
});

export default MostrarCodigo;
