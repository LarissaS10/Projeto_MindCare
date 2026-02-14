export const getEspecialistas = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); //essa é nossa API (Endpoint pros amigos)
    if (!response.ok) throw new Error("Erro na requisição"); //aqui começa a verificação da requisição (promises acho...)

    const dadosNomes = await response.json(); //coloquei async

    return dadosNomes.slice(0, 3); // só retorna os 3 primeiros nomes
  } catch (error) {
    console.error("Erro ao buscar especialistas:", error); // aqui o catch
    return [];
  }
};
