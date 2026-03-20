import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./main.css";
import imgInicial from "../media/heart_minus_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import Main from "../Inicial/main";
import Agendamento from "../Agendamento/main";
import Historico from "../Historico/main";
import Chat from "../Chat/main";
import Especialistas from "../Especialistas/main";
import { getDadosIniciais } from "../Services/APIs";

export default function Intro() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [redirect, setRedirect] = useState(null);

  const lidarComLogin = async () => {
    if (usuario.trim() === "" || senha.trim() === "") {
      setErro("Por favor, preencha todos os campos!");
      return;
    }

    const dados = await getDadosIniciais();
    if (dados && dados.usuariosCadastrados) {
      const usuarioEncontrado = dados.usuariosCadastrados.find(
        (u) => u.nome.toLowerCase() === usuario.toLowerCase()
      );
      if (usuarioEncontrado) {
        setErro("");
        localStorage.setItem("nomeLogado", usuario);
        setRedirect({ to: "/main" });
      } else {
        setErro("");
        setRedirect({ to: "/escolha_tipo" });
      }
    } else {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  // limpa redirect depois de navegar
  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => setRedirect(null), 100);
      return () => clearTimeout(timer);
    }
  }, [redirect]);

  return (
    <>
      {redirect && <Navigate to={redirect.to} replace />}

      <Routes>
        <Route
          index
          element={
            <div className="app">
              <img src={imgInicial} alt="Logo" className="iconInicial" />
              <h1>MindCare</h1>
              <p>Um passo de cada vez, todos os dias</p>
              <h2>Faça seu login</h2>

              <div>
                <input
                  type="email"
                  placeholder="E-mail ou Nome"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>

              {erro && (
                <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>
              )}

              <button onClick={lidarComLogin} style={{ marginTop: "10px" }}>
                Entrar
              </button>
            </div>
          }
        />

        <Route path="escolha_tipo" element={<div>Cadastro...</div>} />

        <Route path="main" element={<Main />}>
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="historico" element={<Historico />} />
          <Route path="chat" element={<Chat />} />
          <Route path="especialistas" element={<Especialistas />} />
        </Route>
      </Routes>
    </>
  );
}
