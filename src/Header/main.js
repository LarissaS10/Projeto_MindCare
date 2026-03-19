import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main.css";
import IconeMindfulness from "../media/mindfulness_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg";
import menuBurguer from "../media/menu_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24 (2).svg";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    setMenuAberto(false);
    navigate("/");
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
            <Link
              to="/main/historico"
              className="nav-link-historico"
              onClick={() => setMenuAberto(false)}
            >
              Histórico
            </Link>
          </li>
          <li>
            <Link
              to="/main/agendamento"
              className="nav-link-agendamento"
              onClick={() => setMenuAberto(false)}
            >
              Agendamento
            </Link>
          </li>
          <li>
            <Link
              to="/main/chat"
              className="nav-link-chat"
              onClick={() => setMenuAberto(false)}
            >
              Chat
            </Link>
          </li>
          <li>
            <Link
              to="/main/especialistas"
              className="nav-link-especialistas"
              onClick={() => setMenuAberto(false)}
            >
              Especialistas
            </Link>
          </li>
          <li>
            <button className="nav-link-logout" onClick={handleLogout}>
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
