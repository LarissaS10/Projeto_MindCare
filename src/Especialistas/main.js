import "./main.css";

function Card({ nome, especialidade, email }) {
  return (
    <div className="card">
      <h2 className="card-title">{nome}</h2>
      <p className="card-text">Especialidade: {especialidade}</p>
      <p className="card-text">E-mail para contato: {email}</p>
    </div>
  );
}

export default function especialistas({ onVoltar }) {
  const especialistas = [
    {
      nome: "Profissional 1",
      especialidade: "Psicologia Social",
      email: "prof1psico@gmail.com",
    },
    {
      nome: "Profissional 1",
      especialidade: "Neuropsicologia",
      email: "prof1psico@gmail.com",
    },
    {
      nome: "Profissional 1",
      especialidade: "Psicologia Infantil",
      email: "prof1psico@gmail.com",
    },
  ];

  return (
    <div className="especialista">
      {especialistas.map((esp, index) => (
        <Card
          key={index}
          nome={esp.nome}
          especialidade={esp.especialidade}
          email={esp.email}
        />
      ))}
      <button className="btnVoltar" onClick={onVoltar}>
        Voltar
      </button>
    </div>
  );
}
