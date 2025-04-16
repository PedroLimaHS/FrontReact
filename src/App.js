import './App.css';
import { GlobalProvider } from './contextos/GlobalContext';
import Rotas from './rotas';

function App() {
  return (
    <GlobalProvider>
      <Rotas />
    </GlobalProvider>
  );
}

export default App;
