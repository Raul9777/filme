import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaStar,
  FaFilm,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";
import "./style.css";

function Filme() {
  const [filmes, setFilmes] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const chave = process.env.REACT_APP_TMDB_API_KEY;

        console.log("Chave encontrada:", chave ? "SIM" : "NÃO");

        if (!chave) {
          throw new Error(
            "A chave não foi encontrada no arquivo .env."
          );
        }

        const resposta = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: {
              api_key: chave,
              language: "pt-BR",
              page: 1,
            },
          }
        );

        console.log("Filmes recebidos:", resposta.data.results);

        setFilmes(resposta.data.results);
      } catch (error) {
        console.error("ERRO COMPLETO:", error);
        console.error("RESPOSTA DO TMDB:", error.response?.data);

        setErro(
          error.response?.data?.status_message ||
            "Não foi possível carregar os filmes."
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarFilmes();
  }, []);

  const generos = {
    28: "Ação",
    12: "Aventura",
    16: "Animação",
    35: "Comédia",
    80: "Crime",
    99: "Documentário",
    18: "Drama",
    10751: "Família",
    14: "Fantasia",
    36: "História",
    27: "Terror",
    10402: "Música",
    9648: "Mistério",
    10749: "Romance",
    878: "Ficção Científica",
    53: "Suspense",
    10752: "Guerra",
    37: "Faroeste",
  };

  const filmesFiltrados = filmes.filter((filme) =>
    filme.title.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pagina-filmes">

      <header className="cabecalho">

        <div className="logo">
          <FaFilm />

          <span>
            FILME<span className="destaque">+</span>
          </span>
        </div>

        <div className="barra-pesquisa">
          <FaSearch />

          <input
            type="text"
            placeholder="Pesquisar filme..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

      </header>

      <main className="conteudo">

        <div className="titulo-area">
          <p className="subtitulo">CATÁLOGO</p>

          <h1>Filmes populares</h1>

          <p className="descricao">
            Confira os filmes mais populares do momento.
          </p>
        </div>

        {carregando && (
          <div className="mensagem">
            <div className="spinner"></div>
            <p>Carregando filmes...</p>
          </div>
        )}

        {erro && !carregando && (
          <div className="mensagem erro">
            <FaFilm />
            <p>{erro}</p>
          </div>
        )}

        {!carregando &&
          !erro &&
          filmesFiltrados.length === 0 && (
            <div className="mensagem">
              <FaSearch />
              <p>Nenhum filme encontrado.</p>
            </div>
          )}

        {!carregando &&
          !erro &&
          filmesFiltrados.length > 0 && (
            <section className="grade-filmes">

              {filmesFiltrados.map((filme) => {

                const ano = filme.release_date
                  ? filme.release_date.substring(0, 4)
                  : "N/A";

                const generosFilme = filme.genre_ids
                  ? filme.genre_ids
                      .slice(0, 2)
                      .map((id) => generos[id])
                      .filter(Boolean)
                  : [];

                return (
                  <article
                    className="card-filme"
                    key={filme.id}
                  >

                    <div className="poster-container">

                      {filme.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                          alt={`Poster do filme ${filme.title}`}
                        />
                      ) : (
                        <div className="sem-poster">
                          <FaFilm />
                        </div>
                      )}

                      <div className="nota">
                        <FaStar />

                        {filme.vote_average
                          ? filme.vote_average.toFixed(1)
                          : "N/A"}
                      </div>

                    </div>

                    <div className="informacoes">

                      <h2>{filme.title}</h2>

                      <div className="dados">
                        <p>
                          <FaCalendarAlt />
                          {ano}
                        </p>
                      </div>

                      <div className="generos">

                        {generosFilme.map((genero) => (
                          <span key={genero}>
                            {genero}
                          </span>
                        ))}

                      </div>

                    </div>

                  </article>
                );
              })}

            </section>
          )}

      </main>

      <footer>
        Dados de filmes fornecidos pelo TMDB
      </footer>

    </div>
  );
}

export default Filme;