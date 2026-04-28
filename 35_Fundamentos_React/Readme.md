# JavaScript — Módulo 35: Fundamentos do React

## Status: CONCLUÍDO
- **Projetos:** 1 (Sistema de Pedidos — OrderCard, OrderList, OrderAction)
- **Foco:** Árvore de Renderização, Componentização, Eventos, Hooks, useState, useEffect, Renderização Condicional e de Listas

---

## Árvore de Renderização do React

O React organiza os componentes em uma **árvore hierárquica** — igual ao DOM, mas composta por componentes. Essa estrutura determina o fluxo de dados (sempre pai → filho via props) e como o React decide o que re-renderizar.

```
App
├── Header
├── Main
│   ├── OrderList
│   │   ├── OrderListItem
│   │   ├── OrderListItem
│   │   └── OrderListItem
│   └── OrderAction
│       └── Button
└── Footer
```

Entender a árvore é essencial para decidir **onde colocar o estado** — ele deve viver no ancestral comum mais próximo dos componentes que precisam dele.

---

## Componentização e Reutilização

Componentizar é dividir a UI em peças independentes, reutilizáveis e com responsabilidade única. Boas práticas:

- **Um componente, uma responsabilidade** — `OrderCard` cuida do visual do pedido; `Button` cuida apenas do botão
- **Reutilização via props** — o mesmo `Button` pode ter texto, cor e ação diferentes dependendo de quem o usa
- **Composição** — componentes complexos são montados a partir de componentes simples

```jsx
// Button reutilizável
function Button({ texto, variante = "primario", aoClicar }) {
  return (
    <button className={`btn btn--${variante}`} onClick={aoClicar}>
      {texto}
    </button>
  )
}

// Usando o mesmo Button com variantes diferentes
<Button texto="Confirmar" variante="primario" aoClicar={confirmar} />
<Button texto="Cancelar" variante="perigo" aoClicar={cancelar} />
```

---

## Componentização Inteligente

Saber **quando** e **onde** quebrar um componente é tão importante quanto saber como fazê-lo.

**Sinais de que é hora de extrair um componente:**
- O JSX ficou grande demais e difícil de ler
- Um trecho se repete em mais de um lugar
- Uma parte tem lógica própria que pode ser isolada

**Cuidado com a over-componentização** — nem tudo precisa ser um componente. Extrair um componente de duas linhas sem lógica própria só adiciona indireção sem ganho real.

```jsx
// ❌ Over-componentizado sem motivo
function NomePerfil({ nome }) {
  return <span>{nome}</span>
}

// ✅ Extrair faz sentido quando há lógica e reutilização
function StatusBadge({ ativo }) {
  return (
    <span className={`badge ${ativo ? "badge--ativo" : "badge--inativo"}`}>
      {ativo ? "Disponível" : "Ocupado"}
    </span>
  )
}
```

---

## Projeto: Sistema de Pedidos

### Estrutura do Projeto

```
src/
├── components/
│   ├── OrderCard/
│   │   ├── OrderCard.jsx
│   │   └── OrderCard.module.css
│   ├── OrderList/
│   │   ├── OrderList.jsx
│   │   └── OrderList.module.css
│   ├── OrderListItem/
│   │   ├── OrderListItem.jsx
│   │   └── OrderListItem.module.css
│   ├── OrderAction/
│   │   ├── OrderAction.jsx
│   │   └── OrderAction.module.css
│   └── Button/
│       ├── Button.jsx
│       └── Button.module.css
├── App.jsx
└── main.jsx
```

### Componente OrderCard

```jsx
// components/OrderCard/OrderCard.jsx
import styles from './OrderCard.module.css'

function OrderCard({ numero, cliente, total, status }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.numero}>Pedido #{numero}</h3>
      <p className={styles.cliente}>{cliente}</p>
      <p className={styles.total}>R$ {total.toFixed(2)}</p>
      <span className={`${styles.status} ${styles[status]}`}>{status}</span>
    </div>
  )
}

export default OrderCard
```

### Componente OrderList e OrderListItem

```jsx
// components/OrderList/OrderList.jsx
import OrderListItem from '../OrderListItem/OrderListItem'
import styles from './OrderList.module.css'

function OrderList({ pedidos }) {
  return (
    <ul className={styles.lista}>
      {pedidos.map(pedido => (
        <OrderListItem key={pedido.id} pedido={pedido} />
      ))}
    </ul>
  )
}

export default OrderList
```

