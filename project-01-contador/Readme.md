Projeto 01 — Contador com Limites
Crie uma aplicação React com dois arquivos: App.jsx com toda a lógica, e components/Botao.jsx com o visual.
O que a aplicação precisa fazer:

Exibir um número na tela que começa em 0
Ter 3 botões: Adicionar, Diminuir e Zerar
O contador tem limite mínimo 0 e máximo 10
O botão Adicionar fica desabilitado quando chegar em 10
O botão Diminuir fica desabilitado quando chegar em 0
O botão Zerar fica desabilitado quando o valor já for 0
Exibir a mensagem "Limite máximo atingido" quando chegar em 10
Exibir a mensagem "Limite mínimo atingido" quando chegar em 0

Restrições:

Estado e lógica ficam no App.jsx
O Botao.jsx só recebe props e renderiza — sem lógica própria
Usar prev no setContador

Conceitos que você vai usar: useState, props, disabled, renderização condicional com &&
