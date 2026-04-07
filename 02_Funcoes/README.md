# JavaScript — Modulo 2: Funcoes

## Status: CONCLUIDO

- **Aulas:** 13/13
- **Duracao Total:** 2h10min
- **Progresso:** 100%

---

## O que e uma funcao

Uma funcao e um bloco de codigo reutilizavel que executa uma tarefa especifica. Em vez de repetir a mesma logica em varios lugares, voce define uma vez e chama quantas vezes precisar.

```js
function saudacao() {
  console.log("Ola!")
}

saudacao() // "Ola!"
```

---

## Parametros e Argumentos

Parametros sao as variaveis declaradas na definicao da funcao. Argumentos sao os valores passados na chamada.

```js
function somar(a, b) {   // a e b sao parametros
  return a + b
}

somar(3, 5)  // 3 e 5 sao argumentos — retorna 8
```

Uma funcao pode ter multiplos parametros. Se um argumento nao for passado, o parametro recebe `undefined` — a menos que tenha um valor padrao definido.

```js
function desconto(preco, taxa = 0.1) {  // taxa tem valor padrao
  return preco - preco * taxa
}

desconto(200)      // 180 — usa o padrao de 10%
desconto(200, 0.2) // 160 — sobrescreve o padrao
```

---

## Retorno de valores

O `return` encerra a execucao da funcao e devolve um valor para quem a chamou. Sem `return`, a funcao retorna `undefined`.

```js
function calcularMedia(a, b, c) {
  return (a + b + c) / 3
}

const media = calcularMedia(7, 8, 9)  // 8
```

---

## Funcoes como Expressao

Alem da declaracao tradicional, funcoes podem ser atribuidas a variaveis. A diferenca principal e o hoisting: funcoes declaradas podem ser chamadas antes de serem definidas, funcoes como expressao nao.

```js
// Declaracao — sofre hoisting
function dobrar(n) {
  return n * 2
}

// Expressao — nao sofre hoisting
const triplicar = function(n) {
  return n * 3
}

// Arrow function — sintaxe mais curta, mesma ideia
const quadruplicar = (n) => n * 4
```

---

## Funcoes de Alta Ordem

Funcoes que recebem outras funcoes como argumento ou retornam funcoes. Sao a base de muito do que o JavaScript moderno usa — como `map`, `filter` e `reduce`.

```js
function aplicarOperacao(valor, operacao) {
  return operacao(valor)
}

const dobrar = (n) => n * 2
const resultado = aplicarOperacao(10, dobrar)  // 20
```

---

## Escopo de Variaveis

O escopo define onde uma variavel pode ser acessada. Variaveis declaradas dentro de uma funcao nao existem fora dela.

```js
function exemplo() {
  const mensagem = "apenas aqui dentro"
  console.log(mensagem)  // funciona
}

console.log(mensagem)  // ReferenceError — nao existe aqui fora
```

Variaveis declaradas fora de qualquer funcao ficam no escopo global e podem ser acessadas de qualquer lugar — o que deve ser evitado para nao gerar efeitos colaterais inesperados.

```js
const imposto = 0.1  // escopo global

function calcularPreco(valor) {
  return valor + valor * imposto  // acessa o escopo externo
}
```
