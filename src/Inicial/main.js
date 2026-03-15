import "./main.css";
import { useState, useEffect } from "react";
import Agendamento from "../Agendamento/main";
import Historico from "../Historico/main";
import Chat from "../Chat/main";
import Especialistas from "../Especialistas/main";
import Header from "../Header/main";
import { getDadosIniciais } from "../Services/APIs";

export default function Main({ nomeLogado }) {
  const [pagina, setPagina] = useState("main");
  const [usuario, setUsuario] = useState(null);
  const [feedConselhos, setFeedConselhos] = useState([]);

  useEffect(() => {
    const carregarDadosDoProjeto = async () => {
      const dados = await getDadosIniciais();

      if (dados) {
        const infoUsuario = {
          ...dados.usuarioLogado,
          nome: nomeLogado || dados.usuarioLogado.nome,
        };

        setUsuario(infoUsuario);
        setFeedConselhos(dados.feedConselhos);
      }
    };
    carregarDadosDoProjeto();
  }, [nomeLogado]);

  if (pagina === "Agendamento")
    return <Agendamento onVoltar={() => setPagina("main")} />;
  if (pagina === "Historico")
    return <Historico onVoltar={() => setPagina("main")} />;
  if (pagina === "Chat") return <Chat onVoltar={() => setPagina("main")} />;
  if (pagina === "Especialistas")
    return <Especialistas onVoltar={() => setPagina("main")} />;

  if (!usuario) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Carregando plataforma MindCare...</h2>
        <p>Aguardando conexão com o banco de dados.</p>
      </div>
    );
  }

  return (
    <div className="Menu">
      <Header setPagina={setPagina} nome={usuario.nome} />

      <div className="banner">
        <h1>Ola, {usuario.nome}!</h1>
        <h2>Como podemos ajudar hoje?</h2>
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
        {feedConselhos.map((item) => (
          <div key={item.id} className="feed-item">
            <h3>{item.especialista} diz:</h3>
            <p>{item.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
