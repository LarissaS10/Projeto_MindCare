import React, { useState } from "react";
import "./main.css";
import IconeMindfulness from "../media/mindfulness_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import menuBurguer from "../media/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 (2).svg";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={IconeMindfulness} alt="Mindfulness Logo" className="logo" />
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        <img src={menuBurguer} alt="Abrir menu" />
      </button>

      <nav className={`nav-menu ${menuAberto ? "active" : ""}`}>
        <ul>
          <li>
            <a
              href="#historico"
              className="nav-link-historico"
              onClick={() => setMenuAberto(false)}
            >
              Histórico
            </a>
          </li>
          <li>
            <a
              href="#agendamento"
              className="nav-link-agendamento"
              onClick={() => setMenuAberto(false)}
            >
              Agendamento
            </a>
          </li>
          <li>
            <a
              href="#chat"
              className="nav-link-chat"
              onClick={() => setMenuAberto(false)}
            >
              Chat
            </a>
          </li>
          <li>
            <a
              href="#especialistas"
              className="nav-link-especialistas"
              onClick={() => setMenuAberto(false)}
            >
              Especialistas
            </a>
          </li>
          <li>
            <a
              href="#logout"
              className="nav-link-logout"
              onClick={() => setMenuAberto(false)}
            >
              Sair
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
