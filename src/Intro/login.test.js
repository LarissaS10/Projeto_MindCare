import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Intro from "./main";
import * as APIs from "../Services/APIs";

jest.mock("../Services/APIs", () => ({
  getDadosIniciais: jest.fn(),
}));

jest.mock(
  "../media/heart_minus_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg",
  () => "mocked-svg"
);

const renderIntro = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Intro />
    </MemoryRouter>
  );

const dadosMock = {
  usuariosCadastrados: [{ nome: "joao" }, { nome: "maria" }],
};

describe("Intro – tela de login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("renderização inicial", () => {
    it("exibe o título MindCare e o subtítulo", () => {
      renderIntro();
      expect(screen.getByText("MindCare")).toBeInTheDocument();
      expect(
        screen.getByText("Um passo de cada vez, todos os dias")
      ).toBeInTheDocument();
    });

    it("exibe os campos de e-mail/nome e senha", () => {
      renderIntro();
      expect(screen.getByPlaceholderText("E-mail ou Nome")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    });

    it("exibe o botão Entrar", () => {
      renderIntro();
      expect(
        screen.getByRole("button", { name: /entrar/i })
      ).toBeInTheDocument();
    });

    it("não exibe mensagem de erro no carregamento", () => {
      renderIntro();
      expect(
        screen.queryByText("Por favor, preencha todos os campos!")
      ).toBeNull();
    });
  });

  describe("validação de campos obrigatórios", () => {
    it("exibe erro quando ambos os campos estão vazios", async () => {
      renderIntro();
      fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

      expect(
        await screen.findByText("Por favor, preencha todos os campos!")
      ).toBeInTheDocument();
      expect(APIs.getDadosIniciais).not.toHaveBeenCalled();
    });

    it("exibe erro quando apenas o nome está preenchido", async () => {
      renderIntro();
      fireEvent.change(screen.getByPlaceholderText("E-mail ou Nome"), {
        target: { value: "joao" },
      });
      fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

      expect(
        await screen.findByText("Por favor, preencha todos os campos!")
      ).toBeInTheDocument();
    });

    it("exibe erro quando apenas a senha está preenchida", async () => {
      renderIntro();
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "123" },
      });
      fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

      expect(
        await screen.findByText("Por favor, preencha todos os campos!")
      ).toBeInTheDocument();
    });
  });

  describe("login – usuário já cadastrado", () => {
    it("salva o nome no localStorage e redireciona para /main", async () => {
      APIs.getDadosIniciais.mockResolvedValue(dadosMock);
      renderIntro();

      fireEvent.change(screen.getByPlaceholderText("E-mail ou Nome"), {
        target: { value: "joao" },
      });
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "qualquersenha" },
      });
      fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

      await waitFor(() => {
        expect(localStorage.getItem("nomeLogado")).toBe("joao");
      });
    });

    it("a busca pelo nome é case-insensitive", async () => {
      APIs.getDadosIniciais.mockResolvedValue(dadosMock);
      renderIntro();

      fireEvent.change(screen.getByPlaceholderText("E-mail ou Nome"), {
        target: { value: "MARIA" },
      });
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "senha123" },
      });
      fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

      await waitFor(() => {
        expect(localStorage.getItem("nomeLogado")).toBe("MARIA");
      });
    });
  });

  describe("login – usuário não cadastrado", () => {
    it("não salva nada no localStorage quando o usuário não existe", async () => {
      APIs.getDadosIniciais.mockResolvedValue(dadosMock);
      renderIntro();

      fireEvent.change(screen.getByPlaceholderText("E-mail ou Nome"), {
        target: { value: "desconhecido" },
      });
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "senha" },
      });
      fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

      await waitFor(() => {
        expect(localStorage.getItem("nomeLogado")).toBeNull();
      });
    });
  });

  describe("erro de conexão com o servidor", () => {
    it("exibe mensagem de erro quando a API retorna null", async () => {
      APIs.getDadosIniciais.mockResolvedValue(null);
      renderIntro();

      fireEvent.change(screen.getByPlaceholderText("E-mail ou Nome"), {
        target: { value: "joao" },
      });
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "senha" },
      });
      fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

      expect(
        await screen.findByText("Erro ao conectar com o servidor.")
      ).toBeInTheDocument();
    });

    it("exibe mensagem de erro quando a API retorna objeto sem usuariosCadastrados", async () => {
      APIs.getDadosIniciais.mockResolvedValue({});
      renderIntro();

      fireEvent.change(screen.getByPlaceholderText("E-mail ou Nome"), {
        target: { value: "joao" },
      });
      fireEvent.change(screen.getByPlaceholderText("Senha"), {
        target: { value: "senha" },
      });
      fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

      expect(
        await screen.findByText("Erro ao conectar com o servidor.")
      ).toBeInTheDocument();
    });
  });
});
