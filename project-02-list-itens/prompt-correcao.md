# Prompt de Verificação — Projeto 02: Lista de Itens

Você é um revisor de código React. Vou te enviar minha tentativa do Projeto 02 e você deve verificar se está correto comparando com os critérios abaixo.

## Código de referência

### App.jsx
```jsx
import { useState } from "react";
import { Lista } from "./components/Lista";

export function App() {
  const [itens, setItens] = useState([]);
  const [texto, setTexto] = useState("");

  const handleAdicionar = () => {
    if (!texto.trim()) return;

    const novoItem = {
      id: Date.now(),
      nome: texto,
    };

    setItens((prev) => [...prev, novoItem]);
    setTexto("");
  };

  const handleRemover = (id) => {
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

### components/Lista.jsx
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

## O que verificar no meu código

### App.jsx
- [ ] `useState` importado do react
- [ ] `Lista` importado de `./components/Lista`
- [ ] Estado `itens` iniciado como array vazio `[]`
- [ ] Estado `texto` iniciado como string vazia `""`
- [ ] `handleAdicionar` checa `texto.trim()` antes de adicionar
- [ ] `handleAdicionar` cria um objeto com `id` único e `nome`
- [ ] `handleAdicionar` usa spread `[...prev, novoItem]` — sem `.push()`
- [ ] `handleAdicionar` usa `prev` no setter
- [ ] `handleAdicionar` limpa o `texto` após adicionar
- [ ] `handleRemover` recebe um `id` como parâmetro
- [ ] `handleRemover` usa `.filter()` para remover o item
- [ ] `handleRemover` usa `prev` no setter
- [ ] Todas as props passadas pro `Lista`: `itens`, `texto`, `onTextoMudar`, `onAdicionar`, `onRemover`
- [ ] Lógica toda no `App` — nenhuma função de lógica no `Lista`

### Lista.jsx
- [ ] Recebe as 5 props: `itens`, `texto`, `onTextoMudar`, `onAdicionar`, `onRemover`
- [ ] Input tem `value={texto}` e `onChange={onTextoMudar}` — input controlado
- [ ] Botão Adicionar tem `disabled={!texto.trim()}`
- [ ] Exibe mensagem quando `itens.length === 0`
- [ ] Usa `.map()` para renderizar os itens
- [ ] Cada item do `.map()` tem `key={item.id}`
- [ ] Cada item tem botão Remover com `onClick={() => onRemover(item.id)}`
- [ ] Sem import desnecessário do `React`

## Como me dar o resultado

1. Diga se o código **passou** ou **precisa de ajustes**
2. Para cada item da checklist que estiver **errado ou faltando**, explique o problema e mostre como corrigir
3. Se tiver algo **funcionalmente diferente mas igualmente válido**, aceite e explique por que funciona — nomes de variáveis diferentes são válidos desde que sigam as convenções `handle` para funções e `on` para props
4. Se tiver algo **funcionalmente errado** mesmo que pareça certo, explique o motivo

---

**Meu código:**

[cole seu App.jsx e Lista.jsx aqui]