```jsx
// components/OrderListItem/OrderListItem.jsx
import OrderCard from '../OrderCard/OrderCard'
import styles from './OrderListItem.module.css'

function OrderListItem({ pedido }) {
  return (
    <li className={styles.item}>
      <OrderCard {...pedido} />
    </li>
  )
}

export default OrderListItem
```

### Componente OrderAction e Button

```jsx
// components/Button/Button.jsx
import styles from './Button.module.css'

function Button({ texto, variante = "primario", aoClicar, desabilitado = false }) {
  return (
    <button
      className={`${styles.btn} ${styles[variante]}`}
      onClick={aoClicar}
      disabled={desabilitado}
    >
      {texto}
    </button>
  )
}

export default Button
```

```jsx
// components/OrderAction/OrderAction.jsx
import Button from '../Button/Button'
import styles from './OrderAction.module.css'

function OrderAction({ aoConfirmar, aoCancelar }) {
  return (
    <div className={styles.acoes}>
      <Button texto="Confirmar Pedido" variante="primario" aoClicar={aoConfirmar} />
      <Button texto="Cancelar" variante="perigo" aoClicar={aoCancelar} />
    </div>
  )
}

export default OrderAction
```

---

## Eventos em React

### Conceito

No React, eventos são tratados **diretamente no JSX** via props especiais (camelCase). O React não usa `addEventListener` diretamente — ele delega todos os eventos ao nó raiz e os gerencia internamente (event delegation).

```jsx
// HTML nativo
<button onclick="handleClick()">Clique</button>

// React — função referenciada, não chamada
<button onClick={handleClick}>Clique</button>
```

**Regras importantes:**
- Passe a **referência** da função, não a chamada: `onClick={fn}` ✅ e não `onClick={fn()}` ❌
- O React passa automaticamente o objeto de evento (`e`) para o handler
- Nomes de eventos em camelCase: `onClick`, `onChange`, `onSubmit`, `onKeyDown`

### Prática

```jsx
function Formulario() {
  function handleSubmit(e) {
    e.preventDefault()  // previne o comportamento padrão do form
    console.log("Formulário enviado")
  }

  function handleChange(e) {
    console.log(e.target.value)  // valor atual do input
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

```jsx
// Passando argumentos extras com arrow function
function Lista({ itens }) {
  function handleDelete(id) {
    console.log("Deletar item:", id)
  }

  return (
    <ul>
      {itens.map(item => (
        <li key={item.id}>
          {item.nome}
          <button onClick={() => handleDelete(item.id)}>Deletar</button>
        </li>
      ))}
    </ul>
  )
}
```

### addEventListener no React

Usar `addEventListener` diretamente é necessário quando o evento não pertence a um elemento JSX — como eventos no `window` ou `document`. Neste caso, o listener deve ser registrado e **removido** manualmente para evitar vazamentos de memória.

```jsx
// ✅ addEventListener para eventos globais (dentro de useEffect)
useEffect(() => {
  function handleResize() {
    console.log("Janela redimensionada:", window.innerWidth)
  }

  window.addEventListener("resize", handleResize)

  // Função de limpeza — remove o listener quando o componente desmonta
  return () => {
    window.removeEventListener("resize", handleResize)
  }
}, [])
```

---

## Introdução a Hooks

Hooks são **funções especiais do React** que permitem usar recursos do framework (estado, efeitos, contexto, etc.) dentro de componentes funcionais. Antes dos hooks (React < 16.8), esses recursos só existiam em componentes de classe.

**Por que o nome "hook"?** O nome vem da ideia de "gancho" — você se conecta (hook into) ao ciclo de vida e ao estado do React a partir de uma função simples.

**Regras dos Hooks (obrigatórias):**

1. **Só chame hooks no nível superior** — nunca dentro de condicionais, loops ou funções aninhadas
2. **Só chame hooks em componentes React ou em outros hooks** — não em funções JavaScript comuns

```jsx
// ❌ Errado — hook dentro de condicional
if (condicao) {
  const [valor, setValor] = useState(0)
}

// ✅ Correto — hook no nível superior do componente
const [valor, setValor] = useState(0)
if (condicao) {
  // usa o valor aqui
}
```

---

## Hook Personalizado: useMensagem

Hooks personalizados são funções que começam com `use` e encapsulam lógica reutilizável com estado. Permitem extrair comportamentos complexos para fora dos componentes.

```jsx
// hooks/useMensagem.js
import { useState } from 'react'

