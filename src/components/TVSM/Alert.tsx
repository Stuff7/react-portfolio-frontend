import React from "react";

import {Snackbar, Slide} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import useTranslator from "../../hooks/useTranslator";
import usePrevious from "../../hooks/usePrevious";

export default function Alert({length}: AlertProps) {
  const _ = useTranslator();
  const [seriesDiff, setSeriesDiff] = React.useState(0);
  const prevLength = usePrevious(length);
  const action = seriesDiff < 0? "Removed" : "Added";
  const count = Math.abs(seriesDiff);

  React.useEffect(()=> {
    if(length !== prevLength)
      setSeriesDiff(length - prevLength);
  }, [length, prevLength]);

  function closeAlert() {
    setSeriesDiff(0);
  }

  return (
    <Snackbar 
      open={seriesDiff !== 0}
      autoHideDuration={3000}
      onClose={closeAlert}
      TransitionComponent={Slide}>
      <MuiAlert onClose={closeAlert} severity={actions[action]} elevation={6} variant="filled">
        {_(action)} {count !== 1 && count} {_("series")}
      </MuiAlert>
    </Snackbar>
  );
}

const actions: {[key: string]: "success" | "error"} = {
  Added: "success",
  Removed: "error",
};

interface AlertProps {
  length: number;
}
