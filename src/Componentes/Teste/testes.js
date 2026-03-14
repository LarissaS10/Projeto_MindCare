import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

describe("Testes de Login (UF01.1)", () => {
  test("Deve exibir erro ao tentar entrar com campos vazios", () => {
    render(<Login onLogin={() => {}} />);

    const botao = screen.getByRole("button", { name: /entrar/i });
    fireEvent.click(botao);

    expect(screen.getByText(/campos obrigatórios/i)).toBeInTheDocument();
  });

  test("Deve chamar onLogin quando e-mail e senha estão preenchidos", () => {
    const mockLogin = jest.fn();
    render(<Login onLogin={mockLogin} />);

    const emailInput = screen.getByPlaceholderText(/E-mail ou Nome/i);
    const senhaInput = screen.getByPlaceholderText(/senha/i);
    const botao = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: "Franco" } });
    fireEvent.change(senhaInput, { target: { value: "123456" } });
    fireEvent.click(botao);

    expect(mockLogin).toHaveBeenCalledWith("Franco");
  });
});
