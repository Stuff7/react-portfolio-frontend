import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {RippleAnimation, ShakeAnimation} from "../utils/animations";

const useStyles = makeStyles(theme=> ({
  root: {
    cursor: "default",
    margin: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 128, minWidth: 128,
    height: 128, minHeight: 128,
    borderRadius: "100%",
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    animation: "$ripple 0.7s linear infinite",
    "&:hover": {
      animation: "$ripple 0.7s linear infinite, $shake 0.7s linear infinite",
    },
    "& h2": {
      fontFamily: "Satisfy",
      fontWeight: "bold",
    },
    "& .MuiTypography-caption": {
      fontStyle: "italic"
    }
  },
  ...RippleAnimation(theme.palette.secondary.light),
  ...ShakeAnimation,
}));

export default function Logo({className, ...props}: LogoProps) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className? className : ""}`} {...props}>
      <Typography variant="h2">S7</Typography>
    </div>
  );
}

type LogoProps = React.PropsWithoutRef<JSX.IntrinsicElements["div"]>;
