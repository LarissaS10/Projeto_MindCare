import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = () => {
    if (!email || !senha) {
      setErro("Campos obrigatórios!");
      return;
    }
    onLogin(email);
  };

  return (
    <div className="app">
      <h2>Faça seu login</h2>
      <div>
        <input
          type="email"
          placeholder="E-mail ou Nome"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <button onClick={handleSubmit}>Entrar</button>
    </div>
  );
}
