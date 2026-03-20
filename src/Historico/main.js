import "./main.css";
import { useNavigate } from "react-router-dom";

export default function Historico() {
  const navigate = useNavigate();

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
        </div>

        <div className="historicoCard">
          <h3>Ontem</h3>
          <p>Humor: 😐 Neutro</p>
        </div>
      </div>

      <button className="btnVoltar" onClick={() => navigate("/main")}>
        Voltar
      </button>
    </div>
  );
}
