# Projeto 01 — Contador com Limites e localStorage

## App.jsx

```jsx
import { useEffect, useState } from "react";
import { Botao } from "./components/Botao";

export function App() {
  const min = 0;
  const max = 10;
  const [contador, setContador] = useState(0);

  // recupera o valor salvo ao montar o componente
  useEffect(() => {
    const salvo = localStorage.getItem("contador");
    if (salvo !== null) {
      setContador(Number(salvo));
    }
  }, []);

  // salva o valor toda vez que o contador mudar
  useEffect(() => {
    localStorage.setItem("contador", contador);
  }, [contador]);

  const handleIncrementar = () => {
    if (contador < max) {
      setContador((prev) => prev + 1);
    }
  };

  const handleDecrementar = () => {
    if (contador > min) {
      setContador((prev) => prev - 1);
    }
  };

  const handleZerar = () => {
    setContador(0);
  };

  return (
    <Botao
      contador={contador}
      min={min}
      max={max}
      onIncrementar={handleIncrementar}
      onDecrementar={handleDecrementar}
      onZerar={handleZerar}
    />
  );
}
```

## components/Botao.jsx

```jsx
export function Botao({ contador, min, max, onIncrementar, onDecrementar, onZerar }) {
  return (
    <>
      <h1>Contador</h1>
      <p>Valor atual: {contador}</p>

      <button onClick={onIncrementar} disabled={contador === max}>
        Adicionar
      </button>

      <button onClick={onDecrementar} disabled={contador === min}>
        Diminuir
      </button>

      <button onClick={onZerar} disabled={contador === 0}>
        Zerar
      </button>

      {contador === max && <p>Limite máximo atingido</p>}
      {contador === min && <p>Limite mínimo atingido</p>}
    </>
  );
}
```

## Convenções usadas

- `contador` — nome do estado, descreve o que guarda
- `handleIncrementar` / `handleDecrementar` / `handleZerar` — prefixo `handle` para funções que respondem a eventos
- `onIncrementar` / `onDecrementar` / `onZerar` — prefixo `on` para props que recebem funções (padrão do React)
