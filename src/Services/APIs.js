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
//consumo do json para correção do tp anterior
