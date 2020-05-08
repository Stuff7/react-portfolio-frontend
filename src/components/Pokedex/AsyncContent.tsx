import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AsyncContent from "../AsyncContent";
import SpinningPokeball from "./SpinningPokeball";
import {HTMLDivProps} from "../types";

const useStyles = makeStyles(theme=> ({
  loading: {
    position: "relative",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    "& .MuiCircularProgress-svg": {
      color: theme.palette.text.primary,
    },
  },
}));

export default function AsyncPokeContent({children, ...props}: AsyncContentProps) {
  const classes = useStyles();

  return (
    <AsyncContent
     loading={()=> <div className={classes.loading}><SpinningPokeball width="25%"/></div>} {...props}>
      {children}
    </AsyncContent>
  );
}

interface AsyncContentProps extends HTMLDivProps {
  ready: boolean;
}
