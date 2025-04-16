import { useContext } from "react";
import logo from "../../assets/sgp_logo_horizontal.png";
import { GlobalContext } from "../../contextos/GlobalContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Use o Link do React Router

function Cabecalho() {
    const { logout } = useContext(GlobalContext);
    const navigate = useNavigate();

    const fazerLogout = () => {
        logout(); // Chama o logout no contexto
        navigate("/"); // Redireciona para a tela de login
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menu-lateral"
                    aria-controls="menu-lateral"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menu-lateral">
                    <a className="navbar-brand">
                        <img src={logo} alt="Sistema de Gestão de Projetos" width="200px" />
                    </a>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/usuarios">Usuarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/projetos">Projetos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tarefas">Tarefas</Link>
                        </li>
                    </ul>
                    <button className="btn btn-primary" onClick={fazerLogout}>
                        Sair
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Cabecalho;
