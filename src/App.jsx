import { useEffect, useState } from "react";
import "./App.css";
import { Maquina } from "./components/Maquina";

function App() {
  //Numero de maquinas
  const [maquinas, setMaquinas] = useState(10);
  //Numero de iteraciones
  const [iteraciones, setIteraciones] = useState(20000);

  //Numero de la Maquina Ganadora
  const [maquinaGanadora, setMaquinaGanadora] = useState(null);
  //Arreglo Q promedio de recompensas
  const [Q_AVG, setQ_AVG] = useState(null);
  //Arreglo que tiene el numero de Iteraciones de cada Maquina
  const [M_Iteraciones, setM_Iteraciones] = useState(null);

  const Calcular = () => {
    //Contador del número de veces que se ha tirado de un brazo de una Maquina
    let count = [maquinas];
    //Suma de las recompensas de cada Maquina
    let sum_rewards = [maquinas];
    //Promedio de recompensas de cada Maquina
    let Q_average_reward = [maquinas];
    //límite superior de confianza de cada Maquina
    let ucb = [maquinas];

    //Limite superior
    let upper_bound = 0;

    //Inicializar todos los valores de los arreglos con 0
    for (let i = 0; i < maquinas; i++) {
      count[i] = 0;
      sum_rewards[i] = 0;
      Q_average_reward[i] = 0;
      ucb[i] = 0;
    }

    //Se juega una vez en cada máquina
    for (let i = 0; i < maquinas; i++) {
      //Se actualiza el contador del número de veces que se ha juagdo la Maquina
      count[i]++;
      //Se actualiza la suma de recompensas de la Maquina
      //La recompensa se obtiene de un numero aleaotorio entre 1 y 0, se redondea a 3 decimales
      sum_rewards[i] += Math.round(Math.random() * 100) / 100;
      //Promedio de recompensas de cada Maquina
      //Se divide la suma de recompensas entre el numero de veces que se ha jugado la maquina
      Q_average_reward[i] = sum_rewards[i] / count[i];
    }

    for (let i = 0; i < iteraciones; i++) {
      for (let j = 0; j < maquinas; j++) {
        //Calcular el limite superior
        upper_bound = Math.sqrt((2 * Math.log(i + 1)) / count[j]);
        //Se actualiza el límite superior de confianza de cada Maquina
        //UCB = Promedio de recompensas + limite superior
        ucb[j] = Q_average_reward[j] + upper_bound;
      }

      //Selecciona la Maquina que tenga el máximo limite superior de confianza:
      //indexOf() se obtiene el index del valor
      //Math.max() se obtiene el numero mayor del arreglo
      let mayorUCB = ucb.indexOf(Math.max(...ucb));
      //Se actualiza el contador del número de veces que se ha juagdo la Maquina seleccionada anteriormente
      count[mayorUCB]++;
      //Se actualiza la suma de recompensas de la Maquina seleccionada anteriormente
      //La recompensa se obtiene de un numero aleaotorio entre 1 y 0, se redondea a 3 decimales
      sum_rewards[mayorUCB] += Math.round(Math.random() * 100) / 100;
      //Promedio de recompensas de la Maquina seleccionada anteriormente
      //Se divide la suma de recompensas entre el numero de veces que se ha jugado la maquina en especifico
      Q_average_reward[mayorUCB] = sum_rewards[mayorUCB] / count[mayorUCB];
    }

    //Se obtiene el numero de la Maquina que tuvo el mayor promedio de recompensas
    let mayorQ = Q_average_reward.indexOf(Math.max(...Q_average_reward));

    //Actualizar las variables de estado para mostrar en la vista
    setMaquinaGanadora(mayorQ + 1);
    setQ_AVG(Q_average_reward);
    setM_Iteraciones(count);
  };

  const handleInputMaquinasChange = (event) => {
    setMaquinaGanadora(null);
    setQ_AVG(null);
    setM_Iteraciones(null);

    event.target.value.length === 0
      ? setMaquinas("")
      : setMaquinas(parseInt(event.target.value));
  };

  const handleInputIteracionesChange = (event) => {
    setMaquinaGanadora(null);
    setQ_AVG(null);
    setM_Iteraciones(null);

    event.target.value.length === 0
      ? setIteraciones("")
      : setIteraciones(parseInt(event.target.value));
  };

  return (
    <>
      <nav>
        <h1>The Upper Confidence Bound Algorithm</h1>

        {/* <div className="ejemplo">
          <div className="maquina">
            <div className="data">
              <p>Promedio de recompensas de la Maquina</p>
              <p>Numero de iteraciones</p>
            </div>
            <img
              src="/jugador.png"
              className={`logo logo-prueba`}
              alt="Vite logo"
            />
            <p className="numero-Maquina">Numero de la Maquina</p>
          </div>
        </div> */}

        <div className="barra">
          <div className="card">
            <label htmlFor="Iteraciones">Iteraciones</label>
            <input
              type="text"
              id="Iteraciones"
              placeholder="Iteraciones"
              onChange={handleInputIteracionesChange}
              value={iteraciones}
            />
          </div>

          <div className="card">
            <label htmlFor="Maquinas">Maquinas</label>
            <input
              type="text"
              id="Maquinas"
              placeholder="Maquinas"
              onChange={handleInputMaquinasChange}
              value={maquinas}
              maxLength="2"
            />
          </div>

          <div className="card">
            <button type="button" onClick={() => Calcular()}>
              Calcular
            </button>
          </div>
        </div>
      </nav>
      <div className="">
        <div className="maquinas">
          {/* 
          Array.from()
            { length: maquinas }
              crea un nuevo arreglo con el tamaño de maquinas

            (_, i) => ()
              es una función de mapeo que se ejecutará en cada elemento del arreglo. 
              es una función de flecha con dos parámetros: 
                el primer parámetro es el valor del elemento (que en este caso no se utiliza y se representa con "_"
                el segundo parámetro es el índice del elemento en el arreglo "i"
              
              por cada elemento del arreglo se creara una Maquina
          */}
          {Array.from({ length: maquinas }, (_, i) => (
            <Maquina
              key={i}
              index={i + 1}
              Q_AVG={Q_AVG}
              M_Iteraciones={M_Iteraciones}
              maquinaGanadora={maquinaGanadora}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