function useMensagem(mensagemInicial = "") {
  const [mensagem, setMensagem] = useState(mensagemInicial)

  function definirMensagem(texto) {
    setMensagem(texto)
  }

  function limparMensagem() {
    setMensagem("")
  }

  return { mensagem, definirMensagem, limparMensagem }
}

export default useMensagem
```

```jsx
// Usando o hook personalizado em um componente
import useMensagem from './hooks/useMensagem'

function Notificacao() {
  const { mensagem, definirMensagem, limparMensagem } = useMensagem()

  return (
    <div>
      {mensagem && <p className="alerta">{mensagem}</p>}
      <button onClick={() => definirMensagem("Pedido confirmado!")}>Confirmar</button>
      <button onClick={limparMensagem}>Fechar</button>
    </div>
  )
}
```

---

## Ciclo de Vida no React

Componentes funcionais têm três fases no ciclo de vida, controladas principalmente pelo `useEffect`:

| Fase | Descrição | Equivalente em classe |
|---|---|---|
| **Montagem** (mount) | Componente é inserido no DOM | `componentDidMount` |
| **Atualização** (update) | Estado ou props mudam, componente re-renderiza | `componentDidUpdate` |
| **Desmontagem** (unmount) | Componente é removido do DOM | `componentWillUnmount` |

```
Montagem → [Atualizações...] → Desmontagem
```

---

## React Hooks Estados: useState

`useState` é o hook para adicionar **estado local** a um componente funcional. Retorna um array com dois elementos: o valor atual e a função para atualizá-lo.

```jsx
import { useState } from 'react'

const [estado, setEstado] = useState(valorInicial)
//     ↑ valor    ↑ setter   ↑ estado inicial
```

### Parte 1 — Conceito e Uso Básico

```jsx
function Contador() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Resetar</button>
    </div>
  )
}
```

**Pontos-chave:**
- Cada chamada de `setEstado` agenda uma **nova renderização** do componente
- O estado é preservado entre renderizações — diferente de variáveis comuns, que são recriadas
- Nunca mute o estado diretamente: `estado.push(x)` ❌ — sempre use o setter

### Parte 2 — Estado com Objetos e Arrays

```jsx
function Perfil() {
  const [usuario, setUsuario] = useState({
    nome: "Ana",
    cargo: "Dev Frontend",
    ativo: true
  })

  function toggleAtivo() {
    // Spread para preservar as outras propriedades
    setUsuario({ ...usuario, ativo: !usuario.ativo })
  }

  return (
    <div>
      <h2>{usuario.nome}</h2>
      <p>{usuario.cargo}</p>
      <button onClick={toggleAtivo}>
        {usuario.ativo ? "Desativar" : "Ativar"}
      </button>
    </div>
  )
}
```

```jsx
// Estado com array — imutabilidade obrigatória
function ListaTarefas() {
  const [tarefas, setTarefas] = useState(["Estudar React", "Fazer exercícios"])

  function adicionarTarefa(nova) {
    setTarefas([...tarefas, nova])   // cria novo array
  }

  function removerTarefa(index) {
    setTarefas(tarefas.filter((_, i) => i !== index))  // cria novo array sem o item
  }

  return (
    <ul>
      {tarefas.map((tarefa, i) => (
        <li key={i}>
          {tarefa}
          <button onClick={() => removerTarefa(i)}>✕</button>
        </li>
      ))}
    </ul>
  )
}
```

### prevValue do useState

Quando o novo estado depende do estado anterior, use a **forma funcional** do setter — garante que você está lendo o valor mais recente, mesmo em atualizações em lote.

```jsx
// ❌ Pode ter comportamento inesperado em atualizações rápidas
setCount(count + 1)

// ✅ Sempre usa o valor mais atualizado
setCount(prev => prev + 1)

// Exemplo prático — toggle seguro
setAtivo(prev => !prev)

