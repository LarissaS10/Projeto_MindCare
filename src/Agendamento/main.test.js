// testes

import { render, screen, fireEvent } from "@testing-library/react";
import Agendamento from "./main";

test("renderiza a tela de agendamento com os campos do formulário", () => {
  render(<Agendamento onVoltar={() => {}} />);

  expect(screen.getByText("Agendamento de Consulta")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Nome Completo")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText("Descreva suas questões")
  ).toBeInTheDocument();
});

test("chama onVoltar ao clicar em Marcar Consulta", () => {
  const mockOnVoltar = jest.fn();

  render(<Agendamento onVoltar={mockOnVoltar} />);

  const botao = screen.getByRole("button", { name: /marcar consulta/i });

  fireEvent.click(botao);

  expect(mockOnVoltar).toHaveBeenCalledTimes(1);
});

test("botão começa desabilitado", () => {
  render(<Agendamento onVoltar={() => {}} />);

  const botao = screen.getByRole("button", { name: /marcar consulta/i });

  expect(botao).toBeDisabled();
});
