# Desenvolvimento Web — Módulo 6: Fundamentos de HTML, CSS e Landing Page

## Status: CONCLUÍDO
- **Projetos:** 1 (Landing Page — PizzaHash)
- **Foco:** Comunicação na internet, HTML, CSS, Box Model e responsividade

---

## Como a Comunicação na Internet Funciona

Quando você acessa um site, acontece uma sequência de eventos por baixo dos panos:

1. Você digita uma URL no navegador
2. O DNS resolve o domínio para um endereço IP
3. O navegador abre uma conexão TCP com o servidor
4. Envia uma **requisição HTTP** (GET, POST, etc.)
5. O servidor responde com um **HTML + CSS + JS**
6. O navegador renderiza a página

```
Cliente (browser)          Servidor
     |                         |
     |  GET /index.html        |
     |------------------------>|
     |                         |
     |  200 OK + HTML          |
     |<------------------------|
```

---

## Arquiteturas e Protocolos da Internet

| Protocolo | Função |
|---|---|
| **IP** | Endereçamento — identifica cada dispositivo na rede |
| **TCP** | Transporte confiável — garante que os pacotes chegam na ordem certa |
| **HTTP** | Comunicação web — define o formato de requisições e respostas |
| **HTTPS** | HTTP com criptografia via TLS/SSL |
| **DNS** | Traduz domínios (`google.com`) para IPs (`142.250.x.x`) |

**Modelos de arquitetura:**
- **Cliente-Servidor** — o cliente solicita, o servidor responde (modelo mais comum na web)
- **P2P (Peer-to-Peer)** — dispositivos se comunicam diretamente entre si

---

## O HTML

HTML (HyperText Markup Language) é a **linguagem de estrutura** da web. Define o conteúdo e o significado semântico da página — não a aparência.

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minha Página</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Título principal</h1>
    <p>Um parágrafo de texto.</p>
  </body>
</html>
```

- `<head>` — metadados, título, links para CSS (não aparece na página)
- `<body>` — tudo que é visível ao usuário

---

## Tags e Suas Informações

Tags HTML possuem **atributos** que fornecem informações adicionais ao elemento.

```html
<!-- Sintaxe: <tag atributo="valor">conteúdo</tag> -->

<a href="https://google.com" target="_blank">Abrir Google</a>

<img src="foto.jpg" alt="Descrição da imagem" width="300" />

<input type="email" placeholder="Digite seu e-mail" required />

<button type="submit" id="btn-enviar" class="btn-primary">Enviar</button>
```

Atributos importantes:
- `id` — identificador único no documento
- `class` — grupo de elementos para estilização
- `href` — destino de links
- `src` — origem de imagens/scripts
- `alt` — texto alternativo (acessibilidade)

---

## Sobre Tags HTML — Semântica

Tags semânticas comunicam o **significado** do conteúdo para o navegador e leitores de tela.

```html
<!-- ❌ Sem semântica — divitis -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>

<!-- ✅ Com semântica -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
  <aside>...</aside>
</main>
<footer>...</footer>
```

| Tag Semântica | Uso |
|---|---|
| `<header>` | Cabeçalho da página ou seção |
| `<nav>` | Menu de navegação |
| `<main>` | Conteúdo principal da página |
| `<section>` | Seção temática do conteúdo |
| `<article>` | Conteúdo independente e reutilizável |
| `<aside>` | Conteúdo secundário / barra lateral |
| `<footer>` | Rodapé |

---

## Elementos de Nível de Bloco vs Elementos de Linha

| | Bloco (Block) | Linha (Inline) |
|---|---|---|
| Comportamento | Ocupa toda a largura disponível | Ocupa apenas o espaço do conteúdo |
| Quebra de linha | Sim — empurra o próximo elemento para baixo | Não — elementos ficam lado a lado |
| Exemplos | `<div>`, `<p>`, `<h1>`, `<section>` | `<span>`, `<a>`, `<strong>`, `<img>` |

```html
<!-- Bloco: cada elemento ocupa sua própria linha -->
<p>Parágrafo 1</p>
<p>Parágrafo 2</p>

