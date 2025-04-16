import { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import { excluirTarefaPeloId, listarTarefas } from "../../servicos/tarefas";
import {Link, useNavigate} from "react-router-dom";
import Modal from "../../componentes/Modal";

function Tarefas() {
    const navigate = useNavigate();
    const [tarefas, setTarefas] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [tarefaParaExcluir, setTarefaParaExcluir] = useState({});

    useEffect(() => {
        listarTarefas(setTarefas);
    }, []);

    const confirmarExclusao = (id) => {
        setExibirModal(true);
        setTarefaParaExcluir(id);
    };

    const cancelarExclusao = () => {
        setExibirModal(false);
        setTarefaParaExcluir({});
    };

    const excluirTarefa = async () => {
        await excluirTarefaPeloId(tarefaParaExcluir, setExibirModal);
        setTarefas(tarefas.filter(t => t.id !== tarefaParaExcluir));
        setTarefaParaExcluir({});
    };

    return (
        <>
            <Cabecalho />
            <section className="container mt-3">
                <div className="d-flex justify-content-between">
                    <h1>Tarefas Cadastradas</h1>
                    <div>
                        <Link to="/nova-tarefa" className="btn btn-primary">
                            Nova Tarefa
                        </Link>
                    </div>
                </div>
                <table className="table table-striped mt-3">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Data de Criação</th>
                        <th>Data de Conclusão</th>
                        <th>Prioridade</th>
                        <th>Status</th>
                        <th>Projeto</th>
                        <th>Opções</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tarefas.map(tarefa => (
                        <tr key={tarefa.id}>
                            <td>{tarefa.id}</td>
                            <td>{tarefa.titulo}</td>
                            <td>{tarefa.dataCriacao}</td>
                            <td>{tarefa.dataConclusao}</td>
                            <td>{tarefa.prioridade}</td>
                            <td>{tarefa.status}</td>
                            <td>{tarefa.projeto?.nome}</td>
                            <td>
                                <div className="btn-group">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/tarefas/${tarefa.id}`)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => confirmarExclusao(tarefa.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {exibirModal && (
                    <Modal
                        titulo="Confirmação de Exclusão"
                        texto="Deseja realmente excluir esta tarefa?"
                        txtBtn1="Sim, excluir"
                        onClickBtn1={excluirTarefa}
                        txtBtn2="Cancelar"
                        onClickBtn2={cancelarExclusao}
                    />
                )}
            </section>
            <Rodape />
        </>
    );
}

export default Tarefas;
