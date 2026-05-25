# JavaScript — Módulo 12: Depuração e Desenvolvimento Eficiente

## Status: CONCLUÍDO
- **Aulas:** 5 (motivação, console.log, Dev Tools, debugger e correção prática de erros)
- **Foco:** console.log, Dev Tools do browser, breakpoints, call stack, depuração passo a passo

---

## Por que Depurar bem é uma Habilidade Essencial?

Todo programador passa a maior parte do tempo não escrevendo código novo, mas **entendendo por que o código existente não funciona**. Depurar bem é o que separa quem fica travado por horas de quem resolve o problema em minutos.

```
Desenvolvedor sem técnica de depuração:
Erro → tentativa aleatória → mais erros → frustração → reescreve tudo

Desenvolvedor com técnica de depuração:
Erro → hipótese → verificação pontual → causa identificada → correção cirúrgica
```

Depuração não é um sinal de que você é ruim em programação — é parte normal e esperada do processo de desenvolvimento.

---

## Console.log — A Primeira Abordagem

O `console.log` é a ferramenta mais simples e mais usada para inspecionar o estado do programa em tempo de execução. A ideia é **revelar o que está acontecendo** em pontos específicos do código.

```js
// Uso básico
console.log("valor de x:", x)
console.log("array de usuários:", usuarios)
console.log("objeto completo:", { nome, idade, email })
```

### Além do console.log

O objeto `console` oferece outros métodos úteis para organizar e categorizar a saída:

```js
console.log("mensagem comum")        // texto padrão
console.warn("atenção aqui")         // texto amarelo — alerta
console.error("algo falhou")         // texto vermelho — erro
console.info("informação relevante") // texto azul — informativo

// Agrupar logs relacionados
console.group("Dados do usuário")
console.log("nome:", usuario.nome)
console.log("email:", usuario.email)
console.groupEnd()

// Medir tempo de execução
console.time("busca")
buscarDados()
console.timeEnd("busca") // imprime o tempo decorrido

// Exibir arrays/objetos como tabela
console.table(usuarios) // renderiza uma tabela no DevTools
```

### Limitações do console.log

| Situação | Problema |
|---|---|
| Muitos logs espalhados | Difícil de acompanhar — poluem o console |
| Código assíncrono | A ordem dos logs pode enganar |
| Objetos por referência | O valor exibido pode refletir o estado futuro, não o momento do log |
| Produção | Logs esquecidos no código expõem dados internos |

```js
// Armadilha comum — objeto exibido pelo valor futuro
const obj = { x: 1 }
console.log(obj)   // pode mostrar { x: 2 } se o objeto for mutado depois
obj.x = 2

// Solução — logar uma cópia para congelar o estado atual
console.log({ ...obj })
console.log(JSON.parse(JSON.stringify(obj))) // deep copy para objetos aninhados
```

> **Boa prática:** use `console.log` como ponto de partida, mas remova ou substitua por um debugger quando o problema for mais complexo. Nunca suba logs de debug para produção.

---

## Dev Tools e o Depurador (Debugger)

As ferramentas de desenvolvedor do browser (DevTools) vão muito além do console. O **Debugger** (aba "Sources" no Chrome / "Depurador" no Firefox) permite pausar a execução do código e inspecionar tudo em tempo real — sem precisar adivinhar.

### Abrindo o DevTools

```
Chrome / Edge:   F12  ou  Ctrl+Shift+I  (Windows/Linux)
                          Cmd+Option+I  (Mac)

Firefox:         F12  ou  Ctrl+Shift+I

Atalho direto para o console:   Ctrl+Shift+J  (Chrome)
```

### Principais abas do DevTools

| Aba | O que faz |
|---|---|
| **Console** | Executa JS, exibe logs e erros |
| **Sources** | Abre o código-fonte, permite breakpoints e depuração |
| **Elements** | Inspeciona e edita HTML/CSS ao vivo |
| **Network** | Monitora requisições HTTP, respostas, tempos |
| **Application** | Inspeciona localStorage, cookies, cache |

---

## Breakpoints — Pausando o Código

Um **breakpoint** é um marcador que diz ao browser: *"pause a execução aqui"*. Quando o código chega àquela linha, tudo para — e você pode inspecionar o estado completo do programa naquele momento.

### Como adicionar um breakpoint

```
1. Abrir DevTools → aba Sources (Chrome) ou Depurador (Firefox)
2. Navegar até o arquivo JavaScript desejado
3. Clicar no número da linha onde quer pausar
4. O marcador azul confirma o breakpoint ativo
5. Recarregar a página ou disparar a ação que executa aquele código
```

### Breakpoint via código com debugger

A palavra-chave `debugger` inserida diretamente no código tem o mesmo efeito que um breakpoint manual — pausa a execução quando o DevTools está aberto.

```js
function calcularDesconto(preco, percentual) {
  debugger // execução para aqui quando DevTools está aberto
  const desconto = preco * (percentual / 100)
  return preco - desconto
}
```

> **Vantagem do `debugger` no código:** útil para pausar em pontos difíceis de alcançar manualmente (dentro de callbacks, loops, código assíncrono). Lembre-se de remover antes de publicar.

---

## Navegando pela Execução Passo a Passo

Com a execução pausada em um breakpoint, o DevTools oferece controles para avançar pelo código com precisão:

| Controle | Atalho (Chrome) | O que faz |
|---|---|---|
| **Resume** | F8 | Continua até o próximo breakpoint |
| **Step Over** | F10 | Executa a linha atual, sem entrar em funções |
| **Step Into** | F11 | Entra dentro da função chamada na linha atual |
| **Step Out** | Shift+F11 | Sai da função atual, volta para quem a chamou |

```
Step Over → ideal para avançar linha a linha sem se perder em funções auxiliares
Step Into → ideal para investigar o que acontece dentro de uma função suspeita
Step Out  → ideal para sair de uma função que já inspecionou o suficiente
```

---

## Inspecionando o Estado durante a Depuração

Com a execução pausada, o DevTools exibe informações valiosas sobre o estado atual:

### Painel Scope (Escopo)

Mostra todas as variáveis disponíveis naquele ponto da execução — locais, de closure e globais — com seus valores atuais.

```
Local   → variáveis da função atual
Closure → variáveis capturadas de funções externas
Global  → variáveis globais (window, document...)
```

### Painel Watch (Expressões Observadas)

Permite adicionar expressões personalizadas para monitorar — o DevTools as avalia a cada passo.

```js
// Exemplos de expressões para adicionar no Watch:
usuario.nome
carrinho.length
precoTotal > 100
itens.filter(i => i.ativo)
```

### Painel Call Stack (Pilha de Chamadas)

Mostra a sequência de funções que foram chamadas para chegar até o ponto atual. Lê-se de baixo para cima — a função no topo é a que está em execução.

```
calcularTotal    ← em execução agora
aplicarDesconto
finalizarPedido
handleClick      ← onde tudo começou
```

> **Call Stack é essencial para entender o contexto:** não só *o que* está acontecendo, mas *por que* o código chegou até ali — qual cadeia de chamadas levou até o ponto com problema.

---

## Estratégia para Corrigir Erros com DevTools

Ter uma abordagem metódica torna a depuração muito mais eficiente do que tentar coisas aleatoriamente.

```
1. Leia a mensagem de erro no console com atenção
       ↓
2. Identifique o arquivo e a linha indicados no stack trace
       ↓
3. Forme uma hipótese: "o erro acontece porque..."
       ↓
4. Coloque um breakpoint antes do ponto suspeito
       ↓
5. Inspecione as variáveis no painel Scope
       ↓
6. Avance passo a passo com Step Over / Step Into
       ↓
7. Confirme ou refute a hipótese
       ↓
8. Corrija e verifique se o erro foi resolvido
```

### Lendo mensagens de erro no console

```js
// Exemplo de erro típico:
// TypeError: Cannot read properties of undefined (reading 'nome')
//     at exibirUsuario (app.js:14)
//     at handleClick (app.js:27)

// O que isso diz:
// → Tipo do erro: TypeError
// → O que falhou: tentou acessar .nome em algo undefined
// → Onde: função exibirUsuario, linha 14 de app.js
// → Chamado por: handleClick, linha 27
```

### Tipos comuns de erro e suas causas

| Mensagem de erro | Causa provável |
|---|---|
| `Cannot read properties of undefined` | Variável não foi inicializada ou dado da API ainda não chegou |
| `X is not a function` | Variável não é uma função — talvez tenha sobrescrito o nome |
| `X is not defined` | Variável fora do escopo ou com nome digitado errado |
| `Unexpected token` | Erro de sintaxe — parêntese, chave ou vírgula faltando |
| `Maximum call stack size exceeded` | Recursão infinita — função se chama sem condição de parada |

---

## console.log vs Debugger — Quando Usar Cada Um

| | `console.log` | Debugger (breakpoint) |
|---|---|---|
| Velocidade de uso | Rápido de adicionar | Requer abrir DevTools e navegar |
| Visibilidade do estado | Apenas o que você logou | Todo o escopo visível de uma vez |
| Código assíncrono | Pode confundir a ordem | Pausa no ponto exato |
| Objetos complexos | Pode exibir valor futuro | Sempre exibe o valor atual |
| Ideal para | Verificações rápidas e pontuais | Problemas complexos e difíceis de rastrear |

---

## Padrões Revisados neste Módulo

| Conceito | Técnica |
|---|---|
| Inspecionar valores | `console.log("label:", variavel)` |
| Diferenciar severidade | `console.warn()`, `console.error()`, `console.info()` |
| Agrupar logs | `console.group()` / `console.groupEnd()` |
| Medir performance | `console.time("label")` / `console.timeEnd("label")` |
| Visualizar arrays/objetos | `console.table(dados)` |
| Pausar execução via código | `debugger` |
| Pausar execução via interface | Clicar no número da linha na aba Sources |
| Avançar linha a linha | Step Over (F10) |
| Entrar em uma função | Step Into (F11) |
| Sair de uma função | Step Out (Shift+F11) |
| Inspecionar variáveis | Painel Scope no DevTools |
| Monitorar expressões | Painel Watch no DevTools |
| Entender cadeia de chamadas | Painel Call Stack no DevTools |
| Ler mensagens de erro | Stack trace no console → arquivo + linha + tipo do erro |
