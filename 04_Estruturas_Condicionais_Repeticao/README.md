# JavaScript — Modulo 4: Estruturas Condicionais e de Repeticao

## Status: CONCLUIDO
- **Aulas:** 39/39
- **Duracao Total:** 7h45min
- **Progresso:** 100%

---

## Controle de Fluxo de Execucao

Por padrao, o JavaScript executa o codigo linha a linha, de cima para baixo. Estruturas de controle de fluxo permitem alterar esse comportamento — decidindo quais trechos serao executados e quantas vezes.

Existem dois grandes grupos:
- **Condicionais** — executam um bloco apenas se uma condicao for verdadeira
- **Repeticao** — executam um bloco multiplas vezes enquanto uma condicao for satisfeita

---

## Blocos Condicionais — If

O `if` avalia uma expressao booleana. Se for `true`, o bloco e executado. Se for `false`, e ignorado.

```js
const idade = 20

if (idade >= 18) {
  console.log("maior de idade")
}
```

---

## If, Else If e Else

Para tratar multiplos cenarios, encadeia-se `else if` e finaliza com `else` como caso padrao.

```js
const nota = 75

if (nota >= 90) {
  console.log("A")
} else if (nota >= 70) {
  console.log("B")
} else if (nota >= 50) {
  console.log("C")
} else {
  console.log("Reprovado")
}
// "B"
```

---

## Switch Case

O `switch` compara um valor contra multiplos casos usando igualdade estrita (`===`). E mais legivel que varios `else if` quando os casos sao valores fixos.

O `break` e obrigatorio para evitar que a execucao "caia" no proximo caso (fall-through). O `default` funciona como o `else` — executado quando nenhum caso bate.

```js
const dia = 3

switch (dia) {
  case 1:
    console.log("Segunda")
    break
  case 2:
    console.log("Terca")
    break
  case 3:
    console.log("Quarta")
    break
  default:
    console.log("Outro dia")
}
// "Quarta"
```

Casos podem ser agrupados quando compartilham o mesmo comportamento:

```js
switch (dia) {
  case 6:
  case 7:
    console.log("Fim de semana")
    break
  default:
    console.log("Dia util")
}
```

---

## Operador Ternario

Forma compacta de escrever um `if/else` em uma unica linha. Retorna um valor, portanto pode ser usado em atribuicoes e expressoes.

```js
// condicao ? valor_se_verdadeiro : valor_se_falso

const idade = 20
const acesso = idade >= 18 ? "permitido" : "negado"
console.log(acesso)  // "permitido"

// Tambem pode ser usado inline
console.log(`Situacao: ${nota >= 60 ? "aprovado" : "reprovado"}`)
```

Ternarios aninhados sao possiveis, mas prejudicam a leitura — prefira `if/else if` nesses casos.

---

## Estruturas de Repeticao

Permitem executar um bloco de codigo repetidamente. Toda estrutura de repeticao precisa de tres elementos para funcionar sem travar o programa:

1. **Inicializacao** — o ponto de partida
2. **Condicao** — quando parar
3. **Incremento/Decremento** — como evoluir a cada iteracao

---

## Estrutura FOR

Ideal quando se sabe antecipadamente quantas iteracoes serao feitas. Os tres elementos ficam declarados na propria cabecalho do loop.

```js
// for (inicializacao; condicao; incremento)

for (let i = 0; i < 5; i++) {
  console.log(i)
}
// 0, 1, 2, 3, 4

// Iterando sobre um array
const frutas = ["maca", "banana", "uva"]

for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i])
}
// "maca", "banana", "uva"

// Contagem regressiva
for (let i = 10; i >= 0; i--) {
  console.log(i)
}
```

### Loop Infinito

Ocorre quando a condicao de parada nunca se torna `false`. Trava o programa e deve ser evitado.

```js
// NUNCA FAZER — loop infinito
for (let i = 0; i >= 0; i++) {
  console.log(i)  // incrementa para sempre
}
```

---

## Estrutura WHILE

Executa o bloco enquanto a condicao for verdadeira. Diferente do `for`, o controle da variavel e feito manualmente. Util quando nao se sabe o numero exato de iteracoes.

```js
let contador = 0

while (contador < 5) {
  console.log(contador)
  contador++
}
// 0, 1, 2, 3, 4
```

Exemplo pratico — busca em array:

```js
const numeros = [4, 8, 15, 16, 23, 42]
let i = 0

while (i < numeros.length) {
  if (numeros[i] === 23) {
    console.log(`Encontrado na posicao ${i}`)
    break
  }
  i++
}
// "Encontrado na posicao 4"
```

