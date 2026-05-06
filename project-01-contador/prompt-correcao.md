# Prompt de Verificação — Projeto 01: Contador com Limites

Você é um revisor de código React. Vou te enviar minha tentativa do Projeto 01 e você deve verificar se está correto comparando com os critérios abaixo.

## Código de referência

### App.jsx
```jsx
import { useState } from "react";
import { Botao } from "./components/Botao";

export function App() {
  const [contador, setContador] = useState(0);
  const min = 0;
  const max = 10;

  const handleInc = () => {
    if (contador < max) {
      setContador((prev) => prev + 1);
    }
  };
  const handleDec = () => {
    if (contador > min) {
      setContador((prev) => prev - 1);
    }
  };
  const handleZero = () => {
    setContador(0);
  };

  return (
    <Botao
      valor={contador}
      Inc={handleInc}
      Dec={handleDec}
      Zero={handleZero}
      min={min}
      max={max}
    />
  );
}
```

### Botao.jsx
```jsx
export function Botao({ valor, Inc, Dec, Zero, min, max }) {
  return (
    <>
      <h1>Contador</h1>
      <p>Valor atual é: {valor}</p>
      <button onClick={Inc} disabled={valor === max}> Adicionar</button>
      <button onClick={Dec} disabled={valor === min}> Diminuir</button>
      <button onClick={Zero} disabled={valor === 0}> Zerar</button>
      {valor === max && <p>Limite máximo atingido</p>}
      {valor === min && <p>Limite minimo atingido</p>}
    </>
  );
}
```

## O que verificar no meu código

### App.jsx
- [ ] `useState` importado do react
- [ ] `Botao` importado de `./components/Botao`
- [ ] Estado `contador` iniciado em `0` com `useState`
- [ ] `min` e `max` definidos como `0` e `10`
- [ ] `handleInc` usa `prev` e tem condição `contador < max`
- [ ] `handleDec` usa `prev` e tem condição `contador > min` (não `>=`)
- [ ] `handleZero` seta o contador para `0`
- [ ] Todas as props passadas pro `Botao`: `valor`, `Inc`, `Dec`, `Zero`, `min`, `max`
- [ ] Lógica toda no `App` — nenhuma função de lógica no `Botao`

### Botao.jsx
- [ ] Recebe as 6 props: `valor`, `Inc`, `Dec`, `Zero`, `min`, `max`
- [ ] Exibe o valor atual na tela
- [ ] Botão Adicionar tem `disabled={valor === max}`
- [ ] Botão Diminuir tem `disabled={valor === min}`
- [ ] Botão Zerar tem `disabled={valor === 0}`
- [ ] Mensagem de limite máximo com `{valor === max && <p>...</p>}`
- [ ] Mensagem de limite mínimo com `{valor === min && <p>...</p>}`
- [ ] Sem import desnecessário do `React`

## Como me dar o resultado

1. Diga se o código **passou** ou **precisa de ajustes**
2. Para cada item da checklist que estiver **errado ou faltando**, explique o problema e mostre como corrigir
3. Se tiver algo **funcionalmente diferente mas igualmente válido**, aceite e explique por que funciona
4. Se tiver algo **funcionalmente errado** mesmo que pareça certo, explique o motivo

---

**Meu código:**

[cole seu App.jsx e Botao.jsx aqui]
