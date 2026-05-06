export function Botao({ valor, Inc, Dec, Zero, min, max }) {
  return (
    <>
      <h1>Contador</h1>
      <p>Valor atual é: {valor}</p>
      <button onClick={Inc} disabled={valor === max}>
        {" "}
        Adicionar
      </button>
      <button onClick={Dec} disabled={valor === min}>
        {" "}
        Diminuir
      </button>
      <button onClick={Zero} disabled={valor === 0}>
        {" "}
        Zerar
      </button>
      {valor === max && <p>Limite máximo atingido</p>}
      {valor === min && <p>Limite minimo atingido</p>}
    </>
  );
}
