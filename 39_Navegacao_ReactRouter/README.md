# JavaScript — Módulo 39: Navegação no React com React Router

## Status: CONCLUÍDO
- **Projetos:** 1 (Aplicação multi-página com rotas, parâmetros, filtros, rotas protegidas e layout base)
- **Foco:** BrowserRouter, Route, Link, useParams, useSearchParams, useNavigate, useRoutes, Rotas Aninhadas, Rotas Protegidas, Layout Base

---

## O que é o React Router?

O React Router é a biblioteca padrão de roteamento para aplicações React. Como o React por si só não oferece navegação entre páginas, o React Router permite criar uma experiência de SPA (*Single Page Application*) — onde a URL muda e diferentes componentes são renderizados, sem recarregar o browser.

```
Sem React Router:
URL muda → página recarrega → estado é perdido

Com React Router:
URL muda → componente troca → estado preservado → experiência fluida
```

---

## Entendendo React Router e React Router DOM

A biblioteca se divide em dois pacotes:

| Pacote | O que faz |
|---|---|
| `react-router` | Núcleo — lógica de roteamento agnóstica de plataforma |
| `react-router-dom` | Para web — inclui `BrowserRouter`, `Link`, e APIs baseadas no browser |

No desenvolvimento web, sempre se instala e importa de `react-router-dom`. O pacote `react-router` é uma dependência interna — não precisa ser instalado separadamente.

---

## Instalando e Configurando o Projeto

```bash
npm install react-router-dom
```

### Estrutura recomendada de arquivos

```
src/
├── pages/
│   ├── Home.jsx
│   ├── Sobre.jsx
│   ├── Contatos.jsx
│   ├── Produtos.jsx
│   ├── DetalhesProduto.jsx
│   └── NotFound.jsx
├── components/
│   └── Navbar.jsx
├── layouts/
│   └── LayoutBase.jsx
└── App.jsx
```

---

## O que é o BrowserRouter?

`BrowserRouter` é o componente que habilita o roteamento na aplicação. Ele usa a **History API do browser** para sincronizar a URL com o estado da interface — sem recarregar a página.

Deve envolver toda a aplicação (ou a parte que precisa de roteamento), geralmente no `main.jsx`.

```jsx
// main.jsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

> **Por que no main.jsx?** Colocar o `BrowserRouter` na raiz garante que todos os componentes da árvore tenham acesso ao contexto de roteamento — incluindo hooks como `useNavigate` e `useParams`.

---

## Criando a Primeira Rota

As rotas são definidas com os componentes `<Routes>` e `<Route>`. Cada `<Route>` mapeia um `path` (URL) para um `element` (componente a renderizar).

```jsx
// App.jsx
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Sobre from "./pages/Sobre"
import Contatos from "./pages/Contatos"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contatos" element={<Contatos />} />
    </Routes>
  )
}
```

**Como `<Routes>` funciona:** percorre os filhos `<Route>` e renderiza apenas o primeiro que corresponde à URL atual — similar a um `switch/case`.

---

## Navegando entre Rotas com Link e NavLink

Para navegar sem recarregar a página, usa-se `<Link>` ou `<NavLink>` no lugar de `<a>`.

```jsx
// ❌ Usando <a> — recarrega a página inteira e quebra o estado do React
function Navbar() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/sobre">Sobre</a>
    </nav>
  )
}

// ✅ Usando <Link> e <NavLink> — navegação client-side
import { Link, NavLink } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>

      {/* NavLink adiciona a classe "active" automaticamente na rota atual */}
      <NavLink to="/sobre">Sobre</NavLink>
      <NavLink to="/contatos">Contatos</NavLink>
    </nav>
  )
}
```

### Link vs NavLink

| | `<Link>` | `<NavLink>` |
|---|---|---|
| Navegação sem reload | ✅ | ✅ |
| Classe `active` automática | ❌ | ✅ |
| Estilo condicional por rota | ❌ | ✅ (via prop `className`) |
| Quando usar | Links simples | Menus de navegação |

```jsx
// NavLink com estilo condicional baseado na rota ativa
<NavLink
  to="/sobre"
  className={({ isActive }) => isActive ? "nav-link ativo" : "nav-link"}
>
  Sobre
