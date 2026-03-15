import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Intro from "../Intro/main";

describe("Teste de Integração - Login MindCare", () => {
  test("Deve impedir a entrada se os campos estiverem vazios", () => {
    render(<Intro />);

    const botao = screen.getByRole("button", { name: /entrar/i });
    fireEvent.click(botao);

    expect(
      screen.getByText(/por favor, preencha todos os campos/i)
    ).toBeInTheDocument();
  });

  test("Deve permitir a entrada se o usuário 'Franco' existir no JSON", async () => {
    render(<Intro />);

    const nomeInput = screen.getByPlaceholderText(/E-mail ou Nome/i);
    const senhaInput = screen.getByPlaceholderText(/Senha/i);
    const botao = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(nomeInput, { target: { value: "Franco" } });
    fireEvent.change(senhaInput, { target: { value: "123" } });
    fireEvent.click(botao);

    await waitFor(() => {
      expect(
        screen.queryByText(/por favor, preencha todos os campos/i)
      ).not.toBeInTheDocument();
      expect(screen.getByText(/Ola, Franco!/i)).toBeInTheDocument();
    });
  });

  test("Deve mostrar opção de cadastro se o usuário não for encontrado", async () => {
    render(<Intro />);

    const nomeInput = screen.getByPlaceholderText(/E-mail ou Nome/i);
    const senhaInput = screen.getByPlaceholderText(/Senha/i);
    const botao = screen.getByRole("button", { name: /entrar/i });

    fireEvent.change(nomeInput, { target: { value: "UsuarioNovo" } });
    fireEvent.change(senhaInput, { target: { value: "999" } });
    fireEvent.click(botao);

    await waitFor(() => {
      expect(screen.getByText(/Como deseja se cadastrar/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sou paciente/i })
      ).toBeInTheDocument();
    });
  });
});
