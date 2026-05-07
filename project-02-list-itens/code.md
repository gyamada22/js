# Projeto 02 — Lista de Itens

## App.jsx

```jsx
import { useState } from "react";
import { Lista } from "./components/Lista";

export function App() {
  const [itens, setItens] = useState([]);
  const [texto, setTexto] = useState("");

  const handleAdicionar = () => {
    // .trim() remove espaços do início e fim — evita adicionar " "
    if (!texto.trim()) return;

    const novoItem = {
      id: Date.now(), // id único baseado no timestamp
      nome: texto,
    };

    // nunca usar .push() — sempre criar um novo array com spread
    setItens((prev) => [...prev, novoItem]);
    setTexto(""); // limpa o campo após adicionar
  };

  const handleRemover = (id) => {
    // .filter() retorna um novo array sem o item com esse id
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Lista
      itens={itens}
      texto={texto}
      onTextoMudar={(e) => setTexto(e.target.value)}
      onAdicionar={handleAdicionar}
      onRemover={handleRemover}
    />
  );
}
```

## components/Lista.jsx

```jsx
export function Lista({ itens, texto, onTextoMudar, onAdicionar, onRemover }) {
  return (
    <>
      <h1>Lista de Itens</h1>

      <input
        type="text"
        value={texto}
        onChange={onTextoMudar}
        placeholder="Digite um item..."
      />

      <button onClick={onAdicionar} disabled={!texto.trim()}>
        Adicionar
      </button>

      {itens.length === 0 && <p>Nenhum item na lista</p>}

      <ul>
        {itens.map((item) => (
          <li key={item.id}>
            {item.nome}
            <button onClick={() => onRemover(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  );
}
```

## Convenções usadas

- `itens` — estado com array, nome no plural
- `texto` — estado do input controlado
- `handleAdicionar` / `handleRemover` — prefixo `handle` para funções que respondem a eventos
- `onTextoMudar` / `onAdicionar` / `onRemover` — prefixo `on` para props que recebem funções
