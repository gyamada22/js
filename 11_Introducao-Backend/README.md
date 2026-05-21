# JavaScript — Módulo 11: Introdução ao Backend - Conceitos

## Status: CONCLUÍDO
- **Projetos:** 1 (Exemplo de comunicação Front-end e API com fetch, JSON e tratamento de status HTTP)
- **Foco:** O que é Backend, Funcionalidades do Servidor, CLI, NPM, API, Web API, JSON, HTTP, Status Codes

---

## O que é o Backend?

O Backend é a camada da aplicação que roda no **servidor** — invisível ao usuário, mas responsável por toda a lógica de negócio, acesso a dados e comunicação com serviços externos.

```
Frontend (cliente)        Backend (servidor)
──────────────────        ──────────────────
Interface visual    →     Processa a requisição
Interação do user   →     Acessa o banco de dados
Exibe os dados      ←     Retorna a resposta
```

A divisão entre frontend e backend permite que múltiplos clientes (web, mobile, desktop) consumam a mesma lógica de servidor — sem duplicar código.

---

## Funcionalidades do Backend

O backend é responsável por um conjunto de tarefas que o frontend não pode (ou não deve) realizar:

| Funcionalidade | Descrição |
|---|---|
| **Autenticação** | Verificar identidade do usuário (login, tokens) |
| **Autorização** | Controlar o que cada usuário pode acessar |
| **Banco de dados** | Ler, gravar, atualizar e deletar dados persistentes |
| **Regras de negócio** | Lógica central da aplicação (cálculos, validações) |
| **Segurança** | Proteger dados sensíveis longe do cliente |
| **Comunicação com serviços externos** | Pagamentos, e-mails, APIs de terceiros |

> **Por que não fazer tudo no frontend?** O código do frontend é visível e acessível pelo usuário — qualquer lógica sensível (senhas, chaves de API, regras de negócio críticas) deve viver no servidor.

---

## Funcionalidades: Servidor

Um servidor é um computador (ou processo) que fica **aguardando requisições** e respondendo a elas. No contexto web:

```
Cliente faz uma requisição HTTP
         ↓
Servidor recebe e processa
         ↓
Servidor retorna uma resposta HTTP
```

### O que um servidor web faz

- Escuta em uma **porta** (ex: 3000, 8080, 443)
- Recebe requisições com método, URL, headers e body
- Executa a lógica correspondente (buscar dados, autenticar, etc.)
- Retorna uma resposta com status code, headers e body

### Servidor vs. Hospedagem

| | Desenvolvimento local | Produção |
|---|---|---|
| Onde roda | Sua máquina (`localhost`) | Servidor remoto (cloud) |
| Quem acessa | Só você | Qualquer usuário na internet |
| Exemplos | `localhost:3000` | `api.meusite.com` |

---

## Linhas de Comando (CLI)

A **CLI** (*Command Line Interface*) é uma interface onde você interage com o computador digitando comandos — sem interface gráfica. É essencial no desenvolvimento backend para navegar pelo sistema de arquivos, executar scripts e gerenciar pacotes.

### Comandos essenciais

```bash
# Navegação
pwd                   # mostra o diretório atual
ls                    # lista arquivos e pastas
ls -la                # lista com detalhes e arquivos ocultos
cd pasta/             # entra em uma pasta
cd ..                 # volta um nível
cd ~                  # vai para o diretório home

# Arquivos e pastas
mkdir nome-pasta      # cria uma pasta
touch arquivo.js      # cria um arquivo vazio
rm arquivo.js         # remove um arquivo
rm -rf pasta/         # remove uma pasta e todo seu conteúdo (cuidado!)
cp origem destino     # copia arquivo
mv origem destino     # move ou renomeia arquivo

# Leitura
cat arquivo.js        # exibe o conteúdo de um arquivo
clear                 # limpa o terminal
```

### Por que usar a CLI?

- Mais rápida para tarefas repetitivas que a interface gráfica
- Necessária para servidores remotos (que geralmente não têm interface visual)
- Ferramentas como NPM, Git e Node.js são usadas exclusivamente via CLI

---

## CLI: Introdução ao NPM

O **NPM** (*Node Package Manager*) é o gerenciador de pacotes do Node.js — a ferramenta que permite instalar, compartilhar e gerenciar bibliotecas JavaScript no backend (e também no frontend).

