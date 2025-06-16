import { createContext, useEffect, useState } from "react";

export let WindowSize = createContext("");

export default function WindowContext({ children }) {
  let [windowSize, setWindowSize] = useState(window.innerWidth);
  useEffect(() => {
    function WindowWidth(){
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", WindowWidth);
    return () => {
      window.removeEventListener("resize", WindowWidth);
    }
  },[])
  return (
    <WindowSize.Provider value={{ windowSize, setWindowSize }}>{children}</WindowSize.Provider>
  );
}
