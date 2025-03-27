import React from "react";
import { FaGithub } from "react-icons/fa"; // Importamos el ícono de GitHub
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>Manual Ensamblador 2025 ©</p>
      <a href="https://github.com/Guwstavo" className="footer-link">
          <FaGithub className="footer-icon" /> Gustavo
        </a>
    </footer>
  );
}

export default Footer;