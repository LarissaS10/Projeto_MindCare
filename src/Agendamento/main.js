import React, { useState } from "react";
import "./main.css";

export default function Agendamento({ onVoltar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [profissional, setProfissional] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = () => {
    if (!nome || !email || !profissional || !descricao) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setErro("");
    onVoltar();
  };

  return (
    <div className="sched-container">
      <h1 className="sched-title">Agendamento de Consulta</h1>

      <form className="sched-form">
        <input
          className="sched-input"
          type="text"
          placeholder="Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          className="sched-input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <select
          className="sched-select"
          value={profissional}
          onChange={(e) => setProfissional(e.target.value)}
        >
          <option value="">Selecione um profissional</option>
          <option value="profissional1">Profissional 1</option>
          <option value="profissional2">Profissional 2</option>
          <option value="profissional3">Profissional 3</option>
        </select>

        <textarea
          className="sched-textarea"
          placeholder="Descreva suas questões"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>

        {erro && <p className="erro-msg">{erro}</p>}

        <button
          type="button"
          className="sched-btn-submit"
          onClick={handleSubmit}
        >
          Marcar Consulta
        </button>
      </form>
    </div>
  );
}
