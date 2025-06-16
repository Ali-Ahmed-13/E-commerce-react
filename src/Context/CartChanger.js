import { createContext, useState } from "react";

export let Cart = createContext("");

export default function CartChangerContext({ children }) {
  let [isChange, setIsChange] = useState(true);

  return (
    <Cart.Provider value={{ isChange, setIsChange }}>{children}</Cart.Provider>
  );
}
