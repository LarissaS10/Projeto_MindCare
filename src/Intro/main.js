import { useState } from "react";
import "./main.css";
import imgInicial from "../media/heart_minus_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import Main from "../Inicial/main";

export default function App() {
  const [pagina, setPagina] = useState("login");
  const [usuario, setUsuario] = useState("");

  if (pagina === "main") {
    return <Main nomeLogado={usuario} />;
  }

  return (
    <div className="app">
      <img src={imgInicial} alt="Logo" className="iconInicial" />
      <h1>MindCare</h1>
      <p>Um passo de cada vez, todos os dias</p>
      <h2>Faça seu login</h2>

      <div>
        <input
          type="email"
          placeholder="E-mail ou Nome"
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input type="password" placeholder="Senha" />
      </div>
      <button onClick={() => setPagina("main")}>Entrar</button>
    </div>
  );
}