---

## Estrutura DO WHILE

Executa o bloco **ao menos uma vez** antes de verificar a condicao. A diferenca em relacao ao `while` e que a condicao e checada no final.

```js
let tentativas = 0

do {
  console.log(`Tentativa ${tentativas + 1}`)
  tentativas++
} while (tentativas < 3)
// "Tentativa 1", "Tentativa 2", "Tentativa 3"
```

### Diferenca entre WHILE e DO WHILE

```js
let x = 10

// while — nao executa nenhuma vez (10 < 5 e falso de inicio)
while (x < 5) {
  console.log("while:", x)
}

// do while — executa uma vez antes de checar
do {
  console.log("do while:", x)
} while (x < 5)
// "do while: 10"
```

---

## Recursividade

Uma funcao e recursiva quando ela chama a si mesma. Toda recursao precisa de um **caso base** — a condicao que interrompe as chamadas — para nao gerar estouro de pilha (stack overflow).

```js
// Estrutura basica
function recursiva(n) {
  if (n === 0) return  // caso base
  console.log(n)
  recursiva(n - 1)     // chamada recursiva
}

// Fatorial
function fatorial(n) {
  if (n <= 1) return 1
  return n * fatorial(n - 1)
}

fatorial(5)  // 120  →  5 * 4 * 3 * 2 * 1
```

### O problema com a Recursividade

Cada chamada recursiva empilha um novo contexto de execucao na call stack. Sem caso base ou com n muito grande, a pilha estoura.

```js
// PERIGOSO — sem caso base
function infinita(n) {
  return infinita(n + 1)  // RangeError: Maximum call stack size exceeded
}
```

Para casos com muitas iteracoes, loops costumam ser mais eficientes que recursao.

### Recursividade em Strings

```js
function inverterString(str) {
  if (str.length <= 1) return str
  return inverterString(str.slice(1)) + str[0]
}

inverterString("javascript")  // "tpircSavaj"
```

### Recursividade em Objetos

```js
function somarValores(obj) {
  let total = 0
  for (let chave in obj) {
    if (typeof obj[chave] === "object") {
      total += somarValores(obj[chave])  // recursao para objetos aninhados
    } else if (typeof obj[chave] === "number") {
      total += obj[chave]
    }
  }
  return total
}

const dados = { a: 10, b: { c: 20, d: { e: 30 } } }
somarValores(dados)  // 60
```

---

## Enumerando Objetos — FOR IN

O `for...in` itera sobre as **chaves enumeraveis** de um objeto.

```js
const produto = { nome: "Notebook", preco: 3500, estoque: 10 }

for (let chave in produto) {
  console.log(`${chave}: ${produto[chave]}`)
}
// "nome: Notebook"
// "preco: 3500"
// "estoque: 10"
```

---

## Enumerando Arrays — FOR OF

O `for...of` itera diretamente sobre os **valores** de um iteravel (arrays, strings, etc.).

```js
const frutas = ["maca", "banana", "uva"]

for (let fruta of frutas) {
  console.log(fruta)
}
// "maca", "banana", "uva"

// Tambem funciona em strings
for (let letra of "js") {
  console.log(letra)
}
// "j", "s"
```

### FOR IN vs FOR OF

| | `for...in` | `for...of` |
|---|---|---|
| Itera sobre | chaves (keys) | valores (values) |
| Uso principal | objetos | arrays e iteraveis |

---

## Valores Truthy e Falsy

No JavaScript, qualquer valor pode ser avaliado em um contexto booleano. Valores **falsy** sao convertidos para `false`; todos os demais sao **truthy**.

### Valores Falsy

```js
false
0
-0
0n          // BigInt zero
""          // string vazia
null
undefined
NaN
```

### Valores Truthy

```js
true
1
"texto"     // qualquer string nao vazia
[]          // array vazio — TRUTHY
{}          // objeto vazio — TRUTHY
"0"         // string com zero — TRUTHY
```

### Uso pratico

```js
const nome = ""

if (nome) {
  console.log(`Ola, ${nome}`)
} else {
  console.log("Nome nao informado")
}
// "Nome nao informado" — string vazia e falsy

// Curto-circuito com ||
const usuario = null
const nomePadrao = usuario || "Anonimo"
console.log(nomePadrao)  // "Anonimo"

// Curto-circuito com &&
const logado = true
logado && console.log("Bem-vindo!")  // "Bem-vindo!"
```