```
Você quer usar uma biblioteca externa
           ↓
npm install nome-da-biblioteca
           ↓
NPM baixa o pacote do registry (npmjs.com)
           ↓
Pacote disponível na pasta node_modules/
```

### O que é o package.json?

O `package.json` é o arquivo de configuração de todo projeto Node.js. Ele registra as dependências, scripts e metadados do projeto.

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Descrição do projeto",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### dependencies vs devDependencies

| | `dependencies` | `devDependencies` |
|---|---|---|
| O que são | Pacotes necessários em produção | Pacotes usados só no desenvolvimento |
| Exemplos | `express`, `axios`, `mongoose` | `nodemon`, `jest`, `eslint` |
| Como instalar | `npm install pacote` | `npm install pacote --save-dev` |

---

## Conhecendo os Comandos NPM

### Comandos principais

```bash
# Inicializar um projeto (cria o package.json)
npm init              # modo interativo (pergunta nome, versão, etc.)
npm init -y           # aceita todos os padrões automaticamente

# Instalar pacotes
npm install express              # instala e adiciona em dependencies
npm install nodemon --save-dev   # instala e adiciona em devDependencies
npm install                      # instala todas as dependências do package.json

# Remover pacotes
npm uninstall express

# Executar scripts definidos no package.json
npm start             # roda o script "start"
npm run dev           # roda o script "dev" (qualquer nome customizado usa "run")

# Listar pacotes instalados
npm list              # lista pacotes do projeto
npm list -g           # lista pacotes instalados globalmente

# Verificar desatualizações
npm outdated

# Atualizar pacotes
npm update
```

### A pasta node_modules

```
meu-projeto/
├── node_modules/     # ← NÃO commitar no Git
├── package.json
├── package-lock.json # ← commitar (trava versões exatas)
└── index.js
```

> **Sempre adicionar `node_modules/` ao `.gitignore`.** A pasta pode ter centenas de MB. Qualquer pessoa que clonar o projeto rode `npm install` para reinstalar tudo a partir do `package.json`.

### NPM Comandos — Cheat Sheet

| Comando | O que faz |
|---|---|
| `npm init -y` | Cria `package.json` com padrões |
| `npm install <pkg>` | Instala pacote como dependência |
| `npm install <pkg> --save-dev` | Instala como dependência de desenvolvimento |
| `npm install` | Instala todas as dependências listadas |
| `npm uninstall <pkg>` | Remove pacote |
| `npm run <script>` | Executa script do `package.json` |
| `npm list` | Lista pacotes instalados |
| `npm outdated` | Mostra pacotes desatualizados |
| `npm update` | Atualiza pacotes |

---

## Introdução a API e Web API

### O que é uma API?

**API** (*Application Programming Interface*) é um contrato que define como dois sistemas se comunicam. Ela especifica quais operações estão disponíveis, quais dados enviar e o que esperar de volta.

```
Sistema A                   Sistema B
─────────                   ─────────
Faz uma chamada   →  API  → Processa
Recebe resposta   ←  API  ← Retorna dado
```

### O que é uma Web API?

Uma **Web API** é uma API acessível via HTTP — o protocolo da internet. O frontend faz requisições HTTP para o backend, que responde com dados (geralmente em JSON).

```
Browser (React)              Servidor (Node.js / Express)
───────────────              ────────────────────────────
fetch("/api/produtos")  →    Recebe GET /api/produtos
                        ←    Retorna JSON com lista de produtos
```

### API vs Biblioteca vs Framework

| | Definição | Exemplo |
|---|---|---|
| **Biblioteca** | Código que você chama quando quer | `axios`, `lodash` |
| **Framework** | Estrutura que chama seu código | `Express`, `Next.js` |
| **API** | Interface de comunicação entre sistemas | `fetch`, REST API |

---

## Objeto JSON — Conceito

**JSON** (*JavaScript Object Notation*) é o formato padrão para troca de dados entre frontend e backend. É baseado na sintaxe de objetos do JavaScript, mas com regras mais rígidas.

### Sintaxe do JSON

```json
{
  "id": 1,
  "nome": "Notebook",
  "preco": 3499.90,
  "disponivel": true,
  "categorias": ["eletrônicos", "informática"],
  "fabricante": {
    "nome": "TechBrand",
    "pais": "Brasil"
  },
  "descricao": null
}
```

### Regras do JSON

