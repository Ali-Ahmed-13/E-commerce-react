import { createContext, useState } from "react";

export let Menu = createContext("");

export default function MenuContext({ children }) {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Menu.Provider value={{ isOpen, setIsOpen }}>{children}</Menu.Provider>
  );
}
