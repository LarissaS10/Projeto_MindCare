import "./main.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Agendamento from "../Agendamento/main";
import Historico from "../Historico/main";
import Chat from "../Chat/main";
import Especialistas from "../Especialistas/main";
import Header from "../Header/main";
import { getDadosIniciais } from "../Services/APIs";

export default function Main() {
  const [usuario, setUsuario] = useState(null);
  const [feedConselhos, setFeedConselhos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const nomeLogado = location.state?.nomeLogado;

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
      <Header nome={usuario.nome} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="banner">
                <h1>Olá, {usuario.nome}!</h1>
                <h2>Como podemos ajudar hoje?</h2>
              </div>

              <div className="opcoes">
                <button
                  onClick={() => navigate("/main/historico")}
                  className="historico"
                >
                  Histórico
                </button>
                <button
                  onClick={() => navigate("/main/agendamento")}
                  className="agendamentos"
                >
                  Agendamento
                </button>
                <button onClick={() => navigate("/main/chat")} className="chat">
                  Chat
                </button>
                <button
                  onClick={() => navigate("/main/especialistas")}
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
            </>
          }
        />

        <Route path="/main/agendamento" element={<Agendamento />} />
        <Route path="/main/historico" element={<Historico />} />
        <Route path="/main/chat" element={<Chat />} />
        <Route path="/main/especialistas" element={<Especialistas />} />
      </Routes>
    </div>
  );
}