```
✅ Chaves sempre com aspas duplas     → "nome": "valor"
✅ Strings com aspas duplas           → "cidade": "São Paulo"
✅ Números sem aspas                  → "preco": 99.90
✅ Booleanos minúsculos               → "ativo": true
✅ null minúsculo                     → "desconto": null
✅ Arrays com colchetes               → "tags": ["a", "b"]

❌ Aspas simples não são válidas      → 'nome': 'valor'
❌ Vírgula no último item             → { "a": 1, }
❌ Comentários não são permitidos     → // isso quebra o JSON
❌ Funções não existem em JSON        → "fn": function() {}
```

### JSON no JavaScript

```javascript
// Objeto JavaScript → String JSON (para enviar ao servidor)
const produto = { id: 1, nome: "Notebook", preco: 3499.90 }
const jsonString = JSON.stringify(produto)
// '{"id":1,"nome":"Notebook","preco":3499.9}'

// String JSON → Objeto JavaScript (ao receber do servidor)
const texto = '{"id":1,"nome":"Notebook","preco":3499.9}'
const objeto = JSON.parse(texto)
console.log(objeto.nome) // "Notebook"
```

### JSON vs Objeto JavaScript

| | JSON | Objeto JS |
|---|---|---|
| Chaves | Obrigatoriamente com `""` | Com ou sem aspas |
| Strings | Apenas aspas duplas `""` | Aspas simples ou duplas |
| Funções | ❌ Não suportado | ✅ Suportado |
| Comentários | ❌ Não suportado | ✅ Suportado |
| Uso | Transporte de dados | Lógica da aplicação |

---

## Protocolos HTTP — Status Codes

O **HTTP** (*HyperText Transfer Protocol*) é o protocolo de comunicação da web. Toda requisição recebe uma **resposta com um status code** — um número de 3 dígitos que indica o resultado da operação.

### Grupos de Status Code

| Faixa | Categoria | Significado geral |
|---|---|---|
| `1xx` | Informacional | Requisição recebida, processando |
| `2xx` | Sucesso | Requisição bem-sucedida |
| `3xx` | Redirecionamento | O recurso está em outro lugar |
| `4xx` | Erro do cliente | Problema na requisição enviada |
| `5xx` | Erro do servidor | Problema no processamento do servidor |

### Status Codes mais comuns

```
✅ SUCESSO
200 OK              → Requisição bem-sucedida (GET, PUT)
201 Created         → Recurso criado com sucesso (POST)
204 No Content      → Sucesso, sem corpo na resposta (DELETE)

🔀 REDIRECIONAMENTO
301 Moved Permanently  → URL mudou definitivamente
302 Found              → Redirecionamento temporário
304 Not Modified       → Cache ainda válido

❌ ERRO DO CLIENTE
400 Bad Request     → Dados inválidos na requisição
401 Unauthorized    → Não autenticado (precisa fazer login)
403 Forbidden       → Autenticado mas sem permissão
404 Not Found       → Recurso não existe
422 Unprocessable   → Dados corretos mas semanticamente inválidos
429 Too Many Req.   → Muitas requisições (rate limit)

💥 ERRO DO SERVIDOR
500 Internal Server Error  → Erro genérico no servidor
502 Bad Gateway            → Servidor intermediário recebeu resposta inválida
503 Service Unavailable    → Servidor fora do ar ou sobrecarregado
```

### Como interpretar o status code no frontend

```javascript
const resposta = await fetch("/api/produtos")

if (resposta.ok) {
  // resposta.ok é true para status 200-299
  const dados = await resposta.json()
  console.log(dados)
} else if (resposta.status === 401) {
  // usuário não autenticado
  navigate("/login")
} else if (resposta.status === 404) {
  // recurso não encontrado
  mostrarMensagem("Produto não encontrado")
} else {
  // erro genérico
  mostrarMensagem("Algo deu errado. Tente novamente.")
}
```

---

## Exemplo de Comunicação Front-end e API

### O fluxo completo

```
Usuário clica em "Ver Produtos"
           ↓
Frontend faz fetch() para a API
           ↓
API recebe GET /produtos
           ↓
API busca dados (banco, arquivo, memória)
           ↓
API responde com JSON + status 200
           ↓
Frontend converte JSON com .json()
           ↓
Frontend renderiza os dados na tela
```

### Fazendo requisições com fetch

