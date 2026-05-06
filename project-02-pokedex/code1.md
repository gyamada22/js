# Código completo

## App.jsx

```jsx
import { useEffect, useState } from "react";
import { Card } from "./components/Card";

export function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  // roda toda vez que pokemonId mudar
  useEffect(() => {
    // função async dentro do useEffect — useEffect não pode ser async direto
    async function buscarPokemon() {
      setLoading(true);
      setErro("");
      setPokemon(null); // limpa o card anterior enquanto carrega

      try {
        const resposta = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
        );

        // a API retorna 404 quando o id não existe
        if (!resposta.ok) {
          setErro("Pokémon não encontrado.");
          return;
        }

        const dados = await resposta.json();
        setPokemon(dados);
      } catch (e) {
        // catch só pega erro de rede (sem internet, etc.)
        setErro("Erro de conexão.");
      } finally {
        // finally roda sempre — loading some em qualquer caso
        setLoading(false);
      }
    }

    buscarPokemon();
  }, [pokemonId]); // roda de novo sempre que pokemonId mudar

  const handleAnterior = () => {
    if (pokemonId > 1) setPokemonId((prev) => prev - 1);
  };

  const handleProximo = () => {
    setPokemonId((prev) => prev + 1);
  };

  return (
    <Card
      pokemon={pokemon}
      pokemonId={pokemonId}
      loading={loading}
      erro={erro}
      onAnterior={handleAnterior}
      onProximo={handleProximo}
    />
  );
}
```

## components/Card.jsx

```jsx
export function Card({ pokemon, pokemonId, loading, erro, onAnterior, onProximo }) {
  return (
    <div>
      <h1>Buscador de Pokémon</h1>
      <p>ID: {pokemonId}</p>

      <button onClick={onAnterior} disabled={pokemonId === 1}>
        ← Anterior
      </button>

      <button onClick={onProximo}>
        Próximo →
      </button>

      {loading && <p>Carregando...</p>}

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
          {/* types é um array — .map() pra renderizar cada tipo */}
          {pokemon.types.map((t) => (
            <span key={t.type.name}>{t.type.name} </span>
          ))}
        </div>
      )}
    </div>
  );
}
```
