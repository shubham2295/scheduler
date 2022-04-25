import { useState } from "react";

const useVisualMode = (intial) => {

  //const [mode, setMode] = useState(intial);
  const [history, setHistory] = useState([intial]);

  const transition = (mode, replace = false) => {
    replace ? setHistory(prev => {
      prev.splice(prev.length - 1, 1, mode);
      return [...prev];
    }) :
      setHistory(prev => [...prev, mode]);
  };

  const back = () => {

    const historyArrayLength = history.length;

    if (historyArrayLength > 1) {
      const updatedHistory = history.slice(0, history.length - 1);
      setHistory(updatedHistory);
    }

  };

  return ({ mode: history[history.length - 1], transition, back });

};

export default useVisualMode;