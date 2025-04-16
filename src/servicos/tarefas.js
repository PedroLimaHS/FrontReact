import { api } from "./api";

export async function salvarTarefa(dadosTarefa, setExibirModal) {
    await api.post('/tarefas', dadosTarefa)
        .then((resposta) => {
            if (resposta.status === 201) {
                setExibirModal(true);
            }
        })
        .catch((erro) => {
            alert("Erro ao cadastrar tarefa.");
            console.error("Erro ao cadastro tarefa: ", erro);
        });
}

export async function atualizarTarefa(id, dadosTarefa, setExibirModal) {
    console.log(dadosTarefa);
    await api.put(`/tarefas/${id}`, dadosTarefa)
        .then((resposta) => {
            if (resposta.status === 200) {
                setExibirModal(true);
            }
        })
        .catch((erro) => {
            alert("Erro ao atualizar tarefa.");
            console.error("Erro ao atualizar tarefa: ", erro);
        });
}

export async function listarTarefas(setTarefas) {
    await api.get('/tarefas')
        .then((resposta) => {
            if (resposta.status === 200) {
                setTarefas(resposta.data.content)
            }
        })
        .catch((erro) => {
            alert("Erro ao listar tarefas.");
            console.error("Erro ao listar tarefas: ", erro);
        });
}

export async function obterTarefaPeloId(
    id,
    setTitulo,
    setDataCriacao,
    setDataConclusao,
    setUsuarioId,
    setPrioridade,
    setStatus,
    setProjetoId,
    setDescricao

) {
    await api.get(`/tarefas/${id}`)
        .then((resposta) => {
            if (resposta.status === 200) {
                setTitulo(resposta.data.titulo);
                setDataCriacao(resposta.data.dataCriacao);
                setDataConclusao(resposta.data.dataConclusao);
                setUsuarioId(resposta.data.usuario?.id);
                setPrioridade(resposta.data.prioridade);
                setStatus(resposta.data.status);
                setProjetoId(resposta.data.projeto?.id);
                setDescricao(resposta.data.descricao);
            }
        })
        .catch((erro) => {
            alert("Erro ao obter tarefa.");
            console.error("Erro ao obter tarefa: ", erro);
        });
}

export async function excluirTarefaPeloId(id, setExibirModal) {
    await api.delete(`/tarefas/${id}`)
        .then((resposta) => {
            if (resposta.status === 204) {
                setExibirModal(false);
            }
        })
        .catch((erro) => {
            alert("Erro ao excluir tarefa.");
            console.error("Erro ao excluir tarefa: ", erro);
        });
}