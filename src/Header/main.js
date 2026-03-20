import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./main.css";
import IconeMindfulness from "../media/mindfulness_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import menuBurguer from "../media/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 (2).svg";

const Header = ({ nome }) => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={IconeMindfulness} alt="Mindfulness Logo" className="logo" />
        <span className="user-name">Olá, {nome}</span>
      </div>

      <button className="menu-toggle" onClick={toggleMenu}>
        <img src={menuBurguer} alt="Abrir menu" />
      </button>

      <nav className={`nav-menu ${menuAberto ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/main/historico"
              className="nav-link-historico"
              onClick={() => setMenuAberto(false)}
            >
              Histórico
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/main/agendamento"
              className="nav-link-agendamento"
              onClick={() => setMenuAberto(false)}
            >
              Agendamento
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/main/chat"
              className="nav-link-chat"
              onClick={() => setMenuAberto(false)}
            >
              Chat
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/main/especialistas"
              className="nav-link-especialistas"
              onClick={() => setMenuAberto(false)}
            >
              Especialistas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link-logout"
              onClick={() => setMenuAberto(false)}
            >
              Sair
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
