import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from 'react-router-dom';
import {GlobalProvider} from "./contextos/GlobalContext"; // Importe o BrowserRouter


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* Envolva o BrowserRouter em torno de toda a aplicação */}
        <BrowserRouter>
            {/* Agora o AuthProvider pode usar o useNavigate corretamente */}
            <GlobalProvider>
                <App />
            </GlobalProvider>
        </BrowserRouter>
    </React.StrictMode>
);
