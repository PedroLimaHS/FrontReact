import { api } from "./api";

// A função agora aceita os dados de login e um callback para ações após o login
export async function loginUsuario(dadosLogin, setExibirModal) {
    try {
        // Realiza a requisição para o backend (já está com o endpoint correto "/auth/login")
        const resposta = await api.post("/auth", dadosLogin); // Observe que o endpoint é "/auth" e não "/auth/login"

        if (resposta.status === 200) {
            // Aqui você pode armazenar o token ou qualquer outro dado necessário
            localStorage.setItem('usuario', JSON.stringify(resposta.data)); // Exemplo de como salvar os dados do usuário
            console.log("Erro ao realizar login", resposta.data);

            setExibirModal(true); // Ação após o login bem-sucedido
        }
    } catch (erro) {
        // Em caso de erro, exibe uma mensagem de erro
        alert("Erro ao realizar o login.");
        console.error("Erro ao realizar login: ", erro);
    }
}

// Função para verificar se o usuário está autenticado (se necessário)
export async function verificar(setAutenticado) {
    try {
        const resposta = await api.get("/auth/verificar"); // Endpoint para verificar se o usuário está autenticado

        if (resposta.status === 200) {
            setAutenticado(true);  // Usuário está autenticado
        }
    } catch (erro) {
        setAutenticado(false); // Não autenticado
        console.error("Erro ao verificar login: ", erro);
    }
}
