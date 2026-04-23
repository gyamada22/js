# JavaScript — Módulo 34: Introdução ao React

## Status: CONCLUÍDO
- **Projetos:** 1 (Lista de Perfis com React)
- **Foco:** Fundamentos do React, JSX, Componentes, Props e CSS

---

## Evolução da Web

A web evoluiu em três grandes fases: páginas estáticas (HTML puro), páginas dinâmicas no servidor e, por fim, aplicações ricas no cliente.

- **Web 1.0:** Páginas estáticas, sem interatividade.
- **Web 2.0:** Conteúdo dinâmico gerado no servidor, surgimento do AJAX.
- **Web 3.0:** SPAs — a lógica migra para o cliente, o servidor entrega dados via API.

---

## SSR vs SPA

| | SSR (Server-Side Rendering) | SPA (Single Page Application) |
|---|---|---|
| Onde renderiza | Servidor | Navegador (cliente) |
| Navegação | Recarrega a página inteira | Atualiza apenas o que mudou |
| Exemplos | PHP, Ruby on Rails, Next.js | React, Vue, Angular |
| SEO | Melhor por padrão | Requer configuração extra |

No SSR, cada requisição gera um HTML completo no servidor. Na SPA, o servidor entrega um HTML mínimo e o JavaScript assume o controle — atualizando a interface sem recarregar a página.

---

## O que é o React?

React é uma **biblioteca JavaScript** criada pelo Facebook para construir interfaces de usuário. Suas principais características:

- **Baseado em componentes** — a UI é dividida em peças reutilizáveis e independentes
- **Declarativo** — você descreve *como* a UI deve parecer, não *como* atualizá-la
- **Virtual DOM** — o React mantém uma cópia virtual do DOM para otimizar atualizações

---

## Conhecendo o Virtual DOM

O DOM real é lento para manipular diretamente. O React resolve isso com o Virtual DOM:

1. Quando o estado muda, o React cria um novo Virtual DOM
2. Compara com o Virtual DOM anterior (**diffing**)
3. Atualiza **apenas** os nós que mudaram no DOM real (**reconciliation**)

Isso torna as atualizações de interface muito mais eficientes do que reescrever o DOM inteiro.

---

## Ambiente de Desenvolvimento — Vite

Vite é o bundler recomendado para projetos React modernos. É mais rápido que o Create React App por usar módulos ES nativos do navegador durante o desenvolvimento.

```bash
# Criando um projeto React com Vite
npm create vite@latest nome-do-projeto -- --template react

cd nome-do-projeto
npm install
npm run dev
```

---

## Estrutura de Pastas do Projeto

```
nome-do-projeto/
├── public/             # Arquivos estáticos (favicon, imagens públicas)
├── src/
│   ├── assets/         # Imagens e recursos importados nos componentes
│   ├── components/     # Componentes reutilizáveis
│   ├── App.jsx         # Componente raiz da aplicação
│   ├── App.css         # Estilos do App
│   ├── main.jsx        # Ponto de entrada — renderiza o App no DOM
│   └── index.css       # CSS global
├── index.html          # HTML base — contém a div#root
├── package.json
└── vite.config.js
```

`main.jsx` é o ponto de entrada: ele injeta o componente `<App />` dentro da `div#root` do `index.html`.

```jsx
// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

---

## Conhecendo o JSX

JSX é uma **extensão de sintaxe** do JavaScript que permite escrever HTML dentro do JS. O Vite/Babel transforma JSX em chamadas `React.createElement()` por baixo dos panos.

```jsx
// JSX
const elemento = <h1>Olá, mundo!</h1>

// O que o compilador gera (equivalente)
const elemento = React.createElement('h1', null, 'Olá, mundo!')
```

**Regras importantes do JSX:**

```jsx
// 1. Todo JSX precisa ter um único elemento raiz
// ❌ Errado
return (
  <h1>Título</h1>
  <p>Parágrafo</p>
)

// ✅ Correto
return (
  <div>
    <h1>Título</h1>
    <p>Parágrafo</p>
  </div>
)

// 2. class vira className
<div className="container">...</div>

// 3. Expressões JS ficam entre chaves {}
<p>{2 + 2}</p>        // 4
<p>{nome.toUpperCase()}</p>

// 4. Tags sem filhos devem ser auto-fechadas
<img src="foto.jpg" />
<input type="text" />
```

---

## Compreendendo Componentes

Componentes são **funções JavaScript** que retornam JSX. Cada componente representa uma parte isolada da interface.

```jsx
// Componente funcional básico
function Saudacao() {
  return <h1>Olá, React!</h1>
}

