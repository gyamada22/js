# Projeto 02 — Buscador de Pokémon

## O que a aplicação precisa fazer

- Exibir nome, imagem e tipo de um Pokémon buscado pela API
- Ter 2 botões: **Anterior** e **Próximo** para navegar entre Pokémons pelo ID
- O botão Anterior fica desabilitado quando o ID for `1`
- Exibir *"Carregando..."* enquanto a requisição estiver em andamento
- Exibir uma mensagem de erro caso a API falhe ou o Pokémon não seja encontrado
- Limpar o card anterior enquanto o novo está carregando

## Restrições

- Estado e lógica ficam no `App.jsx`
- O `Card.jsx` só recebe props e renderiza — sem lógica própria
- O `useEffect` não pode ser `async` diretamente — declarar a função async dentro dele
- Usar três estados separados para controlar a UI: `pokemon`, `loading` e `erro`
- O `useEffect` deve reagir à mudança do `pokemonId`

## Conceitos que você vai usar

`useState` · `useEffect` · `fetch` · `async/await` · `try/catch/finally` · `props` · renderização condicional · `.map()`

## Estrutura esperada

```
src/
├── App.jsx
├── main.jsx
└── components/
    └── Card.jsx
```

---
