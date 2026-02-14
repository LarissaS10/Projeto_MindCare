import "./main.css";

export default function Chat({ onVoltar }) {
  return (
    <div className="chatPage">
      <header className="chatHeader">
        <h1>Chat</h1>
        <p>Conversa do dia</p>
      </header>

      <div className="chatMessages">
        <div className="message bot">
          <p>Olá, Franco! Como você está se sentindo hoje?</p>
        </div>

        <div className="message user">
          <p>Oi! Estou me sentindo um pouco cansado.</p>
        </div>

        <div className="message bot">
          <p>Entendo. Você conseguiu descansar bem essa semana?</p>
        </div>

        <div className="message user">
          <p>Nem tanto, tive muitos compromissos.</p>
        </div>

        <div className="message bot">
          <p>
            Obrigado por compartilhar. Lembre-se de reservar um tempo para você
            e marcar a consulta da semana.
          </p>
        </div>
      </div>

      <div className="chatFooter">
        <input type="text" placeholder="Digite sua mensagem..." disabled />
        <button disabled>Enviar</button>
      </div>

      <button className="btnVoltar" onClick={onVoltar}>
        Voltar
      </button>
    </div>
  );
}
