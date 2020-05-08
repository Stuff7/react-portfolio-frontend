import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {HTMLDivProps, Nullable} from "../types";
import useTranslator from "../../hooks/useTranslator";

const useStyles = makeStyles(({palette})=> ({
  root: {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    backgroundColor: palette.background.default,
    borderRadius: 8,
    "&, & img": {
      width: 210, minWidth: 210,
      height: 295, minHeight: 295,
    },
    "& img:hover": {
      border: "2px solid",
    },
  },
  alt: {
    position: "relative",
    width: 210,
    height: 295,
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    backgroundColor: palette.secondary.dark,
    color: palette.secondary.contrastText,
    "&:hover": {
      border: "2px solid"
    },
    "& p": {
      position: "absolute",
      top: 4,
      width: "100%",
      textAlign: "center",
    },
    "& h1": {
      fontSize: 32,
      fontWeight: "bold",
    },
    "& span": {
      position: "absolute",
      bottom: 4,
      right: 4,
    },
  },
}));

export default function Preview({image, name, network, status, ...props}: PreviewProps) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      {image
      ? <img src={image} alt={name}/>
      : <div className={classes.alt}>
          <p>{_("No image found :(")}</p>
          <h1>{name}</h1>
          <span>{_("Available on")} {network} ({status})</span>
        </div>
      }
    </div>
  );
}

interface PreviewProps extends HTMLDivProps {
  image?: string;
  network: Nullable<string>;
  status: string;
  name: string;
}
