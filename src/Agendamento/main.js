import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

export default function Agendamento({ onVoltar }) {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [profissional, setProfissional] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");

  const formularioValido = nome && email && profissional && descricao;

  const handleSubmit = () => {
    if (!formularioValido) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setErro("");

    if (onVoltar) {
      onVoltar(); // usado nos testes
    } else {
      navigate("/main"); // usado na aplicação real
    }
  };

  return (
    <div>
      <h1>Agendamento de Consulta</h1>

      <form>
        <input
          type="text"
          placeholder="Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          value={profissional}
          onChange={(e) => setProfissional(e.target.value)}
        >
          <option value="">Selecione um profissional</option>
          <option value="profissional1">Profissional 1</option>
          <option value="profissional2">Profissional 2</option>
          <option value="profissional3">Profissional 3</option>
        </select>

        <textarea
          placeholder="Descreva suas questões"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>

        {erro && <p className="erro-msg">{erro}</p>}

        <button type="button" onClick={handleSubmit}>
          Marcar Consulta
        </button>
        <button type="button" onClick={() => navigate("/main")}>
          Voltar
        </button>
      </form>
    </div>
  );
}
