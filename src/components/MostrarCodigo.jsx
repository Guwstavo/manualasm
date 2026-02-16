import { forwardRef, useState, useEffect } from "react";
import "../styles/mostrarcodigo.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaPlay, FaExclamationTriangle } from "react-icons/fa";
import { simulateNasm } from "../utils/nasmSimulator";

const MostrarCodigo = forwardRef(({ name = "Código Desconocido", description = "", code = "", execution = "" }, ref) => {
    const [currentCode, setCurrentCode] = useState(code);
    const [currentExecution, setCurrentExecution] = useState(execution);
    const [isEditingCode, setIsEditingCode] = useState(false);
    const [isEditingExecution, setIsEditingExecution] = useState(false);
    const [copied, setCopied] = useState(false);
    const [simulationMode, setSimulationMode] = useState(true);
    const [simulationResult, setSimulationResult] = useState(null);

    // Simular automáticamente cuando cambie el código
    useEffect(() => {
        if (simulationMode && currentCode) {
            const timer = setTimeout(() => {
                const result = simulateNasm(currentCode);
                setSimulationResult(result);
                if (result.success) {
                    setCurrentExecution(result.output);
                } else {
                    setCurrentExecution("Error de compilación/ejecución:\n\n" + result.errors.join('\n'));
                }
            }, 500); // Debounce de 500ms

            return () => clearTimeout(timer);
        }
    }, [currentCode, simulationMode]);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(currentCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setCurrentCode(code);
        setCurrentExecution(execution);
        setSimulationResult(null);
    };

    const handleCodeChange = (newCode) => {
        setCurrentCode(newCode);
    };

    const toggleSimulationMode = () => {
        setSimulationMode(!simulationMode);
        if (simulationMode) {
            // Si desactivamos la simulación, restaurar ejecución original
            setCurrentExecution(execution);
        }
    };

    return (
        <div ref={ref} id={(name || "codigo-desconocido").replace(/\s+/g, "-").toLowerCase()} className="mostrar-codigo">
            <h2>{name}</h2>
            <p>{description}</p>
            
            <div className="code-container">
                <div className="code-actions">
                    <button onClick={handleCopyCode} className="action-btn copy-btn">
                        {copied ? "✔ Copiado" : <><FaCopy /> Copiar</>}
                    </button>
                    <button 
                        onClick={() => setIsEditingCode(!isEditingCode)} 
                        className="action-btn edit-btn"
                    >
                        {isEditingCode ? "Vista Previa" : "Editar Código"}
                    </button>
                    <button 
                        onClick={toggleSimulationMode} 
                        className={`action-btn simulation-btn ${simulationMode ? 'active' : ''}`}
                        title={simulationMode ? "Simulación activa" : "Simulación desactivada"}
                    >
                        <FaPlay /> {simulationMode ? "Ejecutar ✓" : "Ejecutar X"}
                    </button>
                    <button onClick={handleReset} className="action-btn reset-btn">
                        Restaurar
                    </button>
                </div>

                {simulationResult && !simulationResult.success && simulationMode && (
                    <div className="simulation-warning">
                        <FaExclamationTriangle /> Errores detectados en la simulación
                    </div>
                )}

                {isEditingCode ? (
                    <textarea
                        value={currentCode}
                        onChange={(e) => handleCodeChange(e.target.value)}
                        className="code-editor"
                        spellCheck={false}
                    />
                ) : (
                    <SyntaxHighlighter language="nasm" style={dracula} showLineNumbers>
                        {currentCode}
                    </SyntaxHighlighter>
                )}
            </div>

            <div className="execution-container">
                <div className="execution-header">
                    <h3>
                        Ejecución 
                        {simulationMode && <span className="simulation-badge">Simulada</span>}
                    </h3>
                    {!simulationMode && (
                        <button 
                            onClick={() => setIsEditingExecution(!isEditingExecution)} 
                            className="action-btn edit-execution-btn"
                        >
                            {isEditingExecution ? "Vista Previa" : "Editar Salida"}
                        </button>
                    )}
                </div>

                {isEditingExecution && !simulationMode ? (
                    <textarea
                        value={currentExecution}
                        onChange={(e) => setCurrentExecution(e.target.value)}
                        className="execution-editor"
                        spellCheck={false}
                    />
                ) : (
                    <div className={`console-output ${simulationResult && !simulationResult.success ? 'error' : ''}`}>
                        {currentExecution}
                    </div>
                )}
            </div>
        </div>
    );
});

export default MostrarCodigo;