</NavLink>
```

---

## Página 404 — Not Found

Para capturar qualquer URL que não corresponda a nenhuma rota, usa-se o path `*` (curinga). Deve ser sempre a última rota declarada.

```jsx
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="*" element={<NotFound />} /> {/* sempre por último */}
    </Routes>
  )
}
```

```jsx
// pages/NotFound.jsx
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div>
      <h1>404 — Página não encontrada</h1>
      <Link to="/">Voltar para o início</Link>
    </div>
  )
}
```

---

## Parâmetros Dinâmicos com useParams

Para criar rotas que recebem dados variáveis na URL (como um ID de produto), usa-se `:parametro` no path e o hook `useParams` para acessar o valor.

```jsx
// Definindo a rota com parâmetro dinâmico
<Route path="/produtos/:id" element={<DetalhesProduto />} />
```

```jsx
// pages/DetalhesProduto.jsx
import { useParams } from "react-router-dom"

function DetalhesProduto() {
  // useParams retorna um objeto com todos os parâmetros da URL
  const { id } = useParams()

  // Com o id, busca-se os dados do produto (ex: de uma API ou array)
  const produto = produtos.find((p) => p.id === Number(id))

  if (!produto) return <p>Produto não encontrado.</p>

  return (
    <div>
      <h1>{produto.nome}</h1>
      <p>{produto.descricao}</p>
    </div>
  )
}
```

```jsx
// Navegando para a rota dinâmica via Link
function ListaProdutos({ produtos }) {
  return (
    <ul>
      {produtos.map((produto) => (
        <li key={produto.id}>
          <Link to={`/produtos/${produto.id}`}>{produto.nome}</Link>
        </li>
      ))}
    </ul>
  )
}
```

---

## Filtros com useSearchParams

`useSearchParams` permite ler e escrever **query strings** da URL (`?categoria=eletronicos&preco=alto`). É a solução ideal para filtros, buscas e paginação — pois o estado fica na URL e pode ser compartilhado via link.

```jsx
import { useSearchParams } from "react-router-dom"

function Produtos() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Lendo valores da query string
  const categoria = searchParams.get("categoria") || ""
  const busca = searchParams.get("busca") || ""

  // Atualizando um parâmetro sem apagar os outros
  function handleCategoria(valor) {
    setSearchParams((prev) => {
      prev.set("categoria", valor)
      return prev
    })
  }

  // Limpando todos os filtros
  function limparFiltros() {
    setSearchParams({})
  }

  return (
    <div>
      <input
        value={busca}
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set("busca", e.target.value)
            return prev
          })
        }
        placeholder="Buscar produto..."
      />

      <select value={categoria} onChange={(e) => handleCategoria(e.target.value)}>
        <option value="">Todas</option>
        <option value="eletronicos">Eletrônicos</option>
        <option value="roupas">Roupas</option>
      </select>

      <button onClick={limparFiltros}>Limpar filtros</button>
    </div>
  )
}
```

### useSearchParams vs useState para filtros

| | `useState` | `useSearchParams` |
|---|---|---|
| Estado preservado ao recarregar | ❌ | ✅ |
| URL compartilhável com filtros | ❌ | ✅ |
| Botão "voltar" do browser funciona | ❌ | ✅ |
| Complexidade | Baixa | Média |
| Quando usar | Estado local e efêmero | Filtros, buscas, paginação |

---

## Implementando Filtros Múltiplos

Quando múltiplos filtros coexistem, o padrão de atualizar `searchParams` com `prev.set()` garante que os demais parâmetros não sejam perdidos.

```jsx
function useFiltros() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filtros = {
    categoria: searchParams.get("categoria") || "",
    preco: searchParams.get("preco") || "",
    avaliacao: searchParams.get("avaliacao") || "",
    busca: searchParams.get("busca") || "",
  }

  function atualizarFiltro(chave, valor) {
    setSearchParams((prev) => {
      if (valor) {
        prev.set(chave, valor)
      } else {
        // Remove o parâmetro se o valor for vazio
        prev.delete(chave)
      }
      return prev
    })
  }

  function limparFiltros() {
    setSearchParams({})
  }

  return { filtros, atualizarFiltro, limparFiltros }
}
```

---

## Navegação Programática com useNavigate

`useNavigate` retorna uma função que permite navegar para outra rota via código — útil após submissão de formulários, login, logout, ou qualquer ação que deva redirecionar o usuário.

```jsx
import { useNavigate } from "react-router-dom"

