import { useState } from "react";
import { Botao } from "./components/Botao";

export function App() {
  const [contador, setContador] = useState(0);

  const min = 0;
  const max = 10;

  const handleInc = () => {
    if (contador < max) {
      setContador((prev) => prev + 1);
    }
  };
  const handleDec = () => {
    if (contador > min) {
      setContador((prev) => prev - 1);
    }
  };
  const handleZero = () => {
    setContador(0);
  };

  return (
    <Botao
      valor={contador}
      Inc={handleInc}
      Dec={handleDec}
      Zero={handleZero}
      min={min}
      max={max}
    />
  );
}
