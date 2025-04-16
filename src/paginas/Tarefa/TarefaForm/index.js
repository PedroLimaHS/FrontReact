import { useEffect, useState } from "react";
import Cabecalho from "../../../componentes/Cabecalho";
import Rodape from "../../../componentes/Rodape";
import Modal from "../../../componentes/Modal";
import {Link, useNavigate, useParams} from "react-router-dom";
import {
    atualizarTarefa,
    obterTarefaPeloId,
    salvarTarefa
} from "../../../servicos/tarefas";
import { listarUsuarios } from "../../../servicos/usuarios";
import { listarProjetos } from "../../../servicos/projetos";
import {formatarData} from "../../../utils/data";

function TarefaForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataCriacao, setDataCriacao] = useState("");
    const [dataConclusao, setDataConclusao] = useState("");
    const [prioridade, setPrioridade] = useState("BAIXA");
    const [status, setStatus] = useState("PENDENTE");
    const [responsavelId, setResponsavelId] = useState("");
    const [projetoId, setProjetoId] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [projetos, setProjetos] = useState([]);
    const [exibirModalSalvar, setExibirModalSalvar] = useState(false);

    useEffect(() => {
        if (id) {
            obterTarefaPeloId(
                id,
                setTitulo,
                setDataCriacao,
                setDataConclusao,
                setResponsavelId,
                setPrioridade,
                setStatus,
                setProjetoId,
                setDescricao
            );
        }
        listarUsuarios(setUsuarios);
        listarProjetos(setProjetos);
    }, [id]);

    const enviarFormulario = async (e) => {
        e.preventDefault();

        const payload = {
            titulo,
            dataCriacao:formatarData(dataCriacao),
            dataConclusao :formatarData(dataConclusao),
            prioridade,
            status,
            usuario: {
                id: responsavelId
            },
            projeto: {
                id: projetoId
            },
            descricao
        };

        if (id) {
            await atualizarTarefa(id, payload, setExibirModalSalvar);
        } else {
            await salvarTarefa(payload, setExibirModalSalvar);
        }
    };

    const cancelar = () => navigate("/tarefas");

    const confirmarCadastro = () => {
        setExibirModalSalvar(false);
        navigate("/tarefas");
    };

    return (
        <>
            <Cabecalho />
            <section className="container mt-3">
                <div className="d-flex justify-content-between">
                    <h1>{id ? "Editar Tarefa" : "Nova Tarefa"}</h1>

                    <div>
                        <Link to="/tarefas" className="btn btn-primary">
                            Voltar
                        </Link>
                    </div>
                </div>


                <form className="row g-3" onSubmit={enviarFormulario}>
                    <div className="col-md-6">
                        <label className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Data Criação</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dataCriacao}
                            onChange={(e) => setDataCriacao(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Data Conclusão</label>
                        <input
                            type="date"
                            className="form-control"
                            value={dataConclusao}
                            onChange={(e) => setDataConclusao(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Prioridade</label>
                        <select
                            className="form-select"
                            value={prioridade}
                            onChange={(e) => setPrioridade(e.target.value)}
                        >
                            <option value="BAIXA">Baixa</option>
                            <option value="MEDIA">Média</option>
                            <option value="ALTA">Alta</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="PENDENTE">Pendente</option>
                            <option value="FAZENDO">Em andamento</option>
                            <option value="FINALIZADA">Concluída</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Responsável</label>
                        <select
                            className="form-select"
                            value={responsavelId}
                            onChange={(e) => setResponsavelId(e.target.value)}
                            required
                        >
                            <option value="">Selecione um usuário</option>
                            {usuarios.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Projeto</label>
                        <select
                            className="form-select"
                            value={projetoId}
                            onChange={(e) => setProjetoId(e.target.value)}
                            required
                        >
                            <option value="">Selecione um projeto</option>
                            {projetos.map(proj => (
                                <option key={proj.id} value={proj.id}>
                                    {proj.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-success">Salvar</button>
                        <button type="button" className="btn btn-outline-secondary ms-2" onClick={cancelar}>Cancelar</button>
                    </div>
                </form>

                {exibirModalSalvar && (
                    <Modal
                        titulo={"Confirmacao de Cadastro"}
                        texto={`Tarefa ${id ? "atualizada" : "cadastrada"} com sucesso!`}
                        txtBtn1="OK"
                        onClickBtn1={confirmarCadastro}
                    />
                )}
            </section>
            <Rodape />
        </>
    );
}

export default TarefaForm;
