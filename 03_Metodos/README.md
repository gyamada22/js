# JavaScript — Modulo 3: Metodos

## Status: CONCLUIDO
- **Aulas:** 37/37
- **Duracao Total:** 8h21min
- **Progresso:** 100%

---

## O que sao metodos

Metodos sao funcoes associadas a um objeto ou tipo de dado. A diferenca principal em relacao a funcoes comuns e que eles sempre pertencem a algo — uma string, um array, um objeto — e sao chamados com a notacao de ponto.

```js
const nome = "javascript"
nome.toUpperCase() // "JAVASCRIPT" — metodo da string
```

---

## Metodos Nativos — String

O JavaScript oferece metodos built-in para manipular strings sem precisar criar logica do zero.

```js
const frase = "aprendendo javascript"

// slice — extrai um trecho pela posicao
frase.slice(0, 10)        // "aprendendo"

// substring — similar ao slice, mas nao aceita indices negativos
frase.substring(11, 21)   // "javascript"

// replace — substitui uma ocorrencia
frase.replace("javascript", "python")  // "aprendendo python"

// indexOf — retorna o indice da primeira ocorrencia
frase.indexOf("java")     // 11

// split — divide a string em array pelo separador
"cadeira,mesa,sofa".split(",")  // ["cadeira", "mesa", "sofa"]

// toUpperCase / toLowerCase
"JavaScript".toUpperCase()  // "JAVASCRIPT"
"JavaScript".toLowerCase()  // "javascript"
```

---

## Metodos Nativos — Array

Arrays possuem metodos para adicionar, remover, reordenar e consultar elementos.

```js
const lista = ["a", "b", "c"]

// Adicionar elementos
lista.push("d")       // adiciona no final    → ["a", "b", "c", "d"]
lista.unshift("z")    // adiciona no inicio   → ["z", "a", "b", "c", "d"]

// Remover elementos
lista.pop()           // remove do final      → ["z", "a", "b", "c"]
lista.shift()         // remove do inicio     → ["a", "b", "c"]

// Reordenar
lista.sort()          // ordena alfabeticamente
lista.reverse()       // inverte a ordem

// Combinar e modificar
const outra = ["d", "e"]
lista.concat(outra)           // une dois arrays sem alterar o original
lista.splice(1, 1)            // remove 1 elemento a partir do indice 1
lista.join(" - ")             // une os elementos em uma string: "a - b - c"

// Consultar
lista.includes("b")           // true — verifica se o elemento existe
lista.every((n) => n > 3)     // true se TODOS satisfazem a condicao
lista.some((n) => n > 3)      // true se PELO MENOS UM satisfaz a condicao
```

---

## Propriedades

Propriedades sao os dados armazenados dentro de um objeto, acessados pela notacao de ponto ou colchetes. Diferente dos metodos, elas nao sao funcoes — apenas guardam valores.

```js
const produto = { nome: "Notebook", preco: 3500, quantidade: 10 }

produto.nome       // "Notebook"
produto["preco"]   // 3500
```

---

## Metodos Nativos — Objetos

O objeto global `Object` oferece metodos estaticos para inspecionar e manipular objetos.

```js
const venda = { produto: "Notebook", quantidade: 2, preco: 3500 }

Object.keys(venda)     // ["produto", "quantidade", "preco"]
Object.values(venda)   // ["Notebook", 2, 3500]
Object.entries(venda)  // [["produto", "Notebook"], ["quantidade", 2], ["preco", 3500]]

// assign — copia propriedades de um ou mais objetos para um alvo
const copia = Object.assign({}, venda, { quantidade: 5 })

// create — cria um novo objeto usando outro como prototipo
const novaVenda = Object.create(venda)

// defineProperty — define uma propriedade com configuracoes especificas
Object.defineProperty(venda, "data", {
  value: "2024-10-07",
  enumerable: false   // nao aparece no for...in nem no Object.keys()
})

// delete — remove uma propriedade do objeto
delete venda.preco

// hasOwnProperty — verifica se o objeto possui uma propriedade propria
venda.hasOwnProperty("produto")  // true
```

---

## Metodos Personalizados

Objetos tambem podem ter metodos proprios — funcoes definidas como propriedades.

```js
const venda = {
  produto: "Notebook",
  quantidade: 2,
  precoUnitario: 3500,
  desconto: 0.1,

  calcularTotal() {
    return this.quantidade * this.precoUnitario * (1 - this.desconto)
  },

  aplicarDesconto(percentual) {
    this.desconto = percentual / 100
  },

  detalharVenda() {
    return `Produto: ${this.produto} | Total: R$ ${this.calcularTotal()}`
  }
}

venda.calcularTotal()          // 6300
venda.aplicarDesconto(20)
venda.calcularTotal()          // 5600
```

---

## Metodos Nativos — Number

Metodos para converter, formatar e validar valores numericos.

```js
// parseFloat / parseInt — converte string em numero
Number.parseFloat("150.50")   // 150.5
Number.parseFloat("200px")    // 200
Number.parseFloat("abc")      // NaN

// toFixed — arredonda para N casas decimais (retorna string)
(1234.56789).toFixed(2)       // "1234.57"

// toPrecision — define o total de digitos significativos
(12345.6789).toPrecision(5)   // "1.2346e+4"

// isInteger — verifica se e um numero inteiro
Number.isInteger(42)          // true
Number.isInteger(42.5)        // false

// isFinite — verifica se nao e Infinity nem NaN
Number.isFinite(1 / 0)        // false
Number.isFinite(42)           // true
```

---

## Objeto Global — Math

`Math` e um objeto com propriedades e metodos matematicos prontos para uso.

```js
// Arredondamento
Math.floor(7.89)   // 7 — arredonda para baixo
Math.ceil(7.89)    // 8 — arredonda para cima
Math.round(7.89)   // 8 — arredonda para o mais proximo

// Valor maximo e minimo de uma lista
Math.max(10, 5, 20, 40, 1)   // 40
Math.min(10, 5, 20, 40, 1)   // 1

// Numeros aleatorios
Math.random()                          // entre 0 e 1
Math.random() * 100                    // entre 0 e 100
Math.floor(Math.random() * 51) + 50   // inteiro entre 50 e 100
```

---

## Objeto Global — Date

`Date` permite criar, ler e manipular datas e horarios.

```js
const hoje = new Date()
const data = new Date("2024-10-07")

// Extrair partes da data
data.getFullYear()    // 2024
data.getMonth()       // 9 — meses comecam em 0 (janeiro = 0)
data.getDate()        // 7

// Calcular diferenca em dias entre duas datas
const inicio = new Date("2024-01-01")
const fim = new Date("2024-10-07")
const diffMs = fim - inicio
const diffDias = diffMs / (1000 * 60 * 60 * 24)  // 280

// Calcular idade
function calcularIdade(nascimento) {
  const hoje = new Date()
  const nasc = new Date(nascimento)
  let idade = hoje.getFullYear() - nasc.getFullYear()
  const aniversarioPassou =
    hoje.getMonth() > nasc.getMonth() ||
    (hoje.getMonth() === nasc.getMonth() && hoje.getDate() >= nasc.getDate())
  if (!aniversarioPassou) idade--
  return idade
}

// Formatar no padrao brasileiro
function formatarData(dataStr) {
  const d = new Date(dataStr)
  const dia = String(d.getDate() + 1).padStart(2, "0")
  const mes = String(d.getMonth() + 1).padStart(2, "0")
  const ano = d.getFullYear()
  return `${dia}/${mes}/${ano}`
}
formatarData("2024-10-07")  // "07/10/2024"
```
