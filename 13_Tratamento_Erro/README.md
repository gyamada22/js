# JavaScript — Módulo 13: Tratamento de Erro

## Status: CONCLUÍDO
- **Aulas:** 11 (incluindo teoria, exercícios e resoluções)
- **Foco:** Programação defensiva, condicionais preventivas, try/catch/finally, throw, Error objects

---

## O que é Programação Defensiva?

Programação defensiva é a prática de escrever código que **antecipa falhas** — assumindo que entradas podem ser inválidas, recursos podem estar indisponíveis e o ambiente pode se comportar de maneira inesperada. Em vez de deixar o programa quebrar silenciosamente ou com mensagens confusas, o código defensivo detecta problemas cedo e os trata de forma controlada.

```
Código ingênuo:
Entrada inválida → erro genérico no runtime → stack trace confuso → usuário perdido

Código defensivo:
Entrada inválida → erro detectado cedo → mensagem clara → comportamento previsível
```

---

## Antecipando Erros com Condicionais

A primeira camada de defesa é validar entradas **antes** de usá-las. Isso evita que erros cheguem a partes críticas do código.

```js
// ❌ Sem validação — pode explodir em runtime
function dividir(a, b) {
  return a / b // divisão por zero retorna Infinity, sem aviso
}

// ✅ Com validação preventiva
function dividir(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Os argumentos devem ser números.")
  }
  if (b === 0) {
    throw new Error("Não é possível dividir por zero.")
  }
  return a / b
}
```

### Estratégias de validação

```js
// Verificar tipo
if (typeof valor !== "string") { ... }

// Verificar existência
if (!usuario) { ... }
if (array.length === 0) { ... }

// Verificar formato (ex: email)
if (!email.includes("@")) { ... }

// Verificar intervalo
if (idade < 0 || idade > 120) { ... }
```

> **Regra prática:** valide na **entrada da função**, antes de qualquer processamento. Quanto mais cedo o erro é detectado, mais fácil é identificar a causa.

---

## Try, Catch e Throw

O bloco `try/catch` é o mecanismo central de tratamento de erros em JavaScript. Ele **tenta** executar um trecho de código e **captura** qualquer exceção que ocorra, sem deixar o programa travar.

### Estrutura básica

```js
try {
  // Código que pode falhar
  const resultado = operacaoArriscada()
  console.log(resultado)
} catch (erro) {
  // Executado se qualquer erro ocorrer dentro do try
  console.error("Algo deu errado:", erro.message)
}
```

### O operador throw

`throw` interrompe a execução e lança uma exceção. Pode lançar qualquer valor, mas o padrão é lançar um objeto `Error`.

```js
// Lançando uma string (não recomendado)
throw "algo deu errado"

// Lançando um objeto Error (recomendado)
throw new Error("Descrição clara do problema")

// Relançando um erro capturado (para não engolir exceções inesperadas)
try {
  operacaoArriscada()
} catch (erro) {
  if (erro instanceof TypeError) {
    console.error("Tipo inválido:", erro.message)
  } else {
    throw erro // relança erros que não sabe tratar
  }
}
```

### Exemplo completo com try/catch/throw

```js
function buscarUsuario(id) {
  if (!id) {
    throw new Error("ID é obrigatório.")
  }

  const usuario = banco.find((u) => u.id === id)

  if (!usuario) {
    throw new Error(`Usuário com id ${id} não encontrado.`)
  }

  return usuario
}

try {
  const usuario = buscarUsuario(42)
  console.log("Usuário encontrado:", usuario.nome)
} catch (erro) {
  console.error("Erro ao buscar usuário:", erro.message)
}
```

---

## Lançar o Erro Completo ou Só a Mensagem?

Ao capturar um erro, existe uma escolha: registrar apenas `erro.message` (a mensagem legível) ou o objeto `erro` inteiro (que inclui stack trace, tipo e mais).

### Anatomia do objeto Error

```js
const erro = new Error("Arquivo não encontrado")

console.log(erro.message) // "Arquivo não encontrado"
console.log(erro.name)    // "Error"
console.log(erro.stack)   // stack trace completo (onde o erro foi gerado)
```

### Quando usar cada abordagem

```js
// Só a mensagem — para exibir ao usuário final
catch (erro) {
  exibirToast(erro.message) // mensagem limpa e legível
}

// O erro completo — para debug e logs internos
catch (erro) {
  console.error(erro) // inclui stack trace → facilita encontrar a origem
}

// Ambos — o ideal em produção
catch (erro) {
  registrarLog(erro)         // log interno com stack trace
  exibirMensagem(erro.message) // feedback limpo para o usuário
}
```

### Tipos nativos de erro

