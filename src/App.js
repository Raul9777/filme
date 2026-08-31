import './style.css';
import Filme from './Filme';

function App() {
  return (
    <div className="App">
      <Filme
        nome="Matrix"
        ano="1999"
        genero="Ficção Científica"
        diretor="Lana Wachoski"
      />
    </div>
  );
}

export default App;