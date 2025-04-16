import { api } from "./api";

export async function salvarUsuario(dadosUsuario, setExibirModal) {
    await api.post("/usuarios", dadosUsuario)
        .then((resposta) => {
            if (resposta.status === 201) {
                setExibirModal(true);
            }
        })
        .catch((erro) => {
            alert("Erro ao cadastrar usuario.");
            console.error("Erro ao cadastrar usuario: ", erro);
        });
}

export async function listarUsuarios(setUsuarios) {
    await api.get("/usuarios")
        .then((resposta) => {
            if (resposta.status === 200) {
                setUsuarios(resposta.data.content);
            }
        })
        .catch((erro) => {
            alert("Erro ao listar usuarios.");
            console.error("Erro ao listar usuarios: ", erro);
        });
}

export async function obterDadosUsuario(
    id,
    setNome,
    setCpf,
    setEmail,
    setDataNascimento,
    setSenha,
    setStatus
) {
    await api.get(`/usuarios/${id}`)
        .then((resposta) => {
            if (resposta.status === 200) {
                setNome(resposta.data.nome);
                setCpf(resposta.data.cpf);
                setEmail(resposta.data.email);
                setDataNascimento(resposta.data.dataNascimento);
                setSenha(resposta.data.senha);
                setStatus(resposta.data.status);
            }
        })
        .catch((erro) => {
            alert("Erro ao obter dados do usuario.");
            console.error("Erro ao obter dados do usuario: ", erro);
        });
}

export async function atualizarUsuario(id, dadosUsuario, setExibirModal) {
    await api.put(`/usuarios/${id}`, dadosUsuario)
        .then((resposta) => {
            if (resposta.status === 200) {
                setExibirModal(true);
            }
        })
        .catch((erro) => {
            alert("Erro ao atualizar usuario.");
            console.error("Erro ao atualizar usuario: ", erro);
        });
}

export async function deletarUsuario(id, setExibirModal) {
    await api.delete(`/usuarios/${id}`)
        .then((resposta) => {
            if (resposta.status === 204) {
                setExibirModal(false);
            }
        })
        .catch((erro) => {
            alert("Erro ao deletar usuario.");
            console.error("Erro ao deletar usuario: ", erro);
        });
}
