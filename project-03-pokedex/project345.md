Projeto 1 — Contador
  useState, props, disabled, renderização condicional
  
Projeto 2 — Lista simples      ← você está aqui
  useState com arrays, add/remove, .map(), .filter()
  ZERO coisa nova de API ou useEffect

Projeto 3 — Cronômetro
  useEffect com setInterval, cleanup, useRef
  sem API, sem fetch

Projeto 4 — Buscador de CEP
  useEffect com fetch, async/await, loading, erro
  API simples, só um campo, um botão

Projeto 5 — Pokemon
  tudo do 4 + navegação com dependência no useEffect


Projetos 3, 4 e 5
Projeto 3 — Cronômetro
Inicia, pausa e reseta um timer que conta segundos. Usa useRef pra guardar o setInterval sem causar re-render, e useState pra exibir o tempo na tela. Ensina a diferença entre ref e estado — quando usar cada um.
Hooks: useState useRef useEffect

Projeto 4 — Tema global
Botão que alterna entre tema claro e escuro em toda a aplicação, sem passar props por vários componentes. Qualquer componente da árvore acessa e muda o tema diretamente. Ensina o problema do prop drilling e a solução com contexto.
Hooks: useState useContext createContext

Projeto 5 — Hook personalizado de fetch
Pega a lógica de busca da API do Projeto 2 (loading, erro, dado) e extrai pra um hook useFetch reutilizável. Qualquer componente que precisar de dados de qualquer URL usa o mesmo hook. Ensina a criar abstrações e a pensar em reutilização.
Hooks: useState useEffect + custom hook useFetch
