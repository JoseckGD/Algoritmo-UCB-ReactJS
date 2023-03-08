import React from "react";

export const Maquina = ({ index, maquinaGanadora, Q_AVG, M_Iteraciones }) => {
  return (
    <div className="maquina">
      <div className="data">
        <p>{Q_AVG !== null ? Q_AVG[index - 1].toFixed(5) : "AVG"}</p>
        <p>
          {M_Iteraciones !== null ? M_Iteraciones[index - 1] : "Iteraciones"}
        </p>
      </div>
      <img
        src="/jugador.png"
        className={`logo ${maquinaGanadora === index && "logo-ganador"}`}
        alt="Vite logo"
      />
      <p className="numero-Maquina">{index}</p>
    </div>
  );
};
