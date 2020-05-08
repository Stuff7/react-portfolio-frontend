import {useEffect, useRef, useState} from "react";
import {fetchJSON} from "../../../utils/dry";
import {Response} from "../types";

export default function useAPI(): [Response, boolean] {
  const APIRef = useRef(defaultAPI);
  const [ready, setReady] = useState(false);

  useEffect(()=> {
    fetchJSON("/api/customapis/").then((APIResponse: Response)=> {
      APIRef.current = APIResponse;
      setReady(true);
    });
  }, [APIRef, ready]);

  return [APIRef.current, ready];
}

const defaultAPI: Response = {
  providers: [],
  apis: [],
}
