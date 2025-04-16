import { useEffect, useState } from 'react';
import Cabecalho from '../../componentes/Cabecalho';
import Rodape from '../../componentes/Rodape';
import { deletarUsuario, listarUsuarios } from '../../servicos/usuarios';
import {Link, useNavigate} from 'react-router-dom';
import Modal from '../../componentes/Modal';

function Usuarios() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [exibirModal, setExibirModal] = useState(false);
    const [idUsuarioParaExcluir, setIdUsuarioParaExcluir] = useState();

    useEffect(() => {
        listarUsuarios(setUsuarios);
    }, []);

    const confirmarExclusao = (id) => {
        setIdUsuarioParaExcluir(id);
        setExibirModal(true);
    }

    const cancelarExclusao = () => {
        setIdUsuarioParaExcluir();
        setExibirModal(false);
    }

    const excluirUsuario = async () => {
        await deletarUsuario(idUsuarioParaExcluir, setExibirModal);

        // Atualiza o estado "usuarios" sem recarregar a pagina (UX).
        await listarUsuarios(setUsuarios);
    }

    return (
        <>
            <Cabecalho />

            <section className="container my-3" id="usuarios">
                <div className='d-flex justify-content-between'>
                    <h1>Usuarios Cadastrados</h1>
                   <div>
                        {/* Usando Link para navegação */}
                        <Link to="/novo-usuario" className="btn btn-primary">
                            Novo Usuario
                        </Link>
                   </div>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nome</th>
                            <th scope="col">CPF</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Idade</th>
                            <th scope="col">Status</th>
                            <th scope="col">Opcoes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <th scope="row">{usuario.id}</th>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.cpf}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.idade}</td>
                                    <td>{usuario.status}</td>
                                    <td>
                                        <div className="btn-group" role="group">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={() => navigate(`/usuario/${usuario.id}`)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => confirmarExclusao(usuario.id)}
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
                    texto={"Tem certeza que deseja excluir este usuario?"}
                    txtBtn1={"Sim, excluir."}
                    onClickBtn1={excluirUsuario}
                    txtBtn2={"Cancelar"}
                    onClickBtn2={cancelarExclusao}
                />
            )}

            <Rodape />
        </>
    )
}

export default Usuarios;