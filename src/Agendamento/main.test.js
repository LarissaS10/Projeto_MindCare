// testes Larissa

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Agendamento from "./main";

// teste de renderização (verifica se a tela e elementos aparecem)
test("renderiza a tela de agendamento", () => {
  render(
    <MemoryRouter>
      <Agendamento />
    </MemoryRouter>
  );

  expect(screen.getByText("Agendamento de Consulta")).toBeInTheDocument();
});

// teste de interação (simula ação do usuário com clique no botão)
test("mostra erro ao clicar sem preencher", () => {
  render(
    <MemoryRouter>
      <Agendamento />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Marcar Consulta"));

  expect(
    screen.getByText("Por favor, preencha todos os campos.")
  ).toBeInTheDocument();
});

// teste de estado inicial (verifica como a tela inicia)
test("campos começam vazios", () => {
  render(
    <MemoryRouter>
      <Agendamento />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText("Nome Completo").value).toBe("");
  expect(screen.getByPlaceholderText("E-mail").value).toBe("");
  expect(screen.getByPlaceholderText("Descreva suas questões").value).toBe("");
});
