import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import useMediaQuery from "../../hooks/useMediaQuery";
import useTranslator from "../../hooks/useTranslator";

import MoonIcon from "./MoonIcon";

const useStyles = makeStyles(theme=> ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%",
    fontSize: 32,
    textAlign: "center",
    background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.dark})`,
    color: theme.palette.primary.contrastText,
  },
  smallRoot: {
    fontSize: 18,
  },
  moon: {
    lineHeight: 0,
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 128,
    fontWeight: "bold",
    "& svg": {
      width: 128,
      height: 128,
    }
  },
  smallMoon: {
    fontSize: 64,
    "& svg": {
      width: 64,
      height: 64,
    },
  },
  oops: {
    fontSize: 48,
    fontWeight: "bold",
  },
  smallOops: {
    fontSize: 32,
  },
}));

export default function NotFound() {
  const _ = useTranslator();
  const classes = useStyles();
  const isPhone = useMediaQuery("(max-width:300px)");

  return (
    <div className={isPhone(classes.root, classes.smallRoot)}>
      <div className={isPhone(classes.moon, classes.smallMoon)}>
        4<MoonIcon/>4
      </div>
      <div className={isPhone(classes.oops, classes.smallOops)}>{_("OOPS!")}</div>
      <div>{_("It looks like you're lost...")}</div>
    </div>
  );
}
