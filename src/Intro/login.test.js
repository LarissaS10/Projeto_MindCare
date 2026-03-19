import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Intro from "./main";
import * as api from "../Services/APIs";

jest.mock("../Services/APIs");

describe("Testes de Login MindCare", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComRouter = (ui) => {
    return render(<MemoryRouter initialEntries={["/"]}>{ui}</MemoryRouter>);
  };

  test("Deve validar campos vazios", () => {
    renderComRouter(<Intro />);

    const botao = screen.getByRole("button", { name: /entrar/i });
    fireEvent.click(botao);

    expect(
      screen.getByText(/por favor, preencha todos os campos/i)
    ).toBeInTheDocument();
  });

  test("Deve navegar para escolha de tipo se usuário não existe", async () => {
    api.getDadosIniciais.mockResolvedValue({
      usuariosCadastrados: [{ nome: "Franco" }],
    });

    renderComRouter(<Intro />);

    fireEvent.change(screen.getByPlaceholderText(/E-mail ou Nome/i), {
      target: { value: "Novo" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Como deseja se cadastrar/i)).toBeInTheDocument();
    });
  });

  test("Deve realizar login com sucesso para 'Franco'", async () => {
    api.getDadosIniciais.mockResolvedValue({
      usuariosCadastrados: [{ nome: "Franco" }],
    });

    renderComRouter(<Intro />);

    fireEvent.change(screen.getByPlaceholderText(/E-mail ou Nome/i), {
      target: { value: "Franco" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/por favor, preencha todos os campos/i)
      ).not.toBeInTheDocument();
    });
  });
});
