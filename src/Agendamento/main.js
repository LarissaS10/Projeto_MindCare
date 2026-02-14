import React from "react";
import "./main.css";

export default function Agendamento({ onVoltar }) {
  return (
    <div className="sched-container">
      <h1 className="sched-title">Agendamento de Consulta</h1>

      <form className="sched-form">
        <input
          className="sched-input"
          type="text"
          placeholder="Nome Completo"
        />
        <input className="sched-input" type="email" placeholder="E-mail" />

        <select className="sched-select" name="profissionais">
          <option>Selecione um profissional</option>
          <option value="profissional1">Profissional 1</option>
          <option value="profissional2">Profissional 2</option>
          <option value="profissional3">Profissional 3</option>
        </select>

        <textarea
          className="sched-textarea"
          placeholder="Descreva suas questões"
        ></textarea>

        <button type="button" className="sched-btn-submit" onClick={onVoltar}>
          Marcar Consulta
        </button>
      </form>
    </div>
  );
}