function FormularioLogin() {
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const sucesso = await fazerLogin(dados)

    if (sucesso) {
      navigate("/dashboard") // navega para outra rota
    }
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### Opções do useNavigate

```jsx
const navigate = useNavigate()

// Navegar para frente
navigate("/produtos")

// Navegar com replace — substitui o histórico (sem "voltar" para a página anterior)
navigate("/login", { replace: true })

// Navegar pelo histórico (equivalente ao botão voltar/avançar do browser)
navigate(-1) // voltar uma página
navigate(1)  // avançar uma página
navigate(-2) // voltar duas páginas

// Passar estado junto com a navegação
navigate("/confirmacao", { state: { pedidoId: 123 } })

// Acessar o estado recebido na rota de destino
import { useLocation } from "react-router-dom"
const { state } = useLocation()
console.log(state.pedidoId) // 123
```

---

## Controlando o Índice de Rotas

A rota índice (`index`) define o componente padrão renderizado dentro de uma rota pai — sem adicionar segmento à URL. É usada principalmente com layouts e rotas aninhadas.

```jsx
<Routes>
  <Route path="/" element={<LayoutBase />}>
    {/* Renderizado quando a URL é exatamente "/" */}
    <Route index element={<Home />} />
    <Route path="sobre" element={<Sobre />} />
    <Route path="produtos" element={<Produtos />} />
  </Route>
</Routes>
```

---

## Como Criar um Layout Base

Um layout base é um componente que envolve as páginas com elementos comuns (Navbar, Footer, Sidebar) e usa `<Outlet>` para renderizar o conteúdo da rota filha no lugar certo.

```jsx
// layouts/LayoutBase.jsx
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function LayoutBase() {
  return (
    <>
      <Navbar />
      <main>
        {/* Outlet é substituído pelo componente da rota filha ativa */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
```

```jsx
// App.jsx — Layout aplicado como rota pai
import { Routes, Route } from "react-router-dom"
import LayoutBase from "./layouts/LayoutBase"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutBase />}>
        <Route index element={<Home />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
```

**Como funciona:** quando o usuário acessa `/sobre`, o React Router renderiza `<LayoutBase>` e substitui o `<Outlet>` pelo componente `<Sobre>` — mantendo Navbar e Footer sem re-renderizá-los.

---

## O Hook useRoutes

`useRoutes` permite definir as rotas como um **array de objetos JavaScript** em vez de JSX. Produz o mesmo resultado que `<Routes>/<Route>`, mas é mais fácil de modularizar e manipular dinamicamente.

```jsx
// App.jsx com useRoutes
import { useRoutes } from "react-router-dom"
import LayoutBase from "./layouts/LayoutBase"

function App() {
  const rotas = useRoutes([
    {
      path: "/",
      element: <LayoutBase />,
      children: [
        { index: true, element: <Home /> },
        { path: "sobre", element: <Sobre /> },
        { path: "produtos", element: <Produtos /> },
        { path: "produtos/:id", element: <DetalhesProduto /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ])

  return rotas
}
```

### useRoutes vs JSX declarativo

| | JSX `<Routes>/<Route>` | `useRoutes` |
|---|---|---|
| Legibilidade | Alta para poucos níveis | Alta para estruturas complexas |
| Rotas dinâmicas (baseadas em dados) | Difícil | Fácil — é um array JavaScript |
| Separação em arquivo próprio | Possível | Natural |
| Resultado final | Idêntico | Idêntico |

```jsx
// routes/AppRoutes.jsx — centralizando as rotas com useRoutes
export const rotasConfig = [
  {
    path: "/",
    element: <LayoutBase />,
    children: [
      { index: true, element: <Home /> },
      { path: "sobre", element: <Sobre /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]

// App.jsx
import { useRoutes } from "react-router-dom"
import { rotasConfig } from "./routes/AppRoutes"

function App() {
  return useRoutes(rotasConfig)
}
```

---

## Rotas Aninhadas

Rotas aninhadas permitem que um componente filho seja renderizado **dentro** de um componente pai, usando `<Outlet>`. Útil para áreas com sub-navegação (painéis, dashboards, abas).

```jsx
// Estrutura de URLs com rotas aninhadas:
// /dashboard          → Dashboard (layout pai) + ResumoGeral (filho padrão)
// /dashboard/perfil   → Dashboard (layout pai) + Perfil (filho)
// /dashboard/pedidos  → Dashboard (layout pai) + Pedidos (filho)

<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<ResumoGeral />} />
    <Route path="perfil" element={<Perfil />} />
    <Route path="pedidos" element={<Pedidos />} />
  </Route>
</Routes>
```

```jsx
// pages/Dashboard.jsx — componente pai com sub-navegação
import { Outlet, NavLink } from "react-router-dom"

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <NavLink to="/dashboard">Resumo</NavLink>
        <NavLink to="/dashboard/perfil">Perfil</NavLink>
        <NavLink to="/dashboard/pedidos">Pedidos</NavLink>
      </nav>

      {/* Componente filho renderizado aqui */}
      <Outlet />
    </div>
  )
}
```

---

## Rotas Protegidas

Rotas protegidas verificam se o usuário está autenticado antes de renderizar o conteúdo. Se não estiver, redirecionam para o login com `<Navigate>`.

```jsx
// components/RotaProtegida.jsx
import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function RotaProtegida({ children }) {
  const { usuario } = useAuth()

  // Se não estiver autenticado, redireciona para login
  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  // Se estiver autenticado, renderiza o conteúdo normalmente
  return children
}
```

```jsx
// App.jsx — aplicando proteção a rotas específicas
<Routes>
  <Route path="/" element={<LayoutBase />}>
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />

    {/* Rotas que exigem autenticação */}
    <Route
      path="dashboard"
      element={
        <RotaProtegida>
          <Dashboard />
        </RotaProtegida>
      }
    />
    <Route
      path="perfil"
      element={
        <RotaProtegida>
          <Perfil />
        </RotaProtegida>
      }
    />
  </Route>
</Routes>
```

### Variação: RotaProtegida como layout (mais escalável)

```jsx
// components/RotaProtegida.jsx — versão com Outlet
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function RotaProtegida() {
  const { usuario } = useAuth()

  return usuario ? <Outlet /> : <Navigate to="/login" replace />
}

// App.jsx — agrupa rotas protegidas em um único bloco
<Route element={<RotaProtegida />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="perfil" element={<Perfil />} />
  <Route path="pedidos" element={<Pedidos />} />
</Route>
```

**Vantagem:** uma única `<RotaProtegida>` protege todas as rotas filhas — sem precisar envolver cada `element` individualmente.

---

## Navigate vs useNavigate

| | `<Navigate>` | `useNavigate()` |
|---|---|---|
| Tipo | Componente JSX | Hook |
| Quando usar | Durante a renderização (ex: rota protegida) | Em resposta a eventos (ex: submit de form) |
| Como funciona | Renderiza e já redireciona | Retorna função para chamar quando necessário |

```jsx
// <Navigate> — redireciona ao renderizar
if (!usuario) return <Navigate to="/login" replace />

// useNavigate — redireciona em resposta a uma ação
const navigate = useNavigate()
function handleLogout() {
  logout()
  navigate("/login", { replace: true })
}
```

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| Habilitar roteamento | `<BrowserRouter>` envolvendo a aplicação no `main.jsx` |
| Definir rotas (JSX) | `<Routes><Route path="/" element={<Home />} /></Routes>` |
| Definir rotas (objeto) | `useRoutes([{ path: "/", element: <Home /> }])` |
| Rota índice | `<Route index element={<Home />} />` — renderizada no path pai sem segmento |
| Rota 404 | `<Route path="*" element={<NotFound />} />` — sempre por último |
| Navegação declarativa | `<Link to="/rota">` e `<NavLink to="/rota">` |
| NavLink ativo | `className={({ isActive }) => isActive ? "ativo" : ""}` |
| Parâmetros na URL | `:id` no path + `const { id } = useParams()` no componente |
| Query string (filtros) | `const [params, setParams] = useSearchParams()` |
| Atualizar filtro sem perder outros | `setSearchParams(prev => { prev.set("chave", valor); return prev })` |
| Navegação programática | `const navigate = useNavigate()` + `navigate("/rota")` |
| Redirecionar com replace | `navigate("/login", { replace: true })` |
| Voltar/avançar no histórico | `navigate(-1)` / `navigate(1)` |
| Layout base | Componente com `<Outlet>` como rota pai, páginas como filhas |
| Rotas aninhadas | `<Route>` filhos dentro de um `<Route>` pai com `<Outlet>` |
| Rota protegida (children) | Componente que verifica auth e retorna `children` ou `<Navigate>` |
| Rota protegida (Outlet) | Componente que verifica auth e retorna `<Outlet>` ou `<Navigate>` |
| Redirecionar na renderização | `<Navigate to="/login" replace />` |
| Passar estado na navegação | `navigate("/rota", { state: { dado } })` + `useLocation().state` |
