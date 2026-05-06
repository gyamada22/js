# Projeto 01 — Contador com Limites

## O que a aplicação precisa fazer

- Exibir um número na tela que começa em `0`
- Ter 3 botões: **Adicionar**, **Diminuir** e **Zerar**
- O contador tem limite mínimo `0` e máximo `10`
- O botão fica desabilitado quando chegar em `10` e `0`
- Exibir a mensagem *"Limite máximo/mínimo atingido"* quando chegar em `10` e `0`

## Restrições

- Estado e lógica ficam no `App.jsx`
- O `Botao.jsx` só recebe props e renderiza — sem lógica própria
- Usar `prev` no `setContador`

## Conceitos que você vai usar

`useState` · `props` · `disabled` · renderização condicional com `&&`

## Estrutura esperada

```
src/
├── App.jsx
├── main.jsx
└── components/
    └── Botao.jsx
```
- 06/05 = 5:38
