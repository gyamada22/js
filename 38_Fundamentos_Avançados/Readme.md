# JavaScript — Módulo 38: Fundamentos Avançados

## Status: CONCLUÍDO
- **Projetos:** 3 (Cenários de Prop Drilling + Contexto Global com Estado e Funções)
- **Foco:** Prop Drilling, Context API, createContext, useContext, Provider, Consumer, Hooks Personalizados

---

## Entendendo o Prop Drilling

Prop drilling é o padrão (problemático) de passar props por vários níveis de componentes intermediários que não precisam daquele dado — apenas o repassam para um componente mais profundo na árvore.

```jsx
// Árvore: App → Header → UserMenu → Avatar
// O problema: Header e UserMenu não usam `usuario`, apenas repassam

function App() {
  const [usuario, setUsuario] = useState({ nome: "Ana", avatar: "ana.jpg" })
  return <Header usuario={usuario} />
}

function Header({ usuario }) {
  // Header não usa `usuario` — só repassa para baixo
  return <UserMenu usuario={usuario} />
}

function UserMenu({ usuario }) {
  // UserMenu também só repassa
  return <Avatar usuario={usuario} />
}

function Avatar({ usuario }) {
  // Só aqui o dado é realmente usado
  return <img src={usuario.avatar} alt={usuario.nome} />
}
```

**Por que isso é um problema:**
- Componentes intermediários ficam acoplados a dados que não são deles
- Refatorar a árvore exige atualizar props em múltiplos lugares
- O código fica verboso e difícil de rastrear

---

## Os Três Cenários do Prop Drilling

### Cenário 1 — Dado em componente irmão

Quando um dado precisa ser acessado por um componente no mesmo nível hierárquico, a solução é **elevar o estado** (*state lifting*) para o ancestral comum.

```jsx
// ❌ Cada componente tentando gerenciar seu próprio estado isolado
function ComponenteA() {
  const [valor, setValor] = useState("")
  return <input onChange={(e) => setValor(e.target.value)} />
}

function ComponenteB() {
  // Como ComponenteB acessa `valor` de ComponenteA?
  // Não consegue — estados são privados
}

// ✅ Estado elevado para o pai comum
function Pai() {
  const [valor, setValor] = useState("")

  return (
    <>
      <ComponenteA valor={valor} setValor={setValor} />
      <ComponenteB valor={valor} />
    </>
  )
}
```

### Cenário 2 — Dado em componente neto ou mais profundo

Quando o dado precisa alcançar componentes muito distantes na árvore, o drilling se torna impraticável.

```jsx
// ❌ Drilling por 4 níveis — verboso e frágil
function App() {
  const [tema, setTema] = useState("escuro")
  return <Secao tema={tema} setTema={setTema} />
}

function Secao({ tema, setTema }) {
  return <Painel tema={tema} setTema={setTema} />
}

function Painel({ tema, setTema }) {
  return <Botao tema={tema} setTema={setTema} />
}

function Botao({ tema, setTema }) {
  return (
    <button onClick={() => setTema(tema === "claro" ? "escuro" : "claro")}>
      Tema atual: {tema}
    </button>
  )
}

// ✅ Solução: Context API (ver próximas seções)
```

### Cenário 3 — Funções compartilhadas

O drilling não acontece apenas com dados — funções também são passadas por vários níveis, aumentando o acoplamento.

```jsx
// ❌ Função definida no topo, repassada por 3 componentes intermediários
function App() {
  function handleLogout() {
    // lógica de logout
  }
  return <Layout handleLogout={handleLogout} />
}

function Layout({ handleLogout }) {
  return <Sidebar handleLogout={handleLogout} />
}

function Sidebar({ handleLogout }) {
  return <BotaoLogout handleLogout={handleLogout} />
}

function BotaoLogout({ handleLogout }) {
  return <button onClick={handleLogout}>Sair</button>
}
```

---

## Context API no React

A Context API é a solução nativa do React para compartilhar dados entre componentes sem prop drilling. Ela cria um "canal" que qualquer componente da árvore pode acessar diretamente.

### Os três elementos da Context API

| Elemento | O que faz |
|---|---|
| `createContext()` | Cria o contexto — define o canal de comunicação |
| `<Context.Provider>` | Envolve a árvore e fornece o valor do contexto |
| `useContext()` / `<Context.Consumer>` | Consome o valor de qualquer componente da árvore |

### Criando um contexto

```jsx
// contexts/TemaContext.js
import { createContext } from "react"

// createContext recebe o valor padrão (usado quando não há Provider acima)
export const TemaContext = createContext("claro")
```

