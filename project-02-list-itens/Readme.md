# Projeto 02 — Lista de Itens

## O que a aplicação precisa fazer

- Ter um campo de texto onde o usuário digita um item
- Ter um botão **Adicionar** que insere o item na lista
- Exibir todos os itens adicionados na tela
- Cada item da lista tem um botão **Remover** ao lado
- O botão Adicionar fica desabilitado quando o campo estiver vazio
- Exibir a mensagem *"Nenhum item na lista"* quando a lista estiver vazia
- Ao adicionar um item, o campo de texto limpa automaticamente
- Não adicionar itens com texto só de espaços em branco

## Restrições

- Estado e lógica ficam no `App.jsx`
- O `Lista.jsx` só recebe props e renderiza — sem lógica própria
- Nunca usar `.push()` para adicionar itens — sempre criar um novo array
- Cada item da lista precisa ter um `id` único
- Usar `prev` nos setters

## Conceitos que você vai usar

`useState` · `props` · `input controlado` · `.map()` · `.filter()` · `disabled` · renderização condicional com `&&`

## Estrutura esperada

```
src/
├── App.jsx
├── main.jsx
└── components/
    └── Lista.jsx
```
