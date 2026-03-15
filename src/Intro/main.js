import { useState } from "react";
import "./main.css";
import imgInicial from "../media/heart_minus_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import Main from "../Inicial/main";
import { getDadosIniciais } from "../Services/APIs";

export default function Intro() {
  const [pagina, setPagina] = useState("login");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

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
        setPagina("main");
      } else {
        setErro("");
        setPagina("escolha_tipo");
      }
    } else {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  if (pagina === "main") {
    return <Main nomeLogado={usuario} />;
  }

  if (pagina === "escolha_tipo") {
    return (
      <div className="app">
        <img src={imgInicial} alt="Logo" className="iconInicial" />
        <h1>Bem-vindo ao MindCare</h1>
        <p>Usuário não encontrado. Como deseja se cadastrar?</p>

        <div className="opcoes-cadastro">
          <button onClick={() => setPagina("main")}>Sou Paciente</button>
          <button onClick={() => setPagina("main")}>Sou Terapeuta</button>
        </div>
        <br />
        <button onClick={() => setPagina("login")} className="botao-voltar">
          Voltar
        </button>
      </div>
    );
  }

  return (
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

      {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}

      <button onClick={lidarComLogin} style={{ marginTop: "10px" }}>
        Entrar
      </button>
    </div>
  );
}
