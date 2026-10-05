import React from "react";
import "./style.css";

function Filme() {
  return (
    <div className="filme card">
      <div className="filme-poster" aria-hidden="true">
        <div className="poster-gradient">MATRIX</div>
      </div>

      <div className="filme-info">
        <h1>Matrix</h1>
        <p className="descricao">Um hacker descobre a natureza da realidade e lidera a resistência contra máquinas.</p>

        <ul className="detalhes">
          <li><span>Nome</span><strong>Matrix</strong></li>
          <li><span>Ano</span><strong>1999</strong></li>
          <li><span>Gênero</span><strong>Ficção Científica</strong></li>
          <li><span>Diretor</span><strong>Lana Wachowski</strong></li>
        </ul>

        <div className="acoes">
          <button className="btn primary">Assistir</button>
          <button className="btn ghost">Mais informações</button>
        </div>
      </div>
    </div>
  );
}

export default Filme;