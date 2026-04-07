Durante os módulos 3 a 7 — fundamentos da linguagem
Lê sobre como a memória funciona — stack vs heap. É o que explica por que primitivos e referências se comportam diferente. Não precisa de livro, um artigo de 10 minutos já muda como você lê código.
Pesquisa como o V8 funciona — V8 é o engine que roda JavaScript no Chrome e no Node. Entender que JS é compilado em tempo de execução (JIT compilation) desmonta o mito de que JS é lento.
Começa a ler sobre Clean Code. O livro do Robert Martin é o clássico, mas é verbose. O repositório clean-code-javascript no GitHub é um resumo direto dos princípios aplicados em JS — lê aos poucos, um conceito por semana.

Durante os módulos 8 e 9 — DOM e front-end
Entende como o navegador renderiza uma página — o processo de parsing do HTML, construção do DOM, CSSOM, layout e paint. Pesquisa "browser rendering pipeline". Isso explica por que certas manipulações de DOM são caras e outras não.
Lê sobre acessibilidade básica (a11y). Não precisa se tornar especialista, mas entender atributos ARIA e estrutura semântica te faz escrever HTML melhor desde o início.
Pesquisa o que é Web Vitals — LCP, FID, CLS. São as métricas que o Google usa para medir performance de páginas. Saber que elas existem te faz pensar em performance enquanto ainda está aprendendo.

Durante o módulo 16 — JavaScript assíncrono
Esse é o mais importante da lista: assiste a palestra "What the heck is the event loop anyway" do Philip Roberts no YouTube. É de 2014 mas continua sendo a melhor explicação que existe.
Lê sobre Promises vs callbacks — entender por que Promises foram criadas (o chamado "callback hell") te dá contexto histórico que explica muito da sintaxe moderna.
Pesquisa race conditions — o que acontece quando duas operações assíncronas dependem uma da outra sem coordenação. Conceito que aparece o tempo todo em sistemas reais.

Durante os módulos 17 a 22 — objetos, funções avançadas e POO
Lê sobre SOLID — cinco princípios de design de código orientado a objetos. Não precisa memorizar, só entender o que cada letra significa. Quando o curso apresentar POO, você vai reconhecer os padrões.
Pesquisa programação funcional vs orientada a objetos. JS suporta os dois estilos. Entender quando usar cada um é o que diferencia quem só sabe a sintaxe de quem entende arquitetura.
Lê sobre design patterns clássicos — Factory, Observer, Singleton, Module. O livro "You Don't Know JS" do Kyle Simpson é gratuito no GitHub e cobre muito disso com profundidade.

Durante os módulos 26 a 33 — backend com Node e Express
Aqui o SQL que você já sabe vira ouro. Lê sobre database design — normalização, índices, o que faz uma query ser lenta. Isso o curso provavelmente não cobre bem.
Entende como HTTP funciona de verdade — métodos, status codes, headers, cookies, CORS. Pesquisa "HTTP crash course". Quando o Express começar a fazer sentido você vai querer esse contexto.
Lê sobre REST vs GraphQL — não precisa aprender GraphQL agora, só entender a diferença filosófica entre os dois. REST é o que o curso ensina, mas GraphQL aparece em muitas vagas.
Pesquisa autenticação vs autorização e como JWT funciona. O curso pode tocar nisso superficialmente, mas é um dos conceitos mais cobrados em entrevista e mais usados na prática.
Lê sobre variáveis de ambiente e segurança básica — nunca commitar chaves de API, como usar .env. Parece óbvio mas muita gente aprende isso da pior forma.

Durante os módulos 34 a 43 — React
Lê sobre component-driven development — a filosofia por trás de construir interfaces como peças independentes e combináveis. O site do Storybook tem bons artigos sobre isso.
Pesquisa quando o React re-renderiza — entender o ciclo de vida e o que dispara uma re-renderização te faz escrever hooks muito melhor.
Lê sobre state management — o problema que Redux, Zustand e Context resolvem. Entender o problema antes da solução faz tudo fazer mais sentido.
Pesquisa micro frontends — não para usar agora, mas para entender como aplicações React grandes são organizadas em empresas. Dá contexto de onde tudo isso escala.

Durante todo o curso, sem momento específico
Como a internet funciona — DNS, TCP/IP, o que acontece entre você digitar uma URL e a página carregar. Pesquisa "how the web works" e lê um artigo completo sobre isso.
Git além do básico — o curso ensina o essencial, mas entender branching strategies (GitFlow, trunk-based development) e como escrever boas mensagens de commit te coloca num nível diferente em time.
Lê código de bibliotecas que você usa — não a implementação inteira, mas encontra uma função que você chama todo dia e lê o código fonte dela. Lodash e Express são bons para começar porque o código é bem escrito e comentado.
Segurança básica para web — XSS, CSRF, SQL injection. Você vai evitar automaticamente muitos problemas se souber o que são antes de precisar corrigir.
