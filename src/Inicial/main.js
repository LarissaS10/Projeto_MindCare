import "./main.css";
import { useState, useEffect } from "react";
import Agendamento from "../Agendamento/main";
import Historico from "../Historico/main";
import Chat from "../Chat/main";
import Especialistas from "../Especialistas/main";
import Header from "../Header/main";
import { getEspecialistas } from "../Services/APIs";

export default function Main() {
  const [pagina, setPagina] = useState("main");
  const [especialistasAPI, setEspecialistasAPI] = useState([]);

  const nomeLogado = "Paciente 1";

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await getEspecialistas();
      setEspecialistasAPI(dados);
    };
    carregarDados();
  }, []);

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
      <Header setPagina={setPagina} nome={nomeLogado} />

      <div className="banner">
        <h1>Ola, {nomeLogado}!</h1>
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
        {especialistasAPI.map((esp, index) => (
          <div key={esp.id} className={`feed-${index + 1}`}>
            <h3>{esp.name} diz:</h3>
            <p>Clique para ver uma dica de saúde mental!</p>
          </div>
        ))}{" "}
        {}
      </div>
    </div>
  );
}
