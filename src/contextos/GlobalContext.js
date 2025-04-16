import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState({});

    // Verifica no localStorage ou sessionStorage se o usuário já está logado
    useEffect(() => {
        // Tenta obter o usuário do localStorage ou sessionStorage
        const usuario =
            localStorage.getItem("usuarioLogado") ||
            sessionStorage.getItem("usuarioLogado");

        if (usuario) {
            setUsuarioLogado(JSON.parse(usuario)); // Atualiza o estado com os dados do usuário
        }
    }, []);

    const login = (dadosUsuario) => {
        setUsuarioLogado(dadosUsuario); // Atualiza o estado com os dados do usuário

        // Armazena os dados do usuário dependendo da opção de "manter conectado"
        if (dadosUsuario?.manterConectado) {
            localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario)); // Salva no localStorage
        } else {
            sessionStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario)); // Salva no sessionStorage
        }
    };

    const logout = () => {
        setUsuarioLogado({}); // Limpa o estado do usuário

        // Remove os dados de autenticação do armazenamento
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");
    };

    return (
        <GlobalContext.Provider value={{ usuarioLogado, login, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};