// Usando o componente (sempre com letra maiúscula)
function App() {
  return (
    <div>
      <Saudacao />
      <Saudacao />
    </div>
  )
}
```

Componentes com letra **minúscula** são interpretados como tags HTML nativas. Componentes customizados sempre começam com **maiúscula**.

---

## Conhecendo o Fragment

Quando não queremos adicionar uma `<div>` extra ao DOM apenas para satisfazer a regra do elemento raiz único, usamos Fragment.

```jsx
import { Fragment } from 'react'

// Usando Fragment explícito
function Componente() {
  return (
    <Fragment>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </Fragment>
  )
}

// Sintaxe curta (mais comum)
function Componente() {
  return (
    <>
      <h1>Título</h1>
      <p>Parágrafo</p>
    </>
  )
}
```

Fragment não gera nenhum elemento extra no DOM — ideal para manter a estrutura HTML limpa.

---

## Dados Dinâmicos no JSX

Variáveis JavaScript são inseridas no JSX com `{}`. Qualquer expressão válida pode ser usada.

```jsx
function Perfil() {
  const nome = "Maria"
  const idade = 28
  const ativo = true

  return (
    <div>
      <h2>{nome}</h2>
      <p>Idade: {idade}</p>
      <p>Status: {ativo ? "Ativo" : "Inativo"}</p>
      <p>Ano de nascimento: {2025 - idade}</p>
    </div>
  )
}
```

---

## Propriedades (Props)

Props são a forma de **passar dados de um componente pai para um filho**. São equivalentes aos atributos do HTML, mas para componentes React.

```jsx
// Componente filho recebe props como parâmetro
function Card(props) {
  return (
    <div>
      <h2>{props.nome}</h2>
      <p>{props.cargo}</p>
    </div>
  )
}

// Componente pai passa os valores
function App() {
  return (
    <div>
      <Card nome="Ana" cargo="Dev Frontend" />
      <Card nome="Carlos" cargo="Dev Backend" />
    </div>
  )
}
```

---

## Destructuring de Props

Em vez de acessar `props.nome`, `props.cargo`, podemos desestruturar direto no parâmetro da função — deixa o código mais limpo.

```jsx
// Sem destructuring
function Card(props) {
  return <h2>{props.nome}</h2>
}

// Com destructuring — mais legível
function Card({ nome, cargo }) {
  return (
    <div>
      <h2>{nome}</h2>
      <p>{cargo}</p>
    </div>
  )
}
```

---

## A Prop Especial children

`children` é uma prop reservada do React que representa o **conteúdo passado entre as tags** de abertura e fechamento de um componente.

```jsx
// Componente que usa children
function Box({ children }) {
  return <div className="box">{children}</div>
}

// Usando o componente com conteúdo interno
function App() {
  return (
    <Box>
      <h2>Título dentro da Box</h2>
      <p>Qualquer conteúdo pode ser passado aqui.</p>
    </Box>
  )
}
```

`children` pode ser texto, outros componentes, ou qualquer JSX — torna componentes muito mais flexíveis e reutilizáveis.

---

## Props: Passando Métodos para Componentes

Funções também podem ser passadas como props — padrão essencial para comunicação filho → pai.

```jsx
function Botao({ texto, aoClicar }) {
  return <button onClick={aoClicar}>{texto}</button>
}

function App() {
  function handleClick() {
    alert("Botão clicado!")
  }

  return <Botao texto="Clique aqui" aoClicar={handleClick} />
}
```

---

## Estendendo Props com Rest Operator (...props)

O rest operator captura todas as props não desestruturadas e permite repassá-las ao elemento HTML — útil para não perder atributos nativos.

```jsx
// Sem rest: atributos extras seriam perdidos
function Input({ label, ...props }) {
  return (
    <div>
      <label>{label}</label>
      <input {...props} />  {/* repassa type, placeholder, onChange, etc */}
    </div>
  )
}

// Usando o componente
<Input label="Nome" type="text" placeholder="Digite seu nome" />
```

O spread `{...props}` distribui todas as propriedades restantes diretamente no elemento.

---

## CSS no React

### Importando CSS

```jsx
// App.jsx
import './App.css'