<!-- Inline: ficam na mesma linha -->
<p>Texto com <strong>negrito</strong> e <a href="#">link</a> juntos.</p>
```

---

## O CSS

CSS (Cascading Style Sheets) é a **linguagem de estilo** da web. Controla aparência, layout e responsividade.

```css
/* Sintaxe: seletor { propriedade: valor; } */
h1 {
  color: #333;
  font-size: 2rem;
  text-align: center;
}
```

### Problemas do CSS inline e separação de responsabilidades

```html
<!-- ❌ CSS inline — mistura estrutura com estilo, difícil de manter -->
<h1 style="color: red; font-size: 32px;">Título</h1>

<!-- ✅ Arquivo CSS separado — fácil de manter e reutilizar -->
<link rel="stylesheet" href="styles.css" />
```

Separar HTML e CSS segue o princípio de **Separação de Responsabilidades**:
- HTML → estrutura e conteúdo
- CSS → apresentação e estilo
- JS → comportamento e interatividade

---

## Seletores CSS

```css
/* Por tag */
p { color: gray; }

/* Por classe — reutilizável em vários elementos */
.destaque { background: yellow; }

/* Por ID — único por página */
#titulo-principal { font-size: 3rem; }

/* Descendente — p dentro de section */
section p { line-height: 1.6; }

/* Filho direto */
nav > a { margin: 0 8px; }

/* Pseudo-classe — estado do elemento */
a:hover { color: purple; }
button:disabled { opacity: 0.5; }

/* Pseudo-elemento — parte do elemento */
p::first-line { font-weight: bold; }
```

**Especificidade** — quando há conflito, a regra mais específica vence:
`ID > Classe > Tag`

---

## CSS Inline Styling, Classes e Identificadores

```css
/* ID: # — uso único, alta especificidade */
#hero { height: 100vh; }

