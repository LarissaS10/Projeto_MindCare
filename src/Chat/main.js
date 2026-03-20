import "./main.css";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();

  return (
    <div className="chatPage">
      <header className="chatHeader">
        <h1>Chat</h1>
        <p>Conversa do dia</p>
      </header>

      <div className="chatMessages">
        <div className="message bot">
          <p>Olá, Sofia! Como você está se sentindo hoje?</p>
        </div>

        <div className="message user">
          <p>Oi! Estou me sentindo um pouco cansado.</p>
        </div>
      </div>

      <div className="chatFooter">
        <input type="text" placeholder="Digite sua mensagem..." disabled />
        <button disabled>Enviar</button>
      </div>

      <button className="btnVoltar" onClick={() => navigate("/main")}>
        Voltar
      </button>
    </div>
  );
}
