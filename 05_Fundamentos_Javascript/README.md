# JavaScript — Módulo 5: Revisão Prática e Simulação Financeira

## Status: CONCLUÍDO
- **Projetos:** 2 (Laboratório de Fundamentos + Simulação Financeira)
- **Foco:** Revisão aplicada de funções, arrays, objetos, strings e lógica condicional

---

## Funções Básicas e Operações Matemáticas

Funções simples reforçam o princípio de responsabilidade única — cada função faz uma coisa bem feita.

```js
// Soma de dois inteiros
function somar(a, b) {
  return a + b
}
somar(5, 3)  // 8

// Rendimento de investimento: valor * (taxa / 100)
function calcularRendimento(valor, taxa) {
  return valor * (taxa / 100)
}
calcularRendimento(1000, 5)  // 50

// Pontuação no campeonato: vitórias × 3 + empates × 1
function calcularPontos(vitorias, empates) {
  return vitorias * 3 + empates
}
calcularPontos(5, 2)  // 17
```

---

## Manipulação de Strings

Strings possuem métodos nativos que eliminam a necessidade de loops manuais na maioria dos casos.

```js
// Dividir frase em array de palavras
function dividirFrase(frase) {
  return frase.split(" ")
}
dividirFrase("Esta é uma frase de exemplo.")
// ["Esta", "é", "uma", "frase", "de", "exemplo."]

// Contar palavras
function contarPalavras(frase) {
  return frase.split(" ").length
}
contarPalavras("Olá, tudo bem?")  // 3

// Contar vogais — toLowerCase garante que A e a sejam tratados igual
function contarVogais(frase) {
  const vogais = "aeiouáéíóúãõâêî"
  let count = 0
  for (let letra of frase.toLowerCase()) {
    if (vogais.includes(letra)) count++
  }
  return count
}
contarVogais("Olá, tudo bem?")  // 5
```

---

## Palíndromo e Verificação de Padrões

Verificar se uma string é igual ao seu inverso é um exercício clássico de manipulação de string e lógica booleana.

```js
function ehPalindromo(palavra) {
  const invertida = palavra.split("").reverse().join("")
  return palavra === invertida
}

ehPalindromo("arara")    // true
ehPalindromo("cachorro") // false
```

O padrão `split("") → reverse() → join("")` é a forma idiomática de inverter uma string em JavaScript.

---

## Codificação e Decodificação

Substituição de caracteres usando `replace` com expressão regular global (`/g`) ou encadeamento de chamadas.

```js
function codificar(frase) {
  return frase
    .replace(/a/g, "1")
    .replace(/e/g, "2")
    .replace(/i/g, "3")
    .replace(/o/g, "4")
    .replace(/u/g, "5")
}

function decodificar(frase) {
  return frase
    .replace(/1/g, "a")
    .replace(/2/g, "e")
    .replace(/3/g, "i")
    .replace(/4/g, "o")
    .replace(/5/g, "u")
}

codificar("a casa e o sol")   // "1 c1s2 2 4 s4l"
decodificar("1 c1s2 2 4 s4l") // "a casa e o sol"
```

---

## Manipulação de Arrays

### Ordenação

```js
function ordenarNomes(nomes) {
  return nomes.sort()
}
ordenarNomes(["Ana", "Elias", "Carlos", "Beatriz"])
// ["Ana", "Beatriz", "Carlos", "Elias"]
```

`sort()` sem argumentos ordena strings alfabeticamente. Para números, é necessário passar um comparador: `sort((a, b) => a - b)`.

### Média, Máximo e Contagem

```js
// Média aritmética com reduce
function calcularMedia(numeros) {
  const soma = numeros.reduce((acc, n) => acc + n, 0)
  return soma / numeros.length
}
calcularMedia([10, 20, 30, 40])  // 25

// Maior valor com Math.max e spread
function maiorGasto(gastos) {
  return Math.max(...gastos)
}
maiorGasto([10, 5, 20, 15])  // 20
```

### Transformação com map

`map` retorna um novo array sem alterar o original — ideal para classificar ou rotular valores.

```js
function controleDespesas(despesas) {
  return despesas.map(d => d > 100 ? "Alto Gasto" : "Gasto Controlado")
}
controleDespesas([150, 80, 200, 60, 120])
// ["Alto Gasto", "Gasto Controlado", "Alto Gasto", "Gasto Controlado", "Alto Gasto"]
```

---

## Gerando Arrays de Objetos

Combinar `sort` e `map` para produzir uma lista estruturada de objetos.

```js
function gerarListaInvestimentos(investimentos, nome) {
  return investimentos
    .sort((a, b) => a - b)
    .map(valor => ({ investimento: valor, nome }))
}

gerarListaInvestimentos([5000, 2000, 15000], "Maria")
// [
//   { investimento: 2000, nome: "Maria" },
//   { investimento: 5000, nome: "Maria" },
//   { investimento: 15000, nome: "Maria" }
// ]
```