### Fornecendo o valor com Provider

```jsx
// App.jsx
import { useState } from "react"
import { TemaContext } from "./contexts/TemaContext"

function App() {
  const [tema, setTema] = useState("claro")

  return (
    // Tudo dentro do Provider tem acesso ao valor via contexto
    <TemaContext.Provider value={{ tema, setTema }}>
      <Pagina />
    </TemaContext.Provider>
  )
}
```

### Consumindo com useContext

```jsx
import { useContext } from "react"
import { TemaContext } from "./contexts/TemaContext"

function BotaoTema() {
  // Acessa o valor diretamente — sem props intermediárias
  const { tema, setTema } = useContext(TemaContext)

  return (
    <button onClick={() => setTema(tema === "claro" ? "escuro" : "claro")}>
      Tema: {tema}
    </button>
  )
}
```

---

## Primeiro Contexto com React — Passo a Passo

### Estrutura recomendada de arquivos

```
src/
├── contexts/
│   └── UsuarioContext.jsx   # cria e exporta o contexto + provider
├── hooks/
│   └── useUsuario.js        # hook personalizado para consumir
└── App.jsx
```

### 1. Criando o contexto e o Provider juntos

```jsx
// contexts/UsuarioContext.jsx
import { createContext, useState } from "react"

// 1. Cria o contexto
export const UsuarioContext = createContext(null)

// 2. Cria o Provider como componente separado
export function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState({
    nome: "Ana Silva",
    email: "ana@email.com",
    logado: true,
  })

  return (
    // children representa todos os componentes filhos que serão envolvidos
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  )
}
```

### 2. Envolvendo a aplicação com o Provider

```jsx
// App.jsx ou main.jsx
import { UsuarioProvider } from "./contexts/UsuarioContext"

function App() {
  return (
    <UsuarioProvider>
      <Header />
      <Main />
      <Footer />
    </UsuarioProvider>
  )
}
```

### 3. Consumindo em qualquer componente

```jsx
import { useContext } from "react"
import { UsuarioContext } from "./contexts/UsuarioContext"

function Avatar() {
  const { usuario } = useContext(UsuarioContext)
  return <span>Olá, {usuario.nome}</span>
}
```

---

## Consumindo com Consumer — Estado Global

Antes do `useContext`, a forma de consumir um contexto era com o componente `<Context.Consumer>`. Ainda válido, mas mais verboso que o hook.

```jsx
import { UsuarioContext } from "./contexts/UsuarioContext"

// Consumer usa render props — recebe o valor via função filha
function PerfilUsuario() {
  return (
    <UsuarioContext.Consumer>
      {({ usuario }) => (
        <div>
          <h2>{usuario.nome}</h2>
          <p>{usuario.email}</p>
        </div>
      )}
    </UsuarioContext.Consumer>
  )
}
```

### useContext vs Consumer

| | `useContext` (hook) | `<Context.Consumer>` |
|---|---|---|
| Sintaxe | Limpa e direta | Verbosa (render props) |
| Onde pode ser usado | Apenas em componentes funcionais | Em qualquer componente |
| Leitura do código | Fácil | Mais aninhado |
| Recomendado | ✅ Sim, preferir sempre | Para casos legados |

---

## Criando um Hook Personalizado para Consumir Contexto

Criar um hook personalizado para encapsular o `useContext` é uma prática muito comum — evita importar o contexto em cada componente e centraliza a lógica de erro.

```jsx
// hooks/useUsuario.js
import { useContext } from "react"
import { UsuarioContext } from "../contexts/UsuarioContext"

export function useUsuario() {
  const context = useContext(UsuarioContext)

  // Garante que o hook só é usado dentro do Provider correto
  if (!context) {
    throw new Error("useUsuario deve ser usado dentro de um UsuarioProvider")
  }

  return context
}
```

### Usando o hook personalizado

```jsx
// Antes — importar contexto + useContext em todo componente
import { useContext } from "react"
import { UsuarioContext } from "./contexts/UsuarioContext"

function Avatar() {
  const { usuario } = useContext(UsuarioContext)
  // ...
}

// Depois — apenas o hook personalizado
import { useUsuario } from "./hooks/useUsuario"

function Avatar() {
  const { usuario } = useUsuario() // mais limpo, com validação embutida
  // ...
}
```

---

## Context API na Prática: Compartilhando Funções

O contexto não serve apenas para compartilhar estado — funções (como handlers de login, logout, atualização de dados) também podem ser fornecidas via contexto.

