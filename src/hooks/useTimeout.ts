import {useCallback, useRef} from "react";

export default function useTimeout(): [TimeoutFunction, CancelFunction] {
  const timerIDRef = useRef<number>();

  const setTimeout = useCallback((callback: ()=> void, delay: number = 0)=> {
    timerIDRef.current = window.setTimeout(callback, delay);
  }, []);

  const cancel = useCallback(()=> {
    window.clearTimeout(timerIDRef.current);
  }, []);

  return [setTimeout, cancel];
}

type TimeoutFunction = (callback: ()=> void, delay?: number)=> void;
type CancelFunction = ()=> void;
