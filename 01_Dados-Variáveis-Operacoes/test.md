# JavaScript — Modulo 1: Dados, Variaveis e Operacoes

> 34 aulas · 5h36min · concluido

---

## Variaveis

JavaScript oferece tres formas de declarar variaveis, cada uma com comportamento distinto de escopo e mutabilidade.

```js
var nome = "Ana"       // escopo de funcao, pode ser redeclarada
let idade = 25         // escopo de bloco, pode ser reatribuida
const PI = 3.14        // escopo de bloco, nao pode ser reatribuida
```

`let` e `const` sao as formas modernas e recomendadas. `var` tem comportamento menos previsivel por causa do hoisting e do escopo de funcao, e deve ser evitada em codigo novo.

---

## Tipos Primitivos

Sao os tipos de dados mais basicos da linguagem. Cada valor e imutavel e armazenado diretamente na variavel.

```js
// String
const produto = "Notebook"

// Number — inteiros e decimais usam o mesmo tipo
const preco = 199.90
const quantidade = 5

// Boolean
const disponivel = true

// Undefined — variavel declarada mas sem valor
let endereco

// Null — ausencia de valor de forma intencional
let desconto = null
```

---

## Operadores

### Aritmeticos

```js
10 + 3   // 13
10 - 3   // 7
10 * 3   // 30
10 / 3   // 3.333...
10 % 3   // 1  (resto da divisao)
10 ** 3  // 1000 (exponenciacao)
```

### Comparacao

```js
5 == "5"   // true  — compara valor, ignora tipo (coercao implicita)
5 === "5"  // false — compara valor e tipo (recomendado)
5 != "5"   // false
5 !== "5"  // true
```

### Logicos

```js
true && false  // false — AND: ambos precisam ser true
true || false  // true  — OR: pelo menos um precisa ser true
!true          // false — NOT: inverte o booleano
```

---

## Coercao de Tipos

JavaScript converte tipos automaticamente em algumas situacoes (coercao implicita), o que pode gerar resultados inesperados.

```js
"5" + 2    // "52"  — number vira string por causa do +
"5" - 2    // 3     — string vira number porque - nao concatena
```

Para evitar ambiguidade, use conversao explicita:

```js
Number("10")     // 10
String(42)       // "42"
Boolean(0)       // false
parseInt("10px") // 10
parseFloat("3.5abc") // 3.5
```

---

## Arrays

Estrutura de dados ordenada. Os elementos sao acessados por indice (comecando em 0).

```js
const produtos = ["Teclado", "Mouse", "Monitor"]

produtos[0]          // "Teclado"
produtos[1] = "Hub"  // modifica o segundo elemento

produtos.push("Webcam")  // adiciona ao final
produtos.pop()           // remove o ultimo elemento
```

---

## Objetos

Estrutura de dados que agrupa informacoes relacionadas em pares de chave e valor.

```js
const produto = {
  nome: "Notebook",
  preco: 3500,
  quantidade: 10
}

produto.nome          // "Notebook"
produto["preco"]      // 3500

produto.desconto = 0.1    // adiciona propriedade
delete produto.quantidade // remove propriedade
```

---

## Tipos Referencia: cuidado com copias

Arrays e objetos sao armazenados por referencia. Atribuir um ao outro nao cria uma copia — ambos apontam para o mesmo lugar na memoria.

```js
const a = [1, 2, 3]
const b = a
b[0] = 99
console.log(a[0]) // 99 — a tambem foi alterado
```

Para criar uma copia independente:

```js
// Array
const copia = [...original]

// Objeto
const copiaObj = { ...original }
// ou
const copiaObj = Object.assign({}, original)
```

> Isso vale para o primeiro nivel de profundidade. Para objetos aninhados, e necessario uma copia profunda (deep clone).