```jsx
// contexts/AuthContext.jsx
import { createContext, useState } from "react"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // Funções definidas aqui ficam disponíveis para toda a árvore
  function login(dados) {
    setUsuario(dados)
  }

  function logout() {
    setUsuario(null)
  }

  function atualizarPerfil(novosDados) {
    setUsuario((prev) => ({ ...prev, ...novosDados }))
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, atualizarPerfil }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### Consumindo estado e funções juntos

```jsx
// hooks/useAuth.js
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider")
  return context
}

// Em qualquer componente da árvore
function BotaoLogout() {
  const { logout } = useAuth()
  return <button onClick={logout}>Sair</button>
}

function FormularioLogin() {
  const { login } = useAuth()

  function handleSubmit(dados) {
    login(dados) // atualiza o estado global via contexto
  }
  // ...
}
```

---

## Consumindo Contexto de Função com Consumer

O mesmo padrão do `Consumer` se aplica para contextos que expõem funções.

```jsx
import { AuthContext } from "./contexts/AuthContext"

function MenuUsuario() {
  return (
    <AuthContext.Consumer>
      {({ usuario, logout }) => (
        <nav>
          <span>Olá, {usuario?.nome}</span>
          <button onClick={logout}>Sair</button>
        </nav>
      )}
    </AuthContext.Consumer>
  )
}
```

---

## Hook Personalizado para Contexto com Função

O padrão de hook personalizado funciona igualmente bem para contextos que expõem funções — e é a abordagem mais ergonômica no dia a dia.

```jsx
// hooks/useAuth.js
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }

  // Desestrutura apenas o que o hook deve expor (opcional)
  const { usuario, login, logout, atualizarPerfil } = context

  return { usuario, login, logout, atualizarPerfil }
}
```

### Vantagens do hook personalizado

```jsx
// Sem hook personalizado — verboso, repetitivo em todo arquivo
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
const { logout } = useContext(AuthContext)

// Com hook personalizado — uma linha, sem acoplamento ao contexto
import { useAuth } from "../../hooks/useAuth"
const { logout } = useAuth()
```

---

## Prop Drilling vs Context API — Quando Usar Cada Um

| Situação | Abordagem |
|---|---|
| Dado passado para 1-2 níveis | Props — simples e suficiente |
| Dado compartilhado entre irmãos | State lifting (elevar estado) |
| Dado acessado por muitos componentes profundos | Context API |
| Estado global da aplicação (tema, autenticação, idioma) | Context API |
| Performance crítica com muitas re-renderizações | Avaliar Zustand / Redux |

---

## Boas Práticas com Context API

**1. Um contexto por responsabilidade**

```jsx
// ✅ Contextos separados por domínio
<AuthProvider>
  <TemaProvider>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </TemaProvider>
</AuthProvider>

// ❌ Um único contexto gigante com tudo dentro
<AppProvider> {/* usuario, tema, carrinho, idioma, notificações... */}
  <App />
</AppProvider>
```

**2. Sempre criar um hook personalizado**

```jsx
// ✅ O hook valida o uso correto e simplifica o consumo
export function useTema() {
  const context = useContext(TemaContext)
  if (!context) throw new Error("useTema fora do TemaProvider")
  return context
}
```

**3. Memoizar o valor do Provider quando necessário**

```jsx
import { useMemo } from "react"

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // useMemo evita que o objeto value seja recriado a cada render do Provider
  const value = useMemo(() => ({ usuario, setUsuario }), [usuario])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
```

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| Prop Drilling | Props repassadas por componentes intermediários que não as usam |
| State Lifting | Elevar estado para o ancestral comum entre componentes |
| Criar contexto | `const MeuContext = createContext(valorPadrão)` |
| Criar Provider | Componente que envolve `<MeuContext.Provider value={...}>` |
| Fornecer valor ao contexto | `<MeuContext.Provider value={{ estado, funcao }}>` |
| Consumir com hook | `const { dado } = useContext(MeuContext)` |
| Consumir com Consumer | `<MeuContext.Consumer>{(valor) => <JSX />}</MeuContext.Consumer>` |
| Hook personalizado | `function useMeuContext() { return useContext(MeuContext) }` |
| Validação do hook | `if (!context) throw new Error("...")` dentro do hook personalizado |
| Compartilhar funções | Definir handlers no Provider e incluir no `value` |
| Memoizar value do Provider | `useMemo(() => ({ estado, funcao }), [estado])` |
| Separação de contextos | Um arquivo por contexto em `/contexts`, um hook por contexto em `/hooks` |
