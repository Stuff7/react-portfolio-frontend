import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import useHighlightChanges from "../hooks/useHighlightChanges";

const useStyles = makeStyles(({palette})=> ({
  network: {
    opacity: 0.7,
  },
}));

export default function Network({name}: NetworkProps) {
  const classes = useStyles();

  return (
    <span
      className={classes.network} style={useHighlightChanges(name)}>{name}</span>
  );
}

interface NetworkProps {
  name: string|null;
}
