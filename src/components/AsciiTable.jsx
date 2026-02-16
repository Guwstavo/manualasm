import React, { useState } from "react";
import { FaSearch, FaTimes, FaTable } from "react-icons/fa";
import "../styles/asciiTable.css";

const AsciiTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Generar tabla ASCII (0-127)
  const generateAsciiTable = () => {
    const table = [];
    for (let i = 0; i < 128; i++) {
      table.push({
        dec: i,
        hex: i.toString(16).toUpperCase().padStart(2, "0"),
        bin: i.toString(2).padStart(8, "0"),
        char: i < 32 ? getControlCharName(i) : i === 127 ? "DEL" : String.fromCharCode(i),
        category: i < 32 ? "control" : i === 127 ? "control" : i >= 33 && i <= 47 || i >= 58 && i <= 64 || i >= 91 && i <= 96 || i >= 123 && i <= 126 ? "special" : "printable"
      });
    }
    return table;
  };

  const getControlCharName = (code) => {
    const controlChars = {
      0: "NUL", 1: "SOH", 2: "STX", 3: "ETX", 4: "EOT", 5: "ENQ", 6: "ACK", 7: "BEL",
      8: "BS", 9: "TAB", 10: "LF", 11: "VT", 12: "FF", 13: "CR", 14: "SO", 15: "SI",
      16: "DLE", 17: "DC1", 18: "DC2", 19: "DC3", 20: "DC4", 21: "NAK", 22: "SYN", 23: "ETB",
      24: "CAN", 25: "EM", 26: "SUB", 27: "ESC", 28: "FS", 29: "GS", 30: "RS", 31: "US"
    };
    return controlChars[code] || "";
  };

  const getControlCharDescription = (code) => {
    const descriptions = {
      0: "Null", 9: "Tab", 10: "Line Feed", 13: "Carriage Return", 27: "Escape", 32: "Space", 127: "Delete"
    };
    return descriptions[code] || "";
  };

  const asciiTable = generateAsciiTable();

  // Filtrar tabla según búsqueda - solo si hay búsqueda activa
  const filteredTable = searchTerm === "" 
    ? [] 
    : asciiTable.filter((item) => {
        return item.dec.toString().includes(searchTerm) ||
               item.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.char.toLowerCase().includes(searchTerm.toLowerCase());
      });

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        className="ascii-float-button"
        onClick={togglePopup}
        title="Tabla ASCII"
      >
        <FaTable className="float-icon" />
        <span className="float-text">ASCII</span>
      </button>

      {/* Popup/Modal */}
      {isOpen && (
        <>
          <div className="ascii-overlay" onClick={togglePopup}></div>
          <div className="ascii-popup">
            <div className="ascii-popup-header">
              <h2>Tabla ASCII</h2>
              <button className="close-button" onClick={togglePopup}>
                <FaTimes />
              </button>
            </div>

            <div className="ascii-popup-content">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por carácter, decimal o hex..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {searchTerm === "" ? (
                <div className="empty-state">
                  <FaSearch className="empty-icon" />
                  <p className="empty-text">Escribe un carácter, número decimal o código hexadecimal para buscar en la tabla ASCII</p>
                  <p className="empty-hint">Ejemplos: "A", "65", "41", "TAB"</p>
                </div>
              ) : filteredTable.length === 0 ? (
                <div className="empty-state">
                  <FaTimes className="empty-icon" />
                  <p className="empty-text">No se encontraron resultados para "{searchTerm}"</p>
                  <p className="empty-hint">Intenta con otro término de búsqueda</p>
                </div>
              ) : (
                <>
                  <div className="results-count">
                    {filteredTable.length} resultado{filteredTable.length !== 1 ? 's' : ''} encontrado{filteredTable.length !== 1 ? 's' : ''}
                  </div>

                  <div className="ascii-table-wrapper">
                    <table className="ascii-table">
                      <thead>
                        <tr>
                          <th>Dec</th>
                          <th>Hex</th>
                          <th>Bin</th>
                          <th>Char</th>
                          <th>Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTable.map((item) => (
                          <tr
                            key={item.dec}
                            className={`ascii-row ${item.category}`}
                          >
                            <td className="dec-col">{item.dec}</td>
                            <td className="hex-col">0x{item.hex}</td>
                            <td className="bin-col">{item.bin}</td>
                            <td className={`char-col ${item.category}`}>
                              {item.category === "control" ? (
                                <span className="control-char">{item.char}</span>
                              ) : (
                                item.char
                              )}
                            </td>
                            <td className="desc-col">
                              {getControlCharDescription(item.dec)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="ascii-legend-compact">
                    <span className="legend-item-compact">
                      <span className="legend-dot control"></span> Control
                    </span>
                    <span className="legend-item-compact">
                      <span className="legend-dot special"></span> Especiales
                    </span>
                    <span className="legend-item-compact">
                      <span className="legend-dot printable"></span> Imprimibles
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AsciiTable;
