import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {SpinningAnimation} from "../../utils/animations";
import PokeballIcon from "./PokeballIcon";
import {IconProps} from "../types";

const useStyles = makeStyles(theme=> ({
  loading: {
    animation: "$spin 0.8s linear infinite",
    stroke: theme.palette.text.primary,
    strokeOpacity: 0.6,
  },
  ...SpinningAnimation,
}));

export default function SpinningPokeball({className, ...props}: IconProps) {
  const classes = useStyles();

  return (
    <PokeballIcon className={`${classes.loading} ${className}`} {...props}/>
  );
}
