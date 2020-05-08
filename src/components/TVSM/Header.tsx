import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import useTranslator from "../../hooks/useTranslator";
import {InputProps} from "../types"
import SlideInput from "./SlideInput";

const useStyles = makeStyles(({palette})=> ({
  root: {
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    "& span": {
      flex: 1,
      "& input": {
        minWidth: 128,
      },
    },
  },
  logo: {
    fontWeight: "bold",
    margin: 0,
    paddingRight: 32,
  },
  credits: {
    position: "absolute",
    bottom: -20,
    right: 0,
    opacity: 0.3,
    "& a": {
      color: palette.text.primary,
      textDecoration: "none",
      fontWeight: "bold",
    },
  },
}));

export default function Header(props: InputProps) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.logo}>TVSM</h1>
      <SlideInput
        id="search-input"
        label={_("Search")}
        placeholder={_("TV Series")+"..."}
        {...props}
      />
      <span className={classes.credits}>
        {_("Powered by")} <a
        href="https://www.tvmaze.com/api"
        target="_blank"
        rel="noopener noreferrer">TVmaze</a>
      </span>
    </div>
  );
}
