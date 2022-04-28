import { useState } from "react";

// manages the history of user interactions so user can go back to previous action
const useVisualMode = (intial) => {

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

      setHistory(prev => {
        const updatedHistory = prev.slice(0, prev.length - 1);
        return [...updatedHistory];
      });
    }

  };

  return ({ mode: history[history.length - 1], transition, back });

};

export default useVisualMode;