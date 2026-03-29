import "./main.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDadosExternos } from "../Services/APIs";

function Card({ nome, especialidade, email, foto }) {
  return (
    <div className="card">
      <img
        src={foto}
        alt={nome}
        style={{ borderRadius: "50%", width: "80px", height: "80px" }}
      />
      <h2 className="card-title">{nome}</h2>
      <p className="card-text">Especialidade: {especialidade}</p>
      <p className="card-text">E-mail: {email}</p>
    </div>
  );
}

export default function Especialistas() {
  const navigate = useNavigate();
  const [especialistas, setEspecialistas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      const dados = await getDadosExternos();
      if (dados) setEspecialistas(dados.especialistas);
      setCarregando(false);
    };
    buscar();
  }, []);

  return (
    <div className="especialista">
      {carregando ? (
        <p>Carregando especialistas...</p>
      ) : (
        especialistas.map((esp) => (
          <Card
            key={esp.id}
            nome={esp.nome}
            especialidade={esp.especialidade}
            email={esp.email}
            foto={esp.foto}
          />
        ))
      )}

      <button className="btnVoltar" onClick={() => navigate("/main")}>
        Voltar
      </button>
    </div>
  );
}
