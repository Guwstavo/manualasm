import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "../styles/numberConverter.css";

const NumberConverter = () => {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [hexadecimal, setHexadecimal] = useState("");
  const [octal, setOctal] = useState("");

  const converterRef = useRef(null);
  const isInView = useInView(converterRef, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Actualizar desde decimal
  const handleDecimalChange = (value) => {
    setDecimal(value);
    if (value === "" || value === "-") {
      setBinary("");
      setHexadecimal("");
      setOctal("");
      return;
    }

    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setBinary(num >= 0 ? num.toString(2) : `-${Math.abs(num).toString(2)}`);
      setHexadecimal(num >= 0 ? num.toString(16).toUpperCase() : `-${Math.abs(num).toString(16).toUpperCase()}`);
      setOctal(num >= 0 ? num.toString(8) : `-${Math.abs(num).toString(8)}`);
    }
  };

  // Actualizar desde binario
  const handleBinaryChange = (value) => {
    setBinary(value);
    if (value === "" || value === "-") {
      setDecimal("");
      setHexadecimal("");
      setOctal("");
      return;
    }

    // Permitir signo negativo
    const isNegative = value.startsWith("-");
    const cleanValue = value.replace("-", "");

    if (/^[01]+$/.test(cleanValue)) {
      const num = parseInt(cleanValue, 2) * (isNegative ? -1 : 1);
      setDecimal(num.toString());
      setHexadecimal(num >= 0 ? num.toString(16).toUpperCase() : `-${Math.abs(num).toString(16).toUpperCase()}`);
      setOctal(num >= 0 ? num.toString(8) : `-${Math.abs(num).toString(8)}`);
    }
  };

  // Actualizar desde hexadecimal
  const handleHexadecimalChange = (value) => {
    setHexadecimal(value);
    if (value === "" || value === "-") {
      setDecimal("");
      setBinary("");
      setOctal("");
      return;
    }

    const isNegative = value.startsWith("-");
    const cleanValue = value.replace("-", "").toUpperCase();

    if (/^[0-9A-F]+$/i.test(cleanValue)) {
      const num = parseInt(cleanValue, 16) * (isNegative ? -1 : 1);
      setDecimal(num.toString());
      setBinary(num >= 0 ? num.toString(2) : `-${Math.abs(num).toString(2)}`);
      setOctal(num >= 0 ? num.toString(8) : `-${Math.abs(num).toString(8)}`);
    }
  };

  // Actualizar desde octal
  const handleOctalChange = (value) => {
    setOctal(value);
    if (value === "" || value === "-") {
      setDecimal("");
      setBinary("");
      setHexadecimal("");
      return;
    }

    const isNegative = value.startsWith("-");
    const cleanValue = value.replace("-", "");

    if (/^[0-7]+$/.test(cleanValue)) {
      const num = parseInt(cleanValue, 8) * (isNegative ? -1 : 1);
      setDecimal(num.toString());
      setBinary(num >= 0 ? num.toString(2) : `-${Math.abs(num).toString(2)}`);
      setHexadecimal(num >= 0 ? num.toString(16).toUpperCase() : `-${Math.abs(num).toString(16).toUpperCase()}`);
    }
  };

  const handleClear = () => {
    setDecimal("");
    setBinary("");
    setHexadecimal("");
    setOctal("");
  };

  return (
    <motion.section
      ref={converterRef}
      className="number-converter"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="converter-container">
        <h2>Conversor de Números</h2>
        <p className="converter-description">
          Convierte números entre diferentes sistemas numéricos usados en Assembly
        </p>

        <div className="converter-grid">
          <div className="converter-input-group">
            <label htmlFor="decimal">
              <span className="label-icon">10</span> Decimal
            </label>
            <input
              id="decimal"
              type="text"
              value={decimal}
              onChange={(e) => handleDecimalChange(e.target.value)}
              placeholder="Ej: 255"
              className="converter-input"
            />
            <span className="input-hint">Base 10 (0-9)</span>
          </div>

          <div className="converter-input-group">
            <label htmlFor="binary">
              <span className="label-icon">2</span> Binario
            </label>
            <input
              id="binary"
              type="text"
              value={binary}
              onChange={(e) => handleBinaryChange(e.target.value)}
              placeholder="Ej: 11111111"
              className="converter-input"
            />
            <span className="input-hint">Base 2 (0-1)</span>
          </div>

          <div className="converter-input-group">
            <label htmlFor="hexadecimal">
              <span className="label-icon">16</span> Hexadecimal
            </label>
            <input
              id="hexadecimal"
              type="text"
              value={hexadecimal}
              onChange={(e) => handleHexadecimalChange(e.target.value)}
              placeholder="Ej: FF"
              className="converter-input"
            />
            <span className="input-hint">Base 16 (0-9, A-F)</span>
          </div>

          <div className="converter-input-group">
            <label htmlFor="octal">
              <span className="label-icon">8</span> Octal
            </label>
            <input
              id="octal"
              type="text"
              value={octal}
              onChange={(e) => handleOctalChange(e.target.value)}
              placeholder="Ej: 377"
              className="converter-input"
            />
            <span className="input-hint">Base 8 (0-7)</span>
          </div>
        </div>

        <button onClick={handleClear} className="clear-button">
          Limpiar
        </button>

        <div className="converter-info">
          <h3>Uso en Assembly</h3>
          <div className="info-examples">
            <div className="info-example">
              <code>mov eax, 255</code>
              <span>Decimal</span>
            </div>
            <div className="info-example">
              <code>mov eax, 0xFF</code>
              <span>Hexadecimal (0x...)</span>
            </div>
            <div className="info-example">
              <code>mov eax, 11111111b</code>
              <span>Binario (...b)</span>
            </div>
            <div className="info-example">
              <code>mov eax, 377o</code>
              <span>Octal (...o)</span>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default NumberConverter;
