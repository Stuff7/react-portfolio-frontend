import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TextareaAutosize} from "@material-ui/core";

import {TextAreaStyles} from "./styles";
import {Param} from "./types";
import {TextAreaProps} from "../types";
import useTranslator from "../../hooks/useTranslator";

const Color = {
  required: {
    dark: {
      backgroundColor: "#ff8c00",
      color: "#030303",
    },
    light: {
      backgroundColor: "#9f5700",
      color: "#fafafa",
    },
  },
  nonRequired: {
    dark: {
      backgroundColor: "#00b7ff",
      color: "#030303",
    },
    light: {
      backgroundColor: "#006d98",
      color: "#fafafa",
    },
  },
}

const useStyles = makeStyles(({palette})=> {
  const root: React.CSSProperties | {[key: string]: React.CSSProperties} = {
    ...TextAreaStyles,
    backgroundColor: palette.background.default,
    color: palette.text.primary,
    borderRadius: 24,
    width: "100%",
    border: "2px solid",
    padding: "8px 16px",
    "&:required": {
      boxShadow: "none !important",
    },
  };

  return {
    root: {
      position: "relative",
      marginBottom: 4,
      "& label": {
        cursor: "text",
        position: "absolute",
        left: 20,
        top: 11,
        transition: "top 0.3s, fontWeight 0.3s, left 0.3s",
      },
      "& textarea[id]": {
        transition: "margin 0.3s",
        "&:focus, &:not(:placeholder-shown)": {
          marginTop: 20,
          "& ~ label": {
            top: 0,
            fontWeight: "bold",
            left: 16,
          },
        },
      },
    },
    true: {
      ...root,
      borderColor: Color.required[palette.type].backgroundColor,
      "& ~ label": {
        color: Color.required[palette.type].backgroundColor,
      },
      "&:focus": {
        ...Color.required[palette.type],
      },
    },
    false: {
      ...root,
      borderColor: Color.nonRequired[palette.type].backgroundColor,
      "& ~ label": {
        color: Color.nonRequired[palette.type].backgroundColor,
      },
      "&:focus": {
        ...Color.nonRequired[palette.type],
      },
    },
  }
});

export default function ParamInput({name, display_name, required, ...props}: Param & TextAreaProps) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextareaAutosize
        id={name}
        className={classes[required.toString() as "root"]}
        name={name}
        required={required}
        placeholder=" "
        {...props}
      />
      <label htmlFor={name}>
        {_(display_name)+(required? ` (${_("Required")})` : "")}
      </label>
    </div>
  );
}
