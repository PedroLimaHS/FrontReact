import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../../contextos/GlobalContext"; // Usando o GlobalContext

const PrivateRoute = ({ element }) => {
    const { usuarioLogado } = useContext(GlobalContext); // Obtendo o estado do usuário do contexto

    // Se não estiver autenticado (sem usuarioLogado), redireciona para o login
    if (!usuarioLogado || Object.keys(usuarioLogado).length === 0) {
        return <Navigate to="/" />; // Redireciona para a página de login
    }

    // Se estiver autenticado, renderiza o componente da rota protegida
    return element;
};

export default PrivateRoute;
