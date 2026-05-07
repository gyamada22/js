# Prompt de Verificação — Projeto 01: Contador com Limites e localStorage

Você é um revisor de código React. Vou te enviar minha tentativa do Projeto 01 e você deve verificar se está correto comparando com os critérios abaixo.

## Código de referência

### App.jsx
```jsx
import { useEffect, useState } from "react";
import { Botao } from "./components/Botao";

export function App() {
  const min = 0;
  const max = 10;
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const salvo = localStorage.getItem("contador");
    if (salvo !== null) {
      setContador(Number(salvo));
    }
  }, []);

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

### components/Botao.jsx
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

## O que verificar no meu código

### App.jsx
- [ ] `useState` e `useEffect` importados do react
- [ ] `Botao` importado de `./components/Botao`
- [ ] `min` e `max` definidos como `0` e `10`
- [ ] Estado `contador` iniciado em `0` com `useState`
- [ ] Primeiro `useEffect` com array `[]` vazio — roda só na montagem
- [ ] Primeiro `useEffect` usa `localStorage.getItem("contador")`
- [ ] Primeiro `useEffect` checa `salvo !== null` antes de setar
- [ ] Primeiro `useEffect` converte com `Number(salvo)` antes de setar
- [ ] Segundo `useEffect` com `[contador]` na dependência — roda quando contador muda
- [ ] Segundo `useEffect` usa `localStorage.setItem("contador", contador)`
- [ ] `handleIncrementar` usa `prev` e tem condição `contador < max`
- [ ] `handleDecrementar` usa `prev` e tem condição `contador > min` (não `>=`)
- [ ] `handleZerar` seta o contador para `0`
- [ ] Todas as props passadas pro `Botao`: `contador`, `min`, `max`, `onIncrementar`, `onDecrementar`, `onZerar`
- [ ] Lógica toda no `App` — nenhuma função de lógica no `Botao`

### Botao.jsx
- [ ] Recebe as 6 props: `contador`, `min`, `max`, `onIncrementar`, `onDecrementar`, `onZerar`
- [ ] Exibe o valor atual na tela
- [ ] Botão Adicionar tem `disabled={contador === max}`
- [ ] Botão Diminuir tem `disabled={contador === min}`
- [ ] Botão Zerar tem `disabled={contador === 0}`
- [ ] Mensagem de limite máximo com `{contador === max && <p>...</p>}`
- [ ] Mensagem de limite mínimo com `{contador === min && <p>...</p>}`
- [ ] Sem import desnecessário do `React`

## Como me dar o resultado

1. Diga se o código **passou** ou **precisa de ajustes**
2. Para cada item da checklist que estiver **errado ou faltando**, explique o problema e mostre como corrigir
3. Se tiver algo **funcionalmente diferente mas igualmente válido**, aceite e explique por que funciona — nomes de variáveis diferentes são válidos desde que sigam as convenções `handle` para funções e `on` para props
4. Se tiver algo **funcionalmente errado** mesmo que pareça certo, explique o motivo

---

**Meu código:**

[cole seu App.jsx e Botao.jsx aqui]
