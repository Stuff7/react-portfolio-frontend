import {useState, useEffect, CSSProperties} from "react";

import usePrevious from "../../../hooks/usePrevious";

export default function useHighlightChanges<T>(value: T) {
  const changed = value !== usePrevious(value);
  const [highlight, setHighlight] = useState(false);

  useEffect(()=> {
    changed && setHighlight(true);
  }, [changed]);

  return highlight? important : undefined;
}

const important: CSSProperties = {
  color: "#f50057",
  fontWeight: "bold",
  opacity: 1,
};
