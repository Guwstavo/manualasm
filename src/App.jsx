//PANTALLA PRINCIPAL
import React from 'react'
import './App.css'
import CirculoLogo from './components/CirculoLogo'
import FootBar from './components/Footer'
import MostrarCodigo from './components/MostrarCodigo'
import codes from './data/Codes'

function App() {

  const codigo1 = codes.find(code => code.name === "hola.asm");

  return (
    <div>
    <CirculoLogo />
    <MostrarCodigo 
          name={codigo1.name} 
          description={codigo1.description} 
          code={codigo1.code} 
    />
    <MostrarCodigo />
    <MostrarCodigo />
    <MostrarCodigo />
    <FootBar />
    <p></p>
    </div>
  )
}

export default App
