import { api } from "./api"; // Importando a instância do axios

// Função para obter os dados do Dashboard (projetos, tarefas e usuários)
export async function getDashboardData() {
    try {
        // Realizando as requisições para os endpoints da API
        const projetosResponse = await api.get("/projetos"); // Endpoint para obter os projetos
        const tarefasResponse = await api.get("/tarefas"); // Endpoint para obter as tarefas
        const usuariosResponse = await api.get("/usuarios"); // Endpoint para obter os usuários

        // Verifica se todas as respostas têm sucesso
        if (projetosResponse.status === 200 && tarefasResponse.status === 200 && usuariosResponse.status === 200) {
            return {
                projetos: projetosResponse.data.content, // Aqui retornamos o objeto completo (com 'content')
                tarefas: tarefasResponse.data.content,
                usuarios: usuariosResponse.data.content,
            };
        } else {
            throw new Error("Erro ao buscar dados do Dashboard");
        }
    } catch (error) {
        console.error("Erro ao buscar dados do Dashboard:", error);
        throw error; // Lança o erro para ser tratado no componente
    }
}
