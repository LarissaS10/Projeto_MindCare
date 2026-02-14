import "./main.css";
import { useState } from "react";
import Agendamento from "../Agendamento/main";
import Historico from "../Historico/main";
import Chat from "../Chat/main";
import Especialistas from "../Especialistas/main";
import Header from "../Header/main";

export default function Main() {
  const [pagina, setPagina] = useState("main");

  const nome = "Franco";
  const nomeEspecialista1 = "Larissa";
  const nomeEspecialista2 = "Sofia";
  const nomeEspecialista3 = "Tiago";

  if (pagina === "Agendamento") {
    return <Agendamento onVoltar={() => setPagina("main")} />;
  }

  if (pagina === "Historico") {
    return <Historico onVoltar={() => setPagina("main")} />;
  }

  if (pagina === "Chat") {
    return <Chat onVoltar={() => setPagina("main")} />;
  }

  if (pagina === "Especialistas") {
    return <Especialistas onVoltar={() => setPagina("main")} />;
  }

  return (
    <div className="Menu">
      <Header setPagina={setPagina} nome={nome} />
      <div className="banner">
        <h1>Ola, {nome}!</h1>
        <h2>Como podemos ajudar?</h2>
      </div>
      <div className="opcoes">
        <button onClick={() => setPagina("Historico")} className="historico">
          Histórico
        </button>

        <button
          onClick={() => setPagina("Agendamento")}
          className="agendamentos"
        >
          Agendamento
        </button>
        <button onClick={() => setPagina("Chat")} className="chat">
          Chat
        </button>
        <button
          onClick={() => setPagina("Especialistas")}
          className="especialistas"
        >
          Especialistas
        </button>
      </div>
      <br />
      <h2>Conselhos dos Especialistas</h2>
      <div className="feed">
        <div className="feed-1">
          <h3>{nomeEspecialista1} diz:</h3>
          <p>Beber água ajuda mais com a memória do que você imagina!</p>
        </div>
        <div className="feed-2">
          <h3>{nomeEspecialista2} diz:</h3>
          <p>Conselho Semanal: Leia pelo menos duas páginas de um livro.</p>
        </div>
        <div className="feed-3">
          <h3>{nomeEspecialista3} diz:</h3>
          <p>Caminhar 30 min no parque tem benefícios para o corpo e mente</p>
        </div>
      </div>
    </div>
  );
}
