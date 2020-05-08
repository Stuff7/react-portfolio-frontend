import React from "react";
import useTimeout from "../../../hooks/useTimeout";
import {TotalPokemon} from "../PokeAPI";

export default function useCardManager<T extends HTMLElement>(ref: Reference<T>): CardManagerHook {
  const [timeoutAddEvent, cancelAddEvent] = useTimeout();
  const [cardCount, setCardCount] = React.useState(20);

  const updateLayout = React.useCallback(()=> {
    cancelAddEvent();
    timeoutAddEvent(()=> {
      if(cardCount > TotalPokemon) return;
      const grid = ref.current;

      if(grid && grid.scrollHeight === grid.clientHeight)
        setCardCount(calcTotalCards(grid.scrollWidth, grid.scrollHeight));
    }, 50);
  }, [cardCount, timeoutAddEvent, cancelAddEvent, ref]);

  const updateLayoutAtBottom = React.useCallback(({target}: UIEvent)=> {
    if(cardCount < TotalPokemon && target.scrollTop >= target.scrollHeight - target.offsetHeight - 8)
      setCardCount(calcTotalCards(target.scrollWidth, target.scrollHeight+256));
  }, [cardCount]);

  React.useEffect(()=> {
    updateLayout();
    window.addEventListener("resize", updateLayout);

    return ()=> window.removeEventListener("resize", updateLayout);
  }, [updateLayout]);

  return [cardCount, updateLayoutAtBottom];
}

function calcTotalCards(screenW: number, screenH: number) {
  return ((screenW / 352 | 0) + 1) * ((screenH / 128 | 0) + 1) | 0;
}

interface UIEvent extends React.UIEvent<HTMLDivElement> {
  target: HTMLDivElement;
}

type Reference<T extends HTMLElement> = React.MutableRefObject<T | null>;

type CardManagerHook = [number, (event: UIEvent)=> void];