// Com arrays — remoção segura
setItens(prev => prev.filter(item => item.id !== idParaRemover))
```

---

## Características dos Hooks

| Característica | Detalhe |
|---|---|
| Prefixo `use` | Convenção obrigatória — permite ao React identificar hooks |
| Nível superior | Não podem estar em condicionais ou loops |
| Apenas em componentes/hooks | Não funcionam em funções JS comuns |
| Chamadas na mesma ordem | O React rastreia hooks pela ordem de chamada |
| Composíveis | Hooks podem chamar outros hooks |

---

## Renderização Condicional

### Conceito

Renderização condicional é exibir ou ocultar partes da UI com base em condições — o equivalente React de `if/else` no template.

### Parte 1 — Operadores Básicos

```jsx
// Com if/else (ideal para lógica complexa)
function Painel({ usuarioLogado }) {
  if (!usuarioLogado) {
    return <p>Faça login para continuar.</p>
  }

  return <Dashboard />
}

// Com operador ternário (ideal para JSX inline simples)
function Status({ ativo }) {
  return (
    <span>{ativo ? "Online" : "Offline"}</span>
  )
}

// Com && (renderiza ou não renderiza — sem alternativa)
function Alerta({ mensagem }) {
  return (
    <div>
      {mensagem && <p className="alerta">{mensagem}</p>}
    </div>
  )
}
```

### Parte 2 — Padrões Avançados

```jsx
// Renderização com múltiplas condições
function Botao({ status }) {
  const variantes = {
    pendente: { texto: "Aguardando", classe: "btn--amarelo" },
    confirmado: { texto: "Confirmado", classe: "btn--verde" },
    cancelado: { texto: "Cancelado", classe: "btn--vermelho" },
  }

  const { texto, classe } = variantes[status] || variantes.pendente

  return <button className={`btn ${classe}`}>{texto}</button>
}
```

```jsx
// Early return — evita aninhamento excessivo
function Pedido({ dados, carregando, erro }) {
  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro.message}</p>
  if (!dados) return null

  return <OrderCard {...dados} />
}
```

---

## Renderização de Listas

### Conceito

Para renderizar listas dinâmicas, usa-se `.map()` — que transforma um array de dados em um array de elementos JSX. O React exige a prop `key` em cada item para identificar mudanças de forma eficiente.

**Regras da prop `key`:**
- Deve ser **única entre irmãos** (não precisa ser global)
- Deve ser **estável** — não use o índice do array se a lista pode ser reordenada ou filtrada
- Use IDs dos dados sempre que possível

### Filtrando e Renderizando Listas — Parte 1

```jsx
const pedidos = [
  { id: 1, cliente: "Ana", status: "confirmado", total: 89.90 },
  { id: 2, cliente: "Carlos", status: "pendente", total: 45.00 },
  { id: 3, cliente: "Maria", status: "confirmado", total: 120.50 },
]

function ListaPedidos() {
  return (
    <ul>
      {pedidos.map(pedido => (
        <li key={pedido.id}>
          {pedido.cliente} — R$ {pedido.total.toFixed(2)}
        </li>
      ))}
    </ul>
  )
}
```

### Filtrando e Renderizando Listas — Parte 2

Encadeando `.filter()` e `.map()` para exibir apenas os itens relevantes:

```jsx
function PedidosConfirmados({ pedidos, filtroStatus }) {
  const pedidosFiltrados = pedidos
    .filter(p => p.status === filtroStatus)
    .sort((a, b) => b.total - a.total)  // ordenação opcional

  if (pedidosFiltrados.length === 0) {
    return <p>Nenhum pedido encontrado.</p>
  }

  return (
    <ul>
      {pedidosFiltrados.map(pedido => (
        <OrderCard
          key={pedido.id}
          numero={pedido.id}
          cliente={pedido.cliente}
          total={pedido.total}
          status={pedido.status}
        />
      ))}
    </ul>
  )
}
```

---

## React Hooks Efeitos: useEffect

### Conceito

`useEffect` permite executar **efeitos colaterais** em componentes funcionais — operações que acontecem fora do fluxo de renderização, como busca de dados, manipulação do DOM, timers ou assinaturas.

```jsx
useEffect(() => {
  // código do efeito
  return () => {
    // função de limpeza (opcional)
  }
}, [dependências])  // array de dependências
```

**Comportamento conforme o array de dependências:**

| Array | Quando executa |
|---|---|
| Sem array | A cada renderização |
| `[]` (vazio) | Apenas na montagem |
| `[valor]` | Na montagem e sempre que `valor` mudar |

### Parte 1 — Uso Básico

```jsx
import { useState, useEffect } from 'react'

