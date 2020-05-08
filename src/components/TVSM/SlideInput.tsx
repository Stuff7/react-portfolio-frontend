import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import {InputProps} from "../types"

const useStyles = makeStyles(({palette})=> ({
  button: {
    padding: 8,
    position: "absolute",
    right: 0,
    "& svg": {
      fill: palette.text.secondary,
    },
  },
  input: {
    position: "relative",
    display: "inline-flex",
    borderRadius: "0 8px 8px 0",
    "& input": {
      display: "inline-block",
      width: "100%",
      padding: "10px 40px 10px 15px",
      fontFamily: "Exo",
      color: palette.text.secondary,
      background: "transparent",
      border: "none",
      borderBottom: "2px solid",
      borderBottomColor: palette.text.secondary,
      borderBottomLeftRadius: 6,
      outline: 0,
      textIndent: 69,
      transition: "border .3s, text-indent .3s",
      "& + label": {
        display: "block",
        position: "absolute",
        bottom: 2,
        left: 0,
        padding: "10px 15px",
        textShadow: "0 1px 0 rgba(19,74,70,.4)",
        background: palette.text.secondary,
        color: palette.background.default,
        borderRadius: "4px 0 0 4px",
        transformOrigin: "right center",
        transform: "perspective(300px) scaleX(1) rotateY(0deg)",
        transition: "transform .3s, color .3s, background .3s, bottom .3s",
      },
      "&:focus, &:active": {
        borderBottomColor: palette.secondary.light,
        textIndent: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        "& + label": {
          background: palette.secondary.light,
          color: palette.secondary.contrastText,
          bottom: 0,
          transform: "perspective(600px) translateX(-100%) rotateY(80deg)",
        },
        "& ~ button svg": {
          fill: palette.secondary.light,
        },
      },
    },
  },
}));

export default function SlideInput({placeholder, label, id, ...props}: SlideInputProps) {
  const classes = useStyles();

  return (
    <span className={classes.input}>
      <input id={id} type="text" placeholder={placeholder} {...props}/>
      <label htmlFor={id}>{label}</label>
      <IconButton className={classes.button}>
        <SearchIcon/>
      </IconButton>
    </span>
  );
}

interface SlideInputProps extends InputProps {
  placeholder: string;
  label: string;
  id: string;
}
