# JavaScript — Módulo 36: Formulários em React

## Status: CONCLUÍDO
- **Projetos:** 1 (Formulário de Cadastro com validação completa)
- **Foco:** Inputs controlados, onChange, onSubmit, React Hook Form, Controller, validação com Yup

---

## Construindo um Formulário com React

Formulários em React diferem do HTML puro porque o React assume o controle dos dados — cada campo é sincronizado com o estado, não com o DOM diretamente.

```jsx
import { useState } from "react"

function Formulario() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")

  return (
    <form>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Seu nome"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu e-mail"
      />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

Para formulários com muitos campos, agrupe o estado em um único objeto para evitar múltiplos `useState`:

```jsx
const [form, setForm] = useState({
  nome: "",
  email: "",
  senha: "",
})

function handleChange(e) {
  const { name, value } = e.target
  setForm((prev) => ({ ...prev, [name]: value })) // [name] é chave dinâmica
}

// No JSX — cada input precisa do atributo name correspondente à chave do objeto
<input name="nome" value={form.nome} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />
```

---

## Dominando o onChange: Reatividade em Ação

`onChange` é o evento que dispara a cada tecla digitada. Ele é o mecanismo que mantém o estado sincronizado com o que o usuário vê — o que caracteriza um **input controlado**.

```jsx
// e.target.value sempre contém o valor atual do campo
function handleChange(e) {
  console.log(e.target.value) // string com o que foi digitado
  setNome(e.target.value)
}

// Para checkboxes, o valor vem de e.target.checked (booleano)
function handleCheck(e) {
  setAceito(e.target.checked)
}