function Titulo({ nome }) {
  // Atualiza o título da aba do navegador
  useEffect(() => {
    document.title = `Olá, ${nome}!`
  }, [nome])  // re-executa só quando nome mudar

  return <h1>Bem-vindo, {nome}</h1>
}
```

### Parte 2 — Buscando Dados

```jsx
function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users")
        const dados = await resposta.json()
        setUsuarios(dados)
      } catch (err) {
        setErro(err)
      } finally {
        setCarregando(false)
      }
    }

    buscarUsuarios()
  }, [])  // array vazio — executa só na montagem

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro ao carregar dados.</p>

  return (
    <ul>
      {usuarios.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  )
}
```

### useEffect — Função de Limpeza

A função retornada pelo `useEffect` é chamada **antes** do componente ser desmontado ou antes do efeito ser re-executado. Essencial para cancelar timers, remover listeners e evitar memory leaks.

```jsx
// Limpeza de intervalo
function Cronometro() {
  const [segundos, setSegundos] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos(prev => prev + 1)
    }, 1000)

    return () => clearInterval(intervalo)  // limpa ao desmontar
  }, [])

  return <p>Tempo: {segundos}s</p>
}
```

```jsx
// Limpeza com AbortController — cancela fetch se o componente desmontar
function Perfil({ userId }) {
  const [perfil, setPerfil] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function buscar() {
      try {
        const res = await fetch(`/api/usuarios/${userId}`, {
          signal: controller.signal
        })
        const dados = await res.json()
        setPerfil(dados)
      } catch (err) {
        if (err.name !== "AbortError") console.error(err)
      }
    }

    buscar()

    return () => controller.abort()  // cancela a requisição ao desmontar
  }, [userId])

  return perfil ? <h2>{perfil.nome}</h2> : <p>Carregando...</p>
}
```

---

## Desafio: Simulando Busca de Dados

Aplicação que simula uma busca assíncrona com loading, dados e tratamento de erro — padrão clássico de consumo de API no React.

```jsx
import { useState, useEffect } from 'react'

const DADOS_MOCK = [
  { id: 1, nome: "Pedido #001", status: "confirmado" },
  { id: 2, nome: "Pedido #002", status: "pendente" },
  { id: 3, nome: "Pedido #003", status: "cancelado" },
]

function simularBuscaAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const falha = Math.random() < 0.2  // 20% de chance de erro
      if (falha) reject(new Error("Falha na conexão"))
      else resolve(DADOS_MOCK)
    }, 1500)
  })
}

function App() {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)

  async function buscarPedidos() {
    setCarregando(true)
    setErro(null)

    try {
      const dados = await simularBuscaAPI()
      setPedidos(dados)
    } catch (err) {
      setErro(err.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    buscarPedidos()
  }, [])

  return (
    <div>
      <h1>Pedidos</h1>
      <button onClick={buscarPedidos} disabled={carregando}>
        {carregando ? "Buscando..." : "Atualizar"}
      </button>

      {carregando && <p>Carregando pedidos...</p>}
      {erro && <p style={{ color: "red" }}>Erro: {erro}</p>}
      {!carregando && !erro && (
        <ul>
          {pedidos.map(p => (
            <li key={p.id}>{p.nome} — {p.status}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| Árvore de componentes | Estrutura hierárquica pai → filho |
| Evento em JSX | `onClick={fn}` (referência, não chamada) |
| Evento com argumento | `onClick={() => fn(arg)}` |
| Evento global | `addEventListener` dentro de `useEffect` |
| Estado local | `const [valor, setValor] = useState(inicial)` |
| Atualização segura de estado | `setValor(prev => prev + 1)` |
| Estado derivado do anterior | Forma funcional do setter com `prev` |
| Hook personalizado | Função iniciada com `use` que encapsula lógica com estado |
| Efeito na montagem | `useEffect(() => { ... }, [])` |
| Efeito reativo | `useEffect(() => { ... }, [dependencia])` |
| Limpeza de efeito | `return () => { limpeza }` dentro do useEffect |
| Renderização condicional | `condicao && <JSX />` ou ternário |
| Early return | `if (condicao) return <JSX alternativo />` |
| Renderização de lista | `.map(item => <Comp key={item.id} />)` |
| Filtro + renderização | `.filter(...).map(...)` encadeados |
| Busca assíncrona | `async/await` dentro de `useEffect` com estados de loading e erro |
