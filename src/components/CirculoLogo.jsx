import React from 'react'
import logo from '../images/logoblanco.png'
import '../styles/circulologo.css'
import { Link } from "react-router-dom";

function  CirculoLogo() {
  return (
    <Link to="/">
    <div className="circulologo">
      <img src={logo} alt="asmlogo" />
    </div>
    </Link>


  )
}

export default CirculoLogo
