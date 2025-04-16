import { useEffect, useState } from "react";
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";
import { excluirProjetoPeloId, listarProjetos } from "../../servicos/projetos";
import { useNavigate } from "react-router-dom";
import Modal from "../../componentes/Modal";
import { Link } from "react-router-dom";

function Projetos() {
    const navigate = useNavigate();
    
    const [projetos, setProjetos] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [projetoParaExcluir, setProjetoParaExcluir] = useState({});

    useEffect(() => {
        listarProjetos(setProjetos);
    }, []);

    const confirmarExclusao = (id) => {
        setExibirModal(true);
        setProjetoParaExcluir(id);
    }

    const cancelarExclusao = () => {
        setExibirModal(false);
        setProjetoParaExcluir({});
    }

    const excluirProjeto = async () => {
        await excluirProjetoPeloId(projetoParaExcluir, setExibirModal);

        setProjetoParaExcluir({});
        setProjetos(projetos.filter(u => u.id !== projetoParaExcluir));
    }

    return (
        <>
            <Cabecalho />

            <section className="container mt-3" id="projetos">
                <div className="d-flex justify-content-between">
                    <h1>Projetos Cadastrados</h1>
                    <div>
                        {/* Usando Link para navegação */}
                        <Link to="/novo-projeto" className="btn btn-primary">
                            Novo Projeto
                        </Link>
                    </div>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descricao</th>
                            <th scope="col">Responsavel</th>
                            <th scope="col">Opcoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projetos?.map((projeto) => (
                                <tr key={projeto.id}>
                                    <th scope="row">{projeto.id}</th>
                                    <td>{projeto.nome}</td>
                                    <td>{projeto.descricao}</td>
                                    <td>{projeto.responsavel?.nome}</td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => navigate(`/projeto/${projeto.id}`)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => confirmarExclusao(projeto.id)}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>

            {exibirModal && (
                <Modal
                    titulo={"Confirmacao de Exclusao"}
                    texto={"Tem certeza que deseja excluir este projeto?"}
                    txtBtn1={"Sim, excluir."}
                    onClickBtn1={excluirProjeto}
                    txtBtn2={"Cancelar"}
                    onClickBtn2={cancelarExclusao}
                />
            )}

            <Rodape />
        </>
    );
}

export default Projetos;