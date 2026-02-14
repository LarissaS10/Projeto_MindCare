import { useState } from "react";
import "./main.css";
import Main from "../Inicial/main";

export default function Historico({ onVoltar }) {
  const [pagina, setPagina] = useState("historico");

  if (pagina === "main") {
    return <Main />;
  }

  return (
    <div className="historicoPage">
      <header className="historicoHeader">
        <h1>Histórico</h1>
        <p>Seus registros recentes</p>
      </header>

      <div className="historicoList">
        <div className="historicoCard">
          <h3>Hoje</h3>
          <p>Humor: 😊 Bem</p>
          <small>Nota: “Dia tranquilo, consegui me organizar.”</small>
        </div>

        <div className="historicoCard">
          <h3>Ontem</h3>
          <p>Humor: 😐 Neutro</p>
          <small>Nota: “Fiquei cansado, mas deu tudo certo.”</small>
        </div>

        <div className="historicoCard">
          <h3>Semana passada</h3>
          <p>Humor: 😟 Ansioso</p>
          <small>Nota: “Muitas tarefas. Preciso descansar mais.”</small>
        </div>
      </div>

      <button type="button" className="btnVoltar" onClick={onVoltar}>
        Voltar
      </button>
    </div>
  );
}
