import "./main.css";
import { useNavigate } from "react-router-dom";

function Card({ nome, especialidade, email }) {
  return (
    <div className="card">
      <h2 className="card-title">{nome}</h2>
      <p className="card-text">Especialidade: {especialidade}</p>
      <p className="card-text">E-mail: {email}</p>
    </div>
  );
}

export default function Especialistas() {
  const navigate = useNavigate();

  const especialistas = [
    {
      nome: "Profissional 1",
      especialidade: "Psicologia Social",
      email: "prof1@gmail.com",
    },
    {
      nome: "Profissional 2",
      especialidade: "Neuropsicologia",
      email: "prof2@gmail.com",
    },
  ];

  return (
    <div className="especialista">
      {especialistas.map((esp, index) => (
        <Card key={index} {...esp} />
      ))}

      <button className="btnVoltar" onClick={() => navigate("/main")}>
        Voltar
      </button>
    </div>
  );
}
