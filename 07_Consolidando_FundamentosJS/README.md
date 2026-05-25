# JavaScript — Módulo 7: Consolidando os Fundamentos do JavaScript

## Status: CONCLUÍDO
- **Projetos:** 2 (Laboratório de Fundamentos e Simulação Financeira)
- **Foco:** Aplicação prática dos fundamentos — variáveis, tipos, condicionais, loops, funções, arrays, objetos e manipulação de strings

---

## Sobre este Módulo

Este módulo não introduz conceitos novos — seu objetivo é **consolidar e integrar** tudo que foi aprendido até aqui através de dois projetos práticos. A lógica é simples: entender um conceito isolado é diferente de saber usá-lo quando o problema não diz explicitamente qual ferramenta usar.

```
Módulos anteriores:
Conceito A → exercício sobre A
Conceito B → exercício sobre B

Módulo de consolidação:
Problema real → você decide quais ferramentas usar → A, B, C em conjunto
```

---

## Projeto 1 — Laboratório de Fundamentos

Um conjunto de requisitos progressivos que exercitam os fundamentos do JavaScript de forma integrada. Cada requisito combina múltiplos conceitos simultaneamente — sem indicar qual usar.

### Padrões aplicados nos requisitos

#### Manipulação de variáveis e tipos

```js
// Coerção de tipo — conversão explícita vs implícita
const entrada = "42"
const numero = Number(entrada)     // conversão explícita — segura
const tambem = +entrada            // conversão implícita — mais curta

// Verificando tipos antes de operar
if (typeof valor !== "number" || isNaN(valor)) {
  console.log("Valor inválido")
}

// Desestruturação para extrair dados de objetos e arrays
const { nome, idade } = usuario
const [primeiro, segundo, ...resto] = lista
```

#### Condicionais e lógica de decisão

```js
// Operador ternário para atribuições simples
const status = idade >= 18 ? "adulto" : "menor"

// Encadeamento com else if vs switch — escolhendo o mais legível
// switch → quando compara o mesmo valor contra múltiplas opções fixas
switch (diaSemana) {
  case "sábado":
  case "domingo":
    return "fim de semana"
  default:
    return "dia útil"
}

// Curto-circuito para valores padrão
const nome = entrada || "Anônimo"
const config = opcoes ?? {} // nullish coalescing — só usa padrão se null/undefined
```

#### Loops e iteração

```js
// Escolhendo o loop certo para cada situação
for (let i = 0; i < lista.length; i++) { }   // quando o índice importa
for (const item of lista) { }                 // quando só o valor importa
while (condicao) { }                          // quando o número de iterações é incerto

// Controlando o fluxo dentro do loop
for (const item of itens) {
  if (item.inativo) continue  // pula para o próximo
  if (item.id === alvo) break // encerra o loop
  processar(item)
}
```

#### Funções

```js
// Funções puras — mesmo input, mesmo output, sem efeitos colaterais
function calcularMedia(numeros) {
  const soma = numeros.reduce((acc, n) => acc + n, 0)
  return soma / numeros.length
}

// Funções com parâmetros padrão
function saudar(nome, saudacao = "Olá") {
  return `${saudacao}, ${nome}!`
}

// Separar responsabilidades — uma função, uma tarefa
function validarEmail(email) { return email.includes("@") }
function formatarEmail(email) { return email.trim().toLowerCase() }
function processarEmail(email) {
  if (!validarEmail(email)) throw new Error("Email inválido")
  return formatarEmail(email)
}
```

#### Arrays e métodos funcionais

```js
// Cadeia de métodos para transformar dados
const resultado = produtos
  .filter(p => p.ativo && p.estoque > 0)   // filtra
  .map(p => ({ ...p, preco: p.preco * 1.1 })) // transforma
  .sort((a, b) => a.preco - b.preco)          // ordena

// reduce para acumulações
const totalVendas = pedidos.reduce((total, pedido) => {
  return total + pedido.valor
}, 0)

// find vs filter — quando usar cada um
const usuario = usuarios.find(u => u.id === id)       // um único resultado
const ativos = usuarios.filter(u => u.ativo === true) // múltiplos resultados

// some e every para verificações booleanas
const temEstoque = produtos.some(p => p.estoque > 0)
const todosDisponiveis = produtos.every(p => p.disponivel)
```

#### Objetos

```js
// Spread para criar cópias sem mutar o original
const atualizado = { ...usuario, nome: "Novo Nome" }
const novaLista = [...lista, novoItem]

// Object.keys / values / entries para iterar objetos
Object.entries(objeto).forEach(([chave, valor]) => {
  console.log(`${chave}: ${valor}`)
})

// Verificando se uma propriedade existe
if ("email" in usuario) { }
if (usuario.hasOwnProperty("email")) { }
```

#### Strings

```js
// Template literals para composição
const mensagem = `Olá, ${nome}! Você tem ${itens.length} item(s) no carrinho.`

// Métodos úteis de string
const limpo = entrada.trim()                    // remove espaços das bordas
const lower = entrada.toLowerCase()             // padroniza para comparação
const partes = csv.split(",")                   // divide por separador
const junto = partes.join(" | ")               // une com separador
const substituido = texto.replace("old", "new") // substitui primeira ocorrência
const tudo = texto.replaceAll("old", "new")     // substitui todas as ocorrências
const inclui = frase.includes("palavra")        // verifica presença
const inicio = frase.startsWith("Olá")         // verifica prefixo
```

