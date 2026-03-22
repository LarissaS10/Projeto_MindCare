import "./main.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();

  const [mensagens, setMensagens] = useState([
    { id: 1, texto: "Olá! Como você está se sentindo hoje?", remetente: "bot" },
    {
      id: 2,
      texto: "Oi! Estou me sentindo um pouco cansado.",
      remetente: "user",
    },
  ]);

  const [input, setInput] = useState("");

  const enviarMensagem = () => {
    if (input.trim() === "") return;

    const novaMensagem = {
      id: Date.now(),
      texto: input,
      remetente: "user",
    };

    setMensagens([...mensagens, novaMensagem]);

    setInput("");

    setTimeout(() => {
      const respostaBot = {
        id: Date.now() + 1,
        texto:
          "Entendo. Gostaria de falar mais sobre isso ou prefere fazer um exercício de respiração?",
        remetente: "bot",
      };
      setMensagens((prev) => [...prev, respostaBot]);
    }, 1000);
  };

  return (
    <div className="chatPage">
      <header className="chatHeader">
        <h1>Chat</h1>
        <p>Conversa do dia</p>
      </header>

      <div className="chatMessages">
        {mensagens.map((msg) => (
          <div key={msg.id} className={`message ${msg.remetente}`}>
            <p>{msg.texto}</p>
          </div>
        ))}
      </div>

      <div className="chatFooter">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && enviarMensagem()}
        />
        <button onClick={enviarMensagem}>Enviar</button>
      </div>

      <button className="btnVoltar" onClick={() => navigate("/main")}>
        Voltar
      </button>
    </div>
  );
}
