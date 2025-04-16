import { api } from "./api";

export async function salvarProjeto(dadosProjeto, setExibirModal) {
    await api.post('/projetos', dadosProjeto)
        .then((resposta) => {
            if (resposta.status === 201) {
                setExibirModal(true);
            }
        })
        .catch((erro) => {
            alert("Erro ao cadastrar projeto.");
            console.error("Erro ao cadastro projeto: ", erro);
        });
}

export async function atualizarProjeto(id, dadosProjeto, setExibirModal) {
    await api.put(`/projetos/${id}`, dadosProjeto)
        .then((resposta) => {
            if (resposta.status === 200) {
                setExibirModal(true);
            }
        })
        .catch((erro) => {
            alert("Erro ao atualizar projeto.");
            console.error("Erro ao atualizar projeto: ", erro);
        });
}

export async function listarProjetos(setProjetos) {
    await api.get('/projetos')
        .then((resposta) => {
            if (resposta.status === 200) {
                setProjetos(resposta.data.content);
            }
        })
        .catch((erro) => {
            alert("Erro ao listar projetos.");
            console.error("Erro ao listar projetos: ", erro);
        });
}

export async function obterProjetoPeloId(
    id,
    setNome,
    setDescricao,
    setResponsavelId, 
    setTarefas
) {
    await api.get(`/projetos/${id}`)
        .then((resposta) => {
            if (resposta.status === 200) {
                console.log(resposta.data)
                setNome(resposta.data.nome);
                setDescricao(resposta.data.descricao);
                setResponsavelId(resposta.data.responsavel?.id);
                setTarefas(resposta.data.tarefas);
            }
        })
        .catch((erro) => {
            alert("Erro ao obter projeto.");
            console.error("Erro ao obter projeto: ", erro);
        });
}

export async function excluirProjetoPeloId(id, setExibirModal) {
    await api.delete(`/projetos/${id}`)
        .then((resposta) => {
            if (resposta.status === 204) {
                setExibirModal(false);
            }
        })
        .catch((erro) => {
            alert("Erro ao excluir projeto.");
            console.error("Erro ao excluir projeto: ", erro);
        });
}