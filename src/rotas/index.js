import { Routes, Route } from "react-router-dom";
import Login from "../paginas/Login";
import Pagina404 from "../paginas/Pagina404";
import Dashboard from "../paginas/Dashboard";
import Usuarios from "../paginas/Usuarios";
import UsuarioForm from "../paginas/Usuarios/UsuarioForm";
import Projetos from "../paginas/Projetos";
import ProjetoForm from "../paginas/Projetos/ProjetoForm";
import Tarefas from "../paginas/Tarefa";
import TarefaForm from "../paginas/Tarefa/TarefaForm";
import PrivateRoute from "../componentes/PrivateRoute/PrivateRoutes"; // Importando o PrivateRoute

function Rotas() {
    return (
        <Routes>
            {/* Rota pública de login */}
            <Route path="/" element={<Login />} />

            {/* Rota protegida: precisa estar logado para acessar */}
            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/usuarios" element={<PrivateRoute element={<Usuarios />} />} />
            <Route path="/novo-usuario" element={<PrivateRoute element={<UsuarioForm />} />} />
            <Route path="/usuario/:id" element={<PrivateRoute element={<UsuarioForm />} />} />
            <Route path="/projetos" element={<PrivateRoute element={<Projetos />} />} />
            <Route path="/novo-projeto" element={<PrivateRoute element={<ProjetoForm />} />} />
            <Route path="/projeto/:id" element={<PrivateRoute element={<ProjetoForm />} />} />
            <Route path="/tarefas" element={<PrivateRoute element={<Tarefas />} />} />
            <Route path="/nova-tarefa" element={<PrivateRoute element={<TarefaForm />} />} />
            <Route path="/tarefas/:id" element={<PrivateRoute element={<TarefaForm />} />} />

            {/* Rota de 404 */}
            <Route path="*" element={<Pagina404 />} />
        </Routes>
    );
}

export default Rotas;
