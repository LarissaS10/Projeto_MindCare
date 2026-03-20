import "./main.css";
import { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "../Header/main";
import { getDadosIniciais } from "../Services/APIs";

export default function Main() {
  const [usuario, setUsuario] = useState(null);
  const [feedConselhos, setFeedConselhos] = useState([]);
  const location = useLocation();

  const nomeLogado =
    location.state?.nomeLogado || localStorage.getItem("nomeLogado");

  useEffect(() => {
    const carregarDadosDoProjeto = async () => {
      const dados = await getDadosIniciais();
      if (dados) {
        const usuarioBase = dados.usuarioLogado || {};
        const infoUsuario = {
          ...usuarioBase,
          nome: nomeLogado || usuarioBase.nome || "Usuário",
        };
        setUsuario(infoUsuario);
        setFeedConselhos(dados.feedConselhos || []);
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

      {/* MENU SÓ NO /main */}
      {location.pathname === "/main" && (
        <div className="opcoes">
          <NavLink to="historico" className="historico">
            Histórico
          </NavLink>
          <NavLink to="agendamento" className="agendamento">
            Agendamento
          </NavLink>
          <NavLink to="chat" className="chat">
            Chat
          </NavLink>
          <NavLink to="especialistas" className="especialistas">
            Especialistas
          </NavLink>
        </div>
      )}

      <Outlet />

      {/* Conteúdo inicial */}
      {location.pathname === "/main" && (
        <>
          <div className="banner">
            <h1>Olá, {usuario.nome}!</h1>
            <h2>Como podemos ajudar hoje?</h2>
          </div>

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
      )}
    </div>
  );
}
