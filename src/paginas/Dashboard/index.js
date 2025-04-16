import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getDashboardData } from "../../servicos/Dashboard"; // Importando a função do serviço
import Cabecalho from "../../componentes/Cabecalho";
import Rodape from "../../componentes/Rodape";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [projetos, setProjetos] = useState([]);
    const [tarefas, setTarefas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true); // Controle de carregamento
    const [error, setError] = useState(null); // Para capturar erros

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { projetos, tarefas, usuarios } = await getDashboardData();

                // Agora 'projetos' já é o array retornado da API, sem a necessidade de acessar 'content'
                if (Array.isArray(projetos)) {
                    setProjetos(projetos); // Agora estamos definindo 'projetos' diretamente como um array
                } else {
                    console.error("A resposta de projetos não é um array:", projetos);
                    setProjetos([]); // Caso não seja um array, setar um array vazio
                }

                setTarefas(tarefas);
                setUsuarios(usuarios);
                setLoading(false); // Finaliza o carregamento
            } catch (error) {
                setError("Erro ao carregar dados do Dashboard");
                setLoading(false); // Finaliza o carregamento mesmo com erro
            }
        };

        fetchData();
    }, []);

    // Verifica se os dados estão carregando
    if (loading) {
        return <div>Carregando...</div>;
    }

    // Verifica se ocorreu erro ao carregar os dados
    if (error) {
        return <div>{error}</div>;
    }

    // Labels for the charts
    const labels = projetos.map((projeto) => projeto.nome);

    const optionsVerticalBar = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Status das Tarefas por Projeto',
            },
        },
        maintainAspectRatio: false,
    };

    const optionsHorizontalBar = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Prioridade das Tarefas por Projeto',
            },
        },
        maintainAspectRatio: false,
    };

    const dataVerticalBar = {
        labels,
        datasets: [
            {
                label: 'PENDENTE',
                data: projetos.map((projeto) =>
                    tarefas.filter((tarefa) => tarefa.status === 'PENDENTE' && tarefa.projeto.id === projeto.id).length
                ),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'FAZENDO',
                data: projetos.map((projeto) =>
                    tarefas.filter((tarefa) => tarefa.status === 'FAZENDO' && tarefa.projeto.id === projeto.id).length
                ),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'FINALIZADA',
                data: projetos.map((projeto) =>
                    tarefas.filter((tarefa) => tarefa.status === 'FINALIZADA' && tarefa.projeto.id === projeto.id).length
                ),
                backgroundColor: 'rgba(53, 235, 90, 0.5)',
            },
        ],
    };

    const dataHorizontalBar = {
        labels,
        datasets: [
            {
                label: 'ALTA',
                data: projetos.map((projeto) =>
                    tarefas.filter((tarefa) => tarefa.prioridade === 'ALTA' && tarefa.projeto.id === projeto.id).length
                ),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'MEDIA',
                data: projetos.map((projeto) =>
                    tarefas.filter((tarefa) => tarefa.prioridade === 'MEDIA' && tarefa.projeto.id === projeto.id).length
                ),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'BAIXA',
                data: projetos.map((projeto) =>
                    tarefas.filter((tarefa) => tarefa.prioridade === 'BAIXA' && tarefa.projeto.id === projeto.id).length
                ),
                backgroundColor: 'rgba(53, 235, 90, 0.5)',
            },
        ],
    };

    const dataPieChart = {
        labels: ['ATIVO', 'INATIVO'],
        datasets: [
            {
                label: 'No. Usuarios',
                data: [
                    usuarios.filter((usuario) => usuario.status === 'ATIVO').length,
                    usuarios.filter((usuario) => usuario.status === 'INATIVO').length,
                ],
                backgroundColor: [
                    'rgba(17, 255, 0, 0.2)',
                    'rgba(255, 0, 0, 0.2)',
                ],
            },
        ],
    };

    return (
        <>
            <Cabecalho />
            <section className="container">
                <div className="d-flex justify-content-center">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <Bar
                                options={optionsVerticalBar}
                                data={dataVerticalBar}
                                width={850}
                                height={350}
                            />
                        </div>
                        <div className="col-md-6 col-12">
                            <Bar
                                options={optionsHorizontalBar}
                                data={dataHorizontalBar}
                                width={850}
                                height={350}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-conten-center">
                    <div className="col-md-6 col-12">
                        <Pie
                            data={dataPieChart}
                            options={{ maintainAspectRatio: false }}
                            width={250}
                            height={250}
                        />
                    </div>
                </div>
            </section>
            <Rodape />
        </>
    );
}

export default Dashboard;