O `fetch` é a API nativa do browser para fazer requisições HTTP. Retorna uma **Promise** — por isso usa-se `async/await` ou `.then()`.

```javascript
// GET — buscar dados
async function buscarProdutos() {
  try {
    const resposta = await fetch("https://api.exemplo.com/produtos")

    if (!resposta.ok) {
      throw new Error(`Erro: ${resposta.status}`)
    }

    const produtos = await resposta.json()
    return produtos
  } catch (erro) {
    console.error("Falha na requisição:", erro)
  }
}
```

```javascript
// POST — enviar dados
async function criarProduto(novoProduto) {
  const resposta = await fetch("https://api.exemplo.com/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoProduto),
  })

  const criado = await resposta.json()
  return criado
}
```

```javascript
// PUT — atualizar dados
async function atualizarProduto(id, dadosAtualizados) {
  const resposta = await fetch(`https://api.exemplo.com/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosAtualizados),
  })

  return await resposta.json()
}
```

```javascript
// DELETE — remover dados
async function deletarProduto(id) {
  const resposta = await fetch(`https://api.exemplo.com/produtos/${id}`, {
    method: "DELETE",
  })

  // DELETE geralmente retorna 204 (sem body)
  if (resposta.status === 204) {
    console.log("Produto removido com sucesso")
  }
}
```

### Integrando com React

```jsx
import { useState, useEffect } from "react"

function ListaProdutos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch("https://api.exemplo.com/produtos")

        if (!resposta.ok) throw new Error(`Status: ${resposta.status}`)

        const dados = await resposta.json()
        setProdutos(dados)
      } catch (e) {
        setErro(e.message)
      } finally {
        setCarregando(false)
      }
    }

    carregar()
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Erro: {erro}</p>

  return (
    <ul>
      {produtos.map((p) => (
        <li key={p.id}>
          {p.nome} — R$ {p.preco}
        </li>
      ))}
    </ul>
  )
}
```

### Os dois passos para ler a resposta

```javascript
// fetch retorna uma Promise de Response — não os dados diretamente
const resposta = await fetch("/api/produtos")

// Para ler o body, é necessário um segundo await:
const dados = await resposta.json()    // body em JSON → objeto JS
const texto = await resposta.text()    // body como string pura
const blob  = await resposta.blob()    // body como arquivo binário

// ⚠️ O body só pode ser lido UMA vez
// Tentar chamar .json() depois de .text() na mesma resposta vai falhar
```

---

## Métodos HTTP e suas Convenções

| Método | Operação CRUD | Uso típico | Body? |
|---|---|---|---|
| `GET` | Read | Buscar dados | ❌ |
| `POST` | Create | Criar recurso | ✅ |
| `PUT` | Update (completo) | Substituir recurso | ✅ |
| `PATCH` | Update (parcial) | Atualizar campos específicos | ✅ |
| `DELETE` | Delete | Remover recurso | ❌ |

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| O que é backend | Camada servidor: lógica, banco de dados, segurança |
| O que é servidor | Processo que escuta requisições e retorna respostas HTTP |
| Navegar no terminal | `cd`, `ls`, `mkdir`, `touch`, `rm` |
| Iniciar projeto Node | `npm init -y` → gera `package.json` |
| Instalar dependência | `npm install <pacote>` |
| Instalar dev dependency | `npm install <pacote> --save-dev` |
| Rodar script customizado | `npm run <nome-do-script>` |
| O que é API | Contrato de comunicação entre sistemas |
| O que é Web API | API acessível via HTTP, responde com JSON |
| Formato JSON | `{ "chave": "valor" }` — chaves com aspas duplas, sem funções |
| JSON → JS | `JSON.parse(string)` |
| JS → JSON | `JSON.stringify(objeto)` |
| Status 2xx | Sucesso (`200 OK`, `201 Created`, `204 No Content`) |
| Status 4xx | Erro do cliente (`400`, `401`, `403`, `404`) |
| Status 5xx | Erro do servidor (`500`, `502`, `503`) |
| Fazer requisição GET | `await fetch(url)` |
| Fazer requisição POST | `fetch(url, { method: "POST", headers: {...}, body: JSON.stringify(dados) })` |
| Verificar sucesso | `resposta.ok` (true para status 200–299) |
| Ler body da resposta | `await resposta.json()` — segundo await necessário |
| Integrar fetch ao React | `useEffect` com `async function` interna + estados de loading e erro |
