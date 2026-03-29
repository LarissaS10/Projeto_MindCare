import "./main.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getDadosExternos } from "../Services/APIs";

export default function Chat() {
  const navigate = useNavigate();
  const [mensagens, setMensagens] = useState([]);
  const [input, setInput] = useState("");
  const [carregando, setCarregando] = useState(true);
  const respostasBot = useRef([]);
  const indiceBot = useRef(0);

  useEffect(() => {
    const buscar = async () => {
      const dados = await getDadosExternos();
      if (dados) {
        respostasBot.current = dados.mensagens;

        const primeiraMsg = {
          remetente: "bot",
          id: dados.mensagens[0].id,
          texto: `"${dados.mensagens[0].texto}" — ${dados.mensagens[0].autor}`,
        };

        setMensagens([primeiraMsg]);
        indiceBot.current = 1;
      }
      setCarregando(false);
    };
    buscar();
  }, []);

  const enviarMensagem = () => {
    if (input.trim() === "") return;

    const novaMensagem = {
      id: Date.now(),
      texto: input,
      remetente: "user",
    };

    setMensagens((prev) => [...prev, novaMensagem]);
    setInput("");

    setTimeout(() => {
      const respostas = respostasBot.current;
      if (respostas.length === 0) return;

      const atual = respostas[indiceBot.current % respostas.length];
      indiceBot.current = (indiceBot.current + 1) % respostas.length;

      const respostaBot = {
        id: Date.now() + 1,
        texto: `"${atual.texto}" — ${atual.autor}`,
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
        {carregando ? (
          <p>Carregando mensagens...</p>
        ) : (
          mensagens.map((msg) => (
            <div key={msg.id} className={`message ${msg.remetente}`}>
              <p>{msg.texto}</p>
            </div>
          ))
        )}
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