/* Classe: . — reutilizável, especificidade média */
.btn { padding: 12px 24px; border-radius: 6px; }
.btn-primary { background: #e63946; color: white; }

/* Combinando classes no HTML */
```
```html
<button class="btn btn-primary">Pedir agora</button>
```

---

## O Box Model

Todo elemento HTML é uma caixa composta por 4 camadas, de dentro para fora:

```
┌─────────────────────────────┐
│           MARGIN            │  ← espaço externo (fora da borda)
│  ┌───────────────────────┐  │
│  │        BORDER         │  │  ← borda visível
│  │  ┌─────────────────┐  │  │
│  │  │     PADDING     │  │  │  ← espaço interno (entre borda e conteúdo)
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  CONTENT  │  │  │  │  ← conteúdo (texto, imagem, etc.)
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

```css
.card {
  width: 300px;          /* largura do conteúdo */
  padding: 16px;         /* espaço interno */
  border: 2px solid #333;
  margin: 24px auto;     /* espaço externo + centraliza */

  /* box-sizing: border-box faz width incluir padding e border */
  box-sizing: border-box;
}
```

Sem `box-sizing: border-box`, o tamanho final do elemento é `width + padding + border` — o que causa surpresas. Por isso o reset `* { box-sizing: border-box }` é tão comum.

---

## Principais Propriedades CSS

```css
.elemento {
  /* Texto */
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  /* Cores */
  color: #333;
  background-color: #f5f5f5;
  opacity: 0.8;

  /* Dimensões */
  width: 100%;
  max-width: 1200px;
  height: 60px;

  /* Espaçamento */
  padding: 16px 24px;   /* vertical horizontal */
  margin: 0 auto;

  /* Bordas */
  border: 1px solid #ddd;
  border-radius: 8px;

  /* Display */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
```

---

## Projeto: Landing Page — PizzaHash

Landing page completa com múltiplas seções, estilos globais, variáveis CSS e responsividade.

### Estrutura de Pastas

```
pizzahash/
├── index.html
├── styles/
│   ├── global.css       # reset + variáveis CSS + estilos base
│   ├── header.css
│   ├── home.css
│   ├── about.css
│   ├── menu.css
│   ├── promotions.css
│   ├── reviews.css
│   └── footer.css
└── assets/
    └── images/
```

### Estrutura HTML da Página

```html
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PizzaHash</title>
    <link rel="stylesheet" href="styles/global.css" />
    <link rel="stylesheet" href="styles/header.css" />
    <!-- demais arquivos CSS -->
  </head>
  <body>
    <header id="header">...</header>
    <section id="home">...</section>
    <section id="about">...</section>
    <section id="menu">...</section>
    <section id="promotions">...</section>
    <section id="reviews">...</section>
    <footer id="footer">...</footer>
  </body>
</html>
```

### Estilos Globais com Variáveis CSS

```css
/* global.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-primary: #e63946;
  --color-dark: #1a1a2e;
  --color-light: #f5f5f5;
  --color-text: #333333;
  --font-main: 'Inter', sans-serif;
  --max-width: 1200px;
}

body {
  font-family: var(--font-main);
  color: var(--color-text);
  background-color: var(--color-light);
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}
```

### Header com Navegação

```html
<header id="header">
  <div class="container">
    <a href="#home" class="logo">Pizza<span>Hash</span></a>
    <nav>
      <a href="#about">Sobre</a>
      <a href="#menu">Cardápio</a>
      <a href="#promotions">Promoções</a>
      <a href="#reviews">Avaliações</a>
    </nav>
  </div>
</header>
```

```css
/* header.css */
#header {
  position: fixed;
  top: 0;
  width: 100%;
  background: var(--color-dark);
  z-index: 100;
}

#header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

#header nav a {
  color: white;
  text-decoration: none;
  margin-left: 24px;
  transition: color 0.3s;
}

#header nav a:hover {
  color: var(--color-primary);
}
```

### Lógica Condicional na Estilização

Aplicar estilos diferentes com base em classes adicionadas dinamicamente.

```css
/* Promoção destaque vs normal */
.promo-card {
  border: 2px solid #ddd;
  border-radius: 12px;
  padding: 24px;
}

.promo-card.destaque {
  border-color: var(--color-primary);
  background: #fff5f5;
}
```

```html
<div class="promo-card destaque">
  <span class="badge">🔥 Mais pedido</span>
  <h3>Pizza Margherita</h3>
  <p>De R$ 45 por <strong>R$ 35</strong></p>
</div>
```

### Responsividade — Media Queries

```css
/* Estilos base: mobile first */
#header nav {
  display: none;   /* esconde nav em telas pequenas */
}

/* Tablet e acima */
@media (min-width: 768px) {
  #header nav {
    display: flex;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .menu-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .promo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 767px) {
  .menu-grid,
  .promo-grid {
    grid-template-columns: 1fr;
  }

  #home h1 {
    font-size: 2rem;
  }
}
```

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| Estrutura base HTML | `<!DOCTYPE html>` + `<head>` + `<body>` |
| Separação de responsabilidades | HTML estrutura / CSS estilo / arquivo `.css` separado |
| Seletor por classe | `.nome-da-classe { }` |
| Seletor por ID | `#nome-do-id { }` |
| Tamanho total previsível | `* { box-sizing: border-box }` |
| Variáveis CSS | `--nome: valor` em `:root` / uso: `var(--nome)` |
| Centralizar elemento | `margin: 0 auto` + `max-width` |
| Layout horizontal | `display: flex` + `justify-content` + `align-items` |
| Layout em grade | `display: grid` + `grid-template-columns` |
| Responsividade | `@media (max-width: Xpx) { }` |
| Header fixo | `position: fixed` + `top: 0` + `z-index` |
| Estilo condicional | classes adicionadas via HTML ou JS |