// Para selects, funciona igual ao input de texto
function handleSelect(e) {
  setOpcao(e.target.value)
}
```

**Regra:** nunca use `e.target.value` fora do handler sem guardá-lo antes — o objeto de evento é reutilizado pelo React (event pooling) e pode ser nulo em operações assíncronas.

---

## onSubmit + preventDefault: Controle Total

O comportamento padrão de um `<form>` é recarregar a página ao ser submetido. No React, sempre prevenimos esse comportamento e tratamos o envio manualmente.

```jsx
function Formulario() {
  const [email, setEmail] = useState("")

  function handleSubmit(e) {
    e.preventDefault() // impede o reload da página

    console.log("Enviando:", email)
    // aqui você chama a API, valida, etc.
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

**Padrão com múltiplos campos e limpeza após envio:**

```jsx
function handleSubmit(e) {
  e.preventDefault()

  if (!form.nome || !form.email) return // validação simples

  console.log("Dados:", form)

  setForm({ nome: "", email: "", senha: "" }) // limpa o formulário
}
```

---

## Inputs Controlados e Não Controlados

### Controlado

O React é a fonte da verdade — o valor do input vem sempre do estado. Qualquer mudança passa pelo `onChange` e pelo `setState`.

```jsx
// ✅ Controlado — valor sempre espelha o estado
const [nome, setNome] = useState("")

<input value={nome} onChange={(e) => setNome(e.target.value)} />
```

### Não Controlado

O DOM é a fonte da verdade — o React não gerencia o valor, apenas lê quando necessário, via `ref`.

```jsx
// Input não controlado — lido via ref no momento do submit
import { useRef } from "react"

function Formulario() {
  const inputRef = useRef(null)

  function handleSubmit(e) {
    e.preventDefault()
    console.log(inputRef.current.value) // lê o valor direto do DOM
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} type="text" defaultValue="" />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

### Quando usar cada um

| | Controlado | Não Controlado |
|---|---|---|
| Fonte da verdade | Estado React | DOM |
| Validação em tempo real | ✅ Fácil | ❌ Difícil |
| Acesso ao valor | A qualquer momento via estado | Só via `ref` |
| Recomendado para | Maioria dos casos | Integrações com libs externas |

---

## React Hook Form

React Hook Form (RHF) é uma biblioteca que elimina o boilerplate de `useState` + `onChange` em formulários, usando refs por baixo dos panos. Resultado: menos re-renders e código mais enxuto.

```bash
npm install react-hook-form
```

### useForm — Conceito Básico

```jsx
import { useForm } from "react-hook-form"

function Formulario() {
  const { register, handleSubmit } = useForm()

  function onSubmit(data) {
    console.log(data) // { nome: "...", email: "..." }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("nome")} placeholder="Nome" />
      <input {...register("email")} placeholder="E-mail" />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

`register` conecta o campo ao RHF e retorna props (`name`, `ref`, `onChange`, `onBlur`) que são espalhadas no input via spread `{...register("campo")}`.

`handleSubmit` envolve o seu `onSubmit` — só chama a função se o formulário passar na validação.

---

## Do useForm ao Controller

### Register — para inputs nativos

`register` funciona diretamente em elementos nativos do HTML (`input`, `select`, `textarea`). É a forma mais simples e performática.

```jsx
// Registro com validação embutida
<input
  {...register("email", {
    required: "E-mail obrigatório",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "E-mail inválido",
    },
  })}
/>
```

### Controller — para componentes externos

Quando o input não é um elemento HTML nativo (componentes de UI libraries como MUI, Chakra, react-select), `Controller` age como uma ponte entre o RHF e o componente.

```jsx
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"

function Formulario() {
  const { control, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <Controller
        name="categoria"
        control={control}
        rules={{ required: "Selecione uma categoria" }}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "dev", label: "Desenvolvimento" },
              { value: "design", label: "Design" },
            ]}
          />
        )}
      />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

---

## Register vs Controller: Quando Usar Cada Um

| Situação | Usar |
|---|---|
| `<input>`, `<select>`, `<textarea>` nativos | `register` |
| Componentes de UI libraries (MUI, Chakra, etc.) | `Controller` |
| Inputs que precisam de lógica de renderização customizada | `Controller` |
| Máxima performance (menos re-renders) | `register` |
| Componente que não aceita `ref` externo | `Controller` |

```jsx
// register — simples e direto
<input {...register("nome")} />

// Controller — quando o componente não aceita ref nativo
<Controller
  name="nome"
  control={control}
  render={({ field }) => <MeuInputCustomizado {...field} />}
/>
```

---

## Tratando Erros com formState.errors

`formState.errors` é um objeto que contém os erros de validação de cada campo. Se um campo passou na validação, ele não aparece no objeto.

```jsx
const { register, handleSubmit, formState: { errors } } = useForm()

// Exibindo o erro abaixo do campo
<div>
  <input
    {...register("email", {
      required: "E-mail é obrigatório",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Formato de e-mail inválido",
      },
    })}
  />
  {errors.email && (
    <span style={{ color: "red", fontSize: "0.85rem" }}>
      {errors.email.message}
    </span>
  )}
</div>
```

**Estrutura do objeto de erro:**

```js
// errors quando "email" está vazio e "senha" é curta
{
  email: {
    type: "required",
    message: "E-mail é obrigatório"
  },
  senha: {
    type: "minLength",
    message: "Mínimo de 8 caracteres"
  }
}
```

---

## Controlando o Envio com isSubmitting

`isSubmitting` é um booleano do `formState` que fica `true` enquanto a função `onSubmit` está sendo executada. Ideal para desabilitar o botão durante o envio e evitar duplo clique.

```jsx
const { handleSubmit, formState: { errors, isSubmitting } } = useForm()

async function onSubmit(data) {
  await new Promise((r) => setTimeout(r, 2000)) // simula chamada de API
  console.log("Enviado:", data)
}

// No JSX
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Enviando..." : "Enviar"}
</button>
```

**Outros estados úteis do formState:**

| Estado | Descrição |
|---|---|
| `isSubmitting` | `true` enquanto o onSubmit está rodando |
| `isSubmitted` | `true` após o primeiro envio (mesmo com erro) |
| `isValid` | `true` se todos os campos passaram na validação |
| `isDirty` | `true` se algum campo foi alterado |
| `errors` | Objeto com os erros de cada campo |

---

## Validação com Yup

Yup é uma biblioteca de validação de schemas. Em vez de espalhar regras por cada `register`, você define todas as regras em um lugar só — o schema — e conecta ao RHF via `yupResolver`.

```bash
npm install yup @hookform/resolvers
```

### Criando um Schema de Validação

```js
// schemas/cadastroSchema.js
import * as yup from "yup"

export const cadastroSchema = yup.object({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .min(3, "Mínimo de 3 caracteres"),

  email: yup
    .string()
    .required("E-mail é obrigatório")
    .email("Formato de e-mail inválido"),

  senha: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Mínimo de 8 caracteres"),

  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não conferem")
    .required("Confirmação é obrigatória"),

  idade: yup
    .number()
    .typeError("Digite um número")
    .min(18, "Você precisa ter pelo menos 18 anos")
    .required("Idade é obrigatória"),
})
```

---

## Integrando Yup ao React Hook Form

```jsx
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { cadastroSchema } from "./schemas/cadastroSchema"

function FormularioCadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(cadastroSchema), // conecta o schema ao RHF
  })

  async function onSubmit(data) {
    await new Promise((r) => setTimeout(r, 1500))
    console.log("Cadastro:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("nome")} placeholder="Nome completo" />
        {errors.nome && <span>{errors.nome.message}</span>}
      </div>

      <div>
        <input {...register("email")} placeholder="E-mail" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input {...register("senha")} type="password" placeholder="Senha" />
        {errors.senha && <span>{errors.senha.message}</span>}
      </div>

      <div>
        <input
          {...register("confirmarSenha")}
          type="password"
          placeholder="Confirmar senha"
        />
        {errors.confirmarSenha && <span>{errors.confirmarSenha.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  )
}
```

**Por que usar Yup com RHF:**
- Regras centralizadas em um arquivo de schema reutilizável
- Validações complexas (senhas iguais, campos condicionais) ficam limpas
- Mensagens de erro consistentes em todo o projeto
- Schema pode ser compartilhado com o backend (ex: com Zod no tRPC)

---

## Padrões Revisados neste Módulo

| Conceito | Técnica / Sintaxe |
|---|---|
| Estado de formulário agrupado | `useState({ campo1: "", campo2: "" })` |
| Handler genérico de onChange | `[e.target.name]: e.target.value` com chave dinâmica |
| Prevenir reload do form | `e.preventDefault()` no `onSubmit` |
| Input controlado | `value={estado}` + `onChange` obrigatório |
| Input não controlado | `defaultValue` + `useRef` para leitura |
| Registro no RHF | `{...register("campo")}` espalhado no input |
| Validação inline no register | `register("campo", { required: "msg", minLength: { value: 3 } })` |
| Componentes externos no RHF | `<Controller name control render />` |
| Exibir erro de campo | `{errors.campo && <span>{errors.campo.message}</span>}` |
| Bloquear envio duplo | `disabled={isSubmitting}` no botão |
| Schema de validação | `yup.object({ campo: yup.string().required() })` |
| Integração Yup + RHF | `useForm({ resolver: yupResolver(schema) })` |
| Campo de confirmação | `yup.string().oneOf([yup.ref("outroCampo")])` |