| Tipo | Quando ocorre |
|---|---|
| `Error` | Genérico — base de todos os erros |
| `TypeError` | Operação em valor do tipo errado |
| `RangeError` | Valor fora do intervalo permitido |
| `ReferenceError` | Variável não declarada |
| `SyntaxError` | Código com sintaxe inválida |

```js
// Criando erros com tipos específicos
throw new TypeError("Esperava uma string, recebeu um número.")
throw new RangeError("O valor deve estar entre 1 e 100.")

// Verificando o tipo no catch
catch (erro) {
  if (erro instanceof TypeError) {
    console.warn("Problema de tipo:", erro.message)
  } else if (erro instanceof RangeError) {
    console.warn("Valor fora do intervalo:", erro.message)
  } else {
    throw erro // relança o que não foi previsto
  }
}
```

---

## Finally

O bloco `finally` é executado **sempre** — independente de o código no `try` ter funcionado ou ter lançado um erro. É usado para liberar recursos, fechar conexões ou executar limpeza obrigatória.

```js
try {
  // Código que pode falhar
} catch (erro) {
  // Trata o erro
} finally {
  // Sempre executado — com ou sem erro
}
```

### Casos de uso do finally

```js
// Garantir que um loader seja desativado
async function carregarDados() {
  setCarregando(true)

  try {
    const dados = await buscarDaAPI()
    setDados(dados)
  } catch (erro) {
    console.error("Falha ao carregar:", erro.message)
  } finally {
    setCarregando(false) // sempre desativa o loader
  }
}
```

```js
// Garantir que uma conexão seja fechada
function lerArquivo(caminho) {
  const conexao = abrirConexao(caminho)

  try {
    return conexao.ler()
  } catch (erro) {
    console.error("Erro de leitura:", erro.message)
  } finally {
    conexao.fechar() // sempre fecha, mesmo se der erro
  }
}
```

### Comportamento com return no try

```js
function exemplo() {
  try {
    return "resultado do try"
  } finally {
    console.log("finally executado") // roda ANTES do return
  }
}

// Saída:
// "finally executado"
// retorna "resultado do try"
```

> **Atenção:** um `return` dentro do `finally` sobrescreve o `return` do `try`. Evite retornar valores dentro do `finally`.

---

## Fluxo Completo do Tratamento de Erros

```
Execução entra no try
        │
        ├── Sem erro → finally → continua normalmente
        │
        └── Com erro → catch (captura o erro) → finally → continua
```

```js
// Exemplo com os três blocos em conjunto
async function enviarFormulario(dados) {
  let conexao = null

  try {
    validarDados(dados)           // pode lançar erro de validação
    conexao = await conectar()    // pode lançar erro de rede
    await conexao.salvar(dados)   // pode lançar erro de banco
    console.log("Dados salvos com sucesso!")
  } catch (erro) {
    if (erro instanceof ValidationError) {
      exibirErroNoFormulario(erro.message)
    } else {
      console.error("Erro inesperado:", erro)
      exibirMensagemGenerica()
    }
  } finally {
    if (conexao) conexao.fechar() // sempre libera o recurso
  }
}
```

---

## Erros Customizados

Para aplicações maiores, é útil criar classes de erro próprias — assim é possível distinguir erros de negócio de erros técnicos.

```js
// Criando uma classe de erro personalizada
class ValidationError extends Error {
  constructor(mensagem) {
    super(mensagem)
    this.name = "ValidationError"
  }
}

class NotFoundError extends Error {
  constructor(recurso, id) {
    super(`${recurso} com id ${id} não encontrado.`)
    this.name = "NotFoundError"
  }
}

// Usando os erros customizados
function buscarProduto(id) {
  if (!id) throw new ValidationError("ID é obrigatório.")

  const produto = produtos.find((p) => p.id === id)
  if (!produto) throw new NotFoundError("Produto", id)

  return produto
}

// Tratando com instanceof
try {
  const produto = buscarProduto(null)
} catch (erro) {
  if (erro instanceof ValidationError) {
    console.warn("Dados inválidos:", erro.message)
  } else if (erro instanceof NotFoundError) {
    console.warn("Não encontrado:", erro.message)
  } else {
    throw erro
  }
}
```

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| Validação preventiva | Condicionais no início da função antes de qualquer operação |
| Lançar erro | `throw new Error("mensagem")` |
| Capturar erro | `try { } catch (erro) { }` |
| Acessar a mensagem | `erro.message` |
| Acessar o stack trace | `erro.stack` |
| Verificar tipo do erro | `erro instanceof TypeError` |
| Relançar erro não tratado | `throw erro` dentro do catch |
| Garantir execução obrigatória | `finally { }` — roda sempre |
| Erros nativos específicos | `TypeError`, `RangeError`, `ReferenceError` |
| Erros customizados | `class MeuErro extends Error { }` |
| Log interno vs feedback ao usuário | `console.error(erro)` vs `exibir(erro.message)` |
