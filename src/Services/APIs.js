export const getDadosIniciais = async () => {
  try {
    const response = await fetch("/Dados.json");

    if (!response.ok) throw new Error("Não foi possível carregar o arquivo.");

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return null;
  }
};
//consumo do json para correção do tp anterior (commit da sofia está dando bug)

export const getDadosExternos = async () => {
  try {
    const [usuariosRes, ...conselhosRes] = await Promise.all([
      fetch("https://randomuser.me/api/?results=6&nat=br"),
      fetch("https://api.adviceslip.com/advice"),
      fetch("https://api.adviceslip.com/advice"),
      fetch("https://api.adviceslip.com/advice"),
    ]);

    if (!usuariosRes.ok) throw new Error("Erro ao buscar especialistas.");

    const usuariosData = await usuariosRes.json();

    const conselhosData = await Promise.all(conselhosRes.map((r) => r.json()));

    const especialidades = [
      "Psicologia Clínica",
      "Neuropsicologia",
      "Psicologia Infantil",
      "Psiquiatria",
      "Psicologia Social",
      "Terapia Cognitivo-Comportamental",
    ];

    const especialistas = usuariosData.results.map((user, index) => ({
      id: user.login.uuid,
      nome: `${user.name.first} ${user.name.last}`,
      especialidade: especialidades[index],
      email: user.email,
      foto: user.picture.medium,
    }));

    const mensagens = conselhosData.map((c) => ({
      id: c.slip.id,
      texto: c.slip.advice,
      autor: "Especialista MindCare",
    }));

    return { especialistas, mensagens };
  } catch (error) {
    console.error("Erro ao buscar dados externos:", error);
    return null;
  }
};
