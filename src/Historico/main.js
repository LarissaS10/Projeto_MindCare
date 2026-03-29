import "./main.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDadosExternos } from "../Services/APIs";

const humores = ["😊 Bem", "😐 Neutro", "😟 Ansioso", "😴 Cansado", "😁 Ótimo"];
const periodos = [
  "Hoje",
  "Ontem",
  "2 dias atrás",
  "3 dias atrás",
  "Semana passada",
];

export default function Historico() {
  const navigate = useNavigate();
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscar = async () => {
      const dados = await getDadosExternos();
      if (dados) {
        const historico = dados.mensagens.map((m, index) => ({
          id: m.id,
          periodo: periodos[index] || `${index + 1} dias atrás`,
          humor: humores[index % humores.length],
          nota: m.texto,
        }));
        setRegistros(historico);
      }
      setCarregando(false);
    };
    buscar();
  }, []);

  return (
    <div className="historicoPage">
      <header className="historicoHeader">
        <h1>Histórico</h1>
        <p>Seus registros recentes</p>
      </header>

      <div className="historicoList">
        {carregando ? (
          <p>Carregando histórico...</p>
        ) : (
          registros.map((r) => (
            <div key={r.id} className="historicoCard">
              <h3>{r.periodo}</h3>
              <p>Humor: {r.humor}</p>
              <small>Nota: "{r.nota}"</small>
            </div>
          ))
        )}
      </div>

      <button className="btnVoltar" onClick={() => navigate("/main")}>
        Voltar
      </button>
    </div>
  );
}