---

## Projeto 2 — Simulação Financeira

Um projeto mais focado e temático: simular cálculos e projeções financeiras usando JavaScript puro. Exige precisão com números, formatação de valores monetários e lógica de projeção ao longo do tempo.

### Padrões aplicados nos requisitos

#### Aritmética e precisão com números

```js
// Problema clássico com ponto flutuante
console.log(0.1 + 0.2) // 0.30000000000000004

// Solução — arredondar para o número de casas significativas
const resultado = parseFloat((0.1 + 0.2).toFixed(2)) // 0.30

// Math — funções úteis em cálculos financeiros
Math.round(valor)          // arredonda para o inteiro mais próximo
Math.floor(valor)          // arredonda para baixo (trunca)
Math.ceil(valor)           // arredonda para cima
Math.abs(valor)            // valor absoluto (remove o sinal negativo)
Math.max(a, b, c)          // maior valor
Math.min(a, b, c)          // menor valor
Math.pow(base, expoente)   // potenciação — ex: Math.pow(1.05, 12)
```

#### Formatação de valores monetários

```js
// Usando Intl.NumberFormat para formatar moeda corretamente
function formatarMoeda(valor, moeda = "BRL", locale = "pt-BR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: moeda,
  }).format(valor)
}

formatarMoeda(1500)          // "R$ 1.500,00"
formatarMoeda(1500, "USD", "en-US") // "$1,500.00"

// Formatando percentuais
function formatarPorcentagem(valor) {
  return `${(valor * 100).toFixed(2)}%`
}
formatarPorcentagem(0.0512) // "5.12%"
```

#### Cálculos de juros e projeções

```js
// Juros simples
function jurosSimples(capital, taxa, tempo) {
  return capital * taxa * tempo
}

// Juros compostos
function jurosCompostos(capital, taxa, tempo) {
  return capital * Math.pow(1 + taxa, tempo)
}

// Projeção mês a mês — acumulando resultados em array
function projetarInvestimento(capitalInicial, taxaMensal, meses) {
  const projecao = []
  let saldoAtual = capitalInicial

  for (let mes = 1; mes <= meses; mes++) {
    saldoAtual = saldoAtual * (1 + taxaMensal)
    projecao.push({
      mes,
      saldo: parseFloat(saldoAtual.toFixed(2)),
      rendimento: parseFloat((saldoAtual - capitalInicial).toFixed(2)),
    })
  }

  return projecao
}
```

#### Estruturação dos dados da simulação

```js
// Modelando a simulação como um objeto com dados e resultados juntos
function criarSimulacao(parametros) {
  const { capital, taxaMensal, prazo } = parametros

  const projecao = projetarInvestimento(capital, taxaMensal, prazo)
  const ultimoMes = projecao[projecao.length - 1]

  return {
    parametros,
    projecao,
    resumo: {
      valorFinal: ultimoMes.saldo,
      totalRendido: ultimoMes.rendimento,
      rentabilidadeTotal: ((ultimoMes.saldo / capital - 1) * 100).toFixed(2) + "%",
    },
  }
}
```

---

## O que este Módulo Exercita de Diferente

Nos módulos anteriores, os exercícios eram direcionados — "use o método X". Aqui, a lógica é oposta:

| Módulos de conceito | Módulo de consolidação |
|---|---|
| Problema indica a ferramenta | Problema não indica a ferramenta |
| Foco em aprender a sintaxe | Foco em escolher a abordagem certa |
| Exercício isolado | Requisitos integrados e progressivos |
| Correto ou errado | Múltiplas soluções válidas |

A habilidade treinada aqui é a de **decompor um problema em partes menores** e identificar qual combinação de ferramentas resolve cada parte.

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| Conversão de tipo segura | `Number()`, `String()`, `Boolean()`, `parseInt()`, `parseFloat()` |
| Valor padrão | `valor \|\| "padrão"` e `valor ?? "padrão"` (nullish) |
| Desestruturação | `const { a, b } = obj` / `const [x, y] = arr` |
| Spread sem mutação | `{ ...obj, chave: novoValor }` / `[...arr, novoItem]` |
| Filtrar lista | `array.filter(item => condicao)` |
| Transformar lista | `array.map(item => novoValor)` |
| Reduzir lista a um valor | `array.reduce((acc, item) => acc + item, 0)` |
| Buscar um item | `array.find(item => condicao)` |
| Verificar se algum satisfaz | `array.some(item => condicao)` |
| Verificar se todos satisfazem | `array.every(item => condicao)` |
| Iterar objeto | `Object.entries(obj).forEach(([k, v]) => ...)` |
| Precisão decimal | `parseFloat(valor.toFixed(2))` |
| Potenciação | `Math.pow(base, expoente)` |
| Formatar moeda | `new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor)` |
| Projeção acumulada | Loop que empurra resultado de cada iteração para um array |
| Separar responsabilidades | Uma função, uma tarefa — compor funções menores |
