import { useContext, useState } from "react";
import logo from "../../assets/sgp_logo_vertical.png";
import './login.css';
import { GlobalContext } from "../../contextos/GlobalContext"; // Usando o GlobalContext
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../../servicos/login";

function Login() {
    const { login } = useContext(GlobalContext); // Usando o GlobalContext para gerenciar o login

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [manterConectado, setManterConectado] = useState(false);
    const [erro, setErro] = useState("");

    const fazerLogin = async (e) => {
        e.preventDefault();
        setErro(""); // Reseta o erro antes de tentar o login

        // Dados do usuário para login
        const dadosLogin = { email, senha, manterConectado };

        try {
            // Chama o serviço de login
            await loginUsuario(dadosLogin, (modal) => {
                if (modal) {
                    // Atualiza o estado de autenticação no GlobalContext
                    login(dadosLogin); // Passa os dados para o GlobalContext
                    navigate("/dashboard");
                }
            });
        } catch (error) {
            // Se ocorrer um erro no login, exibe a mensagem
            setErro("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <div className="bg-container">
            <div className="login-container">
                <div className="d-flex justify-content-center">
                    <img src={logo} alt="Sistema de Gerenciamento de Projetos" width={"200px"} />
                </div>
                <form className="container" onSubmit={fazerLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">Nunca compartilhe suas credenciais.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="manterConectado"
                            checked={manterConectado}
                            onChange={() => setManterConectado(!manterConectado)}
                        />
                        <label className="form-check-label" htmlFor="manterConectado">Mantenha-me conectado</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Acessar</button>

                    {erro && <div className="alert alert-danger mt-3">{erro}</div>}
                </form>
            </div>
        </div>
    );
}

export default Login;
