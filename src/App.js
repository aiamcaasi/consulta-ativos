import BuscarAtivos from "./components/BuscarAtivos";
import AtivosMonitorados from "./components/AtivosMonitorados";
import Grafico from "./components/Grafico";
import logoInoa from "./assets/logoinoa.png";

function App() {
  return (
    <div>
      <header>
        <img src={logoInoa} alt="Inoa Logo" />
      </header>
      <main>
        <section>
        <BuscarAtivos />
        <AtivosMonitorados/>
        </section>
        <section>
          <Grafico/>
        </section>
      </main>
    </div>
  );
}

export default App;