function App() {
  return <div className="container">Conteúdo</div>
}
```

```css
/* App.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
}
```

### CSS Inline

Estilos inline no React são passados como **objeto JavaScript** — propriedades em camelCase, valores como strings.

```jsx
function Destaque() {
  const estilo = {
    color: "white",
    backgroundColor: "#7c3aed",
    padding: "8px 16px",
    borderRadius: "4px"
  }

  return <span style={estilo}>Destaque</span>
}

// Também pode ser escrito direto (duplas chaves: uma do JSX, outra do objeto)
<span style={{ color: "red", fontSize: "20px" }}>Texto</span>
```

### CSS Global

O `index.css` é importado no `main.jsx` e aplica estilos a **toda** a aplicação — ideal para resets, variáveis CSS e estilos base.

```css
/* index.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-primary: #7c3aed;
  --color-bg: #1a1a2e;
  font-family: Inter, sans-serif;
}
```

### CSS Modules

CSS Modules geram **nomes de classe únicos** automaticamente, evitando conflitos entre componentes. O arquivo deve ter o sufixo `.module.css`.

```css
/* Card.module.css */
.card {
  background: #1e1e2e;
  border-radius: 8px;
  padding: 16px;
}

.titulo {
  font-size: 1.2rem;
  color: var(--color-primary);
}
```

```jsx
// Card.jsx
import styles from './Card.module.css'

function Card({ nome }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.titulo}>{nome}</h2>
    </div>
  )
}
```

O CSS Module transforma `.card` em algo como `.Card_card__xK2pL` no DOM — garantindo isolamento total de estilos por componente.

---

## Lógica Condicional na Estilização

Aplicar classes CSS dinamicamente com base em condições — padrão muito usado para estados ativos, erros, variantes.

```jsx
// Com operador ternário
function Tag({ ativo }) {
  return (
    <span className={ativo ? styles.ativo : styles.inativo}>
      {ativo ? "Online" : "Offline"}
    </span>
  )
}

// Com template literal para múltiplas classes
function Botao({ primario, desabilitado }) {
  return (
    <button
      className={`${styles.botao} ${primario ? styles.primario : styles.secundario}`}
      disabled={desabilitado}
    >
      Clique
    </button>
  )
}
```

---

## Projeto: Lista de Perfis com React

Aplicação que exibe uma lista de cartões de perfil, com Header, Footer e componentes reutilizáveis estilizados com CSS Modules.

### Estrutura do Projeto

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.module.css
│   └── Profile/
│       ├── Profile.jsx
│       └── Profile.module.css
├── index.css       # estilos globais
├── App.jsx
└── main.jsx
```

### Componente Header

```jsx
// components/Header/Header.jsx
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>DevProfiles</h1>
    </header>
  )
}

export default Header
```

### Componente Footer

```jsx
// components/Footer/Footer.jsx
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2025 DevProfiles. Todos os direitos reservados.</p>
    </footer>
  )
}

export default Footer
```

### Componente Profile

```jsx
// components/Profile/Profile.jsx
import styles from './Profile.module.css'

function Profile({ nome, cargo, avatar, ativo }) {
  return (
    <div className={styles.card}>
      <img src={avatar} alt={nome} className={styles.avatar} />
      <h2 className={styles.nome}>{nome}</h2>
      <p className={styles.cargo}>{cargo}</p>
      <span className={`${styles.badge} ${ativo ? styles.ativo : styles.inativo}`}>
        {ativo ? "Disponível" : "Ocupado"}
      </span>
    </div>
  )
}

export default Profile
```

### App.jsx — Composição Final

```jsx
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Profile from './components/Profile/Profile'

const perfis = [
  { id: 1, nome: "Ana Silva",    cargo: "Dev Frontend", ativo: true,  avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, nome: "Carlos Souza", cargo: "Dev Backend",  ativo: false, avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, nome: "Maria Lima",   cargo: "UI Designer",  ativo: true,  avatar: "https://i.pravatar.cc/150?img=3" },
]

function App() {
  return (
    <>
      <Header />
      <main>
        {perfis.map(perfil => (
          <Profile
            key={perfil.id}
            nome={perfil.nome}
            cargo={perfil.cargo}
            ativo={perfil.ativo}
            avatar={perfil.avatar}
          />
        ))}
      </main>
      <Footer />
    </>
  )
}

export default App
```

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| Criar projeto React | `npm create vite@latest projeto -- --template react` |
| Inserir JS no JSX | `{expressão}` |
| Componente funcional | `function Nome() { return <JSX /> }` |
| Evitar div extra | `<> ... </>` (Fragment) |
| Passar dados ao filho | `<Comp prop="valor" />` |
| Desestruturar props | `function Comp({ prop1, prop2 })` |
| Conteúdo entre tags | prop reservada `children` |
| Repassar atributos HTML | `...props` com spread `{...props}` |
| CSS isolado por componente | `arquivo.module.css` + `styles.classe` |
| Classe CSS condicional | `className={condicao ? styles.a : styles.b}` |
| CSS inline | `style={{ propriedade: 'valor' }}` |
