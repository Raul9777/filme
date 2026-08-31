function Filme({ nome, ano, genero, diretor }) {
  return (
    <div className="filme">
      <h1>{nome}</h1>

      <p>
        <strong>Nome:</strong> {nome}
      </p>

      <p>
        <strong>Ano:</strong> {ano}
      </p>

      <p>
        <strong>Gênero:</strong> {genero}
      </p>

      <p>
        <strong>Diretor:</strong> {diretor}
      </p>
    </div>
  );
}

export default Filme;