import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Intro from "./main";
import * as api from "../Services/APIs";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
}));

// Mock da API
jest.mock("../Services/APIs");

describe("Testes de Login Simplificados", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve validar campos vazios", () => {
    render(<Intro />);

    const botao = screen.getByRole("button", { name: /entrar/i });
    fireEvent.click(botao);

    expect(
      screen.getByText(/por favor, preencha todos os campos/i)
    ).toBeInTheDocument();
  });

  test("Deve permitir preencher os campos de login", () => {
    render(<Intro />);

    const nomeInput = screen.getByPlaceholderText(/E-mail ou Nome/i);
    const senhaInput = screen.getByPlaceholderText(/Senha/i);

    fireEvent.change(nomeInput, { target: { value: "Franco" } });
    fireEvent.change(senhaInput, { target: { value: "123" } });

    expect(nomeInput.value).toBe("Franco");
    expect(senhaInput.value).toBe("123");
  });

  test("Deve tentar realizar o login ao clicar no botão", async () => {
    api.getDadosIniciais.mockResolvedValue({
      usuariosCadastrados: [{ nome: "Franco" }],
    });

    render(<Intro />);

    fireEvent.change(screen.getByPlaceholderText(/E-mail ou Nome/i), {
      target: { value: "Franco" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Senha/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(api.getDadosIniciais).toHaveBeenCalled();
    });
  });
});