---

## Números Primos

Verificar primalidade exige iterar apenas até a raiz quadrada do número — otimização clássica de complexidade.

```js
function ehPrimo(n) {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

ehPrimo(7)  // true
ehPrimo(4)  // false
```

---

## Valores Truthy e Falsy na Prática

```js
function compararValores(a, b) {
  return !!a && !!b
}

compararValores(5, "texto")  // true  — ambos truthy
compararValores(0, "texto")  // false — 0 é falsy
```

O operador `!!` converte qualquer valor para booleano explicitamente: a primeira `!` nega, a segunda `!` nega novamente — resultando no booleano equivalente ao valor original.

---

## Condicionais Aplicadas a Distâncias

```js
function calcularDistancia(d1, d2) {
  if (d1 < d2) return "Pessoa 1"
  if (d2 < d1) return "Pessoa 2"
  return "Ambos estão a mesma distância"
}

calcularDistancia(10, 15)  // "Pessoa 1"
calcularDistancia(20, 15)  // "Pessoa 2"
calcularDistancia(30, 30)  // "Ambos estão a mesma distância"
```

---

## Projeto: Simulação Financeira

### Simulando Juros Compostos com Loop

A cada mês, o saldo cresce proporcionalmente à taxa sobre o saldo atual — não sobre o valor inicial. Isso é juros compostos, e um `for` resolve de forma direta.

```js
function simularInvestimento(valorInicial, taxaMensal, meses) {
  let saldo = valorInicial
  for (let i = 0; i < meses; i++) {
    saldo += saldo * (taxaMensal / 100)
  }
  return parseFloat(saldo.toFixed(2))
}

simularInvestimento(1000, 1, 12)  // 1126.83
```

### Trabalhando com Objetos de Despesas

```js
function gerenciarDespesas(despesas) {
  return Object.values(despesas).reduce((acc, val) => acc + val, 0)
}

const despesasMensais = {
  alimentacao: 800,
  transporte: 300,
  aluguel: 1500,
  lazer: 200
}

gerenciarDespesas(despesasMensais)  // 2800
```

`Object.values()` extrai apenas os valores de um objeto, descartando as chaves — útil quando só o dado numérico importa.

### Obtendo o Mês Atual com Date

```js
function obterMesAtual() {
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
  return meses[new Date().getMonth()]
}

obterMesAtual()  // "Abril" (varia conforme o mês atual)
```

`getMonth()` retorna um índice de 0 a 11 — por isso o array começa em `"Janeiro"` no índice 0.

### Gerando o Relatório Financeiro

Composição de funções: `gerarRelatorio` chama as funções anteriores e monta o resultado final. Cada função tem sua responsabilidade isolada.

```js
function gerarRelatorio(valorInicial, taxa, meses, despesas, metaInvestimento, metaOrcamento) {
  const mesAtual = obterMesAtual()
  const saldoFinal = simularInvestimento(valorInicial, taxa, meses)
  const totalDespesas = gerenciarDespesas(despesas)
  const diferenca = metaOrcamento - totalDespesas

  console.log(`=== Relatório Financeiro — ${mesAtual} ===`)
  console.log(`Saldo final do investimento: R$ ${saldoFinal}`)
  console.log(`Total de despesas: R$ ${totalDespesas}`)
  console.log(diferenca >= 0
    ? `Economia no mês: R$ ${diferenca}`
    : `Orçamento excedido em: R$ ${Math.abs(diferenca)}`
  )
  console.log(saldoFinal >= metaInvestimento
    ? "✅ Meta de investimento atingida!"
    : "❌ Meta de investimento não atingida."
  )
  console.log("Despesas por categoria:", despesas)
}
```

### Configuração e Execução

```js
const valorInicial = 5000
const taxaMensal = 1.2
const duracao = 12
const metaInvestimento = 6000
const metaOrcamento = 3000

const despesas = {
  alimentacao: 800,
  transporte: 300,
  aluguel: 1500,
  lazer: 200
}

gerarRelatorio(valorInicial, taxaMensal, duracao, despesas, metaInvestimento, metaOrcamento)
```

---

## Padrões Revisados neste Módulo

| Conceito | Método / Técnica |
|---|---|
| Inverter string | `split("").reverse().join("")` |
| Converter para booleano | `!!valor` |
| Somar array | `reduce((acc, n) => acc + n, 0)` |
| Maior valor | `Math.max(...array)` |
| Extrair valores de objeto | `Object.values(obj)` |
| Mês atual | `new Date().getMonth()` |
| Substituição global em string | `replace(/padrão/g, novoValor)` |
| Juros compostos | loop `for` acumulando sobre saldo atual |
