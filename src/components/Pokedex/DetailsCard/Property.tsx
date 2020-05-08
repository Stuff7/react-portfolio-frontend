import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {HTMLDivProps} from "../../types";

const useStyles = makeStyles(theme=> ({
  property: {
    display: "flex",
    width: "100%",
    alignItems: "center"
  },
  name: {
    display: "flex",
    alignItems: "center",
    fontSize: "1.5em",
    fontWeight: "bold",
    marginRight: 4,
  },
}));


export default function Property({name, children}: PropertyProps) {
  const classes = useStyles();

  return (
    <div className={classes.property}>
      <div className={classes.name}>{name}: </div>
      <>{children}</>
    </div>
  );
}

interface PropertyProps extends HTMLDivProps {
  name: string;
}
