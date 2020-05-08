import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {IconButton, Snackbar, Slide} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import useTranslator from "../hooks/useTranslator";

import {InputProps} from "./types";

const useStyles = makeStyles(({palette})=> ({
  root: {
    display: "flex",
    backgroundColor: palette.background.default,
    borderRadius: 16,
    border: `2px solid ${palette.text.primary}`,
    width: "100%",
    margin: "0 auto",
    "& input": {
      font: "16px Fira Code, consolas",
      padding: 8,
      color: palette.text.primary,
      width: "100%",
      backgroundColor: "transparent",
      border: "none",
      minWidth: 0,
    },
  },
}))

export default function CopyPasteInput({className, ...props}: InputProps) {
  const _ = useTranslator();
  const classes = useStyles();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [alertOpen, setAlertOpen] = React.useState(false);

  function copyToClipboard() {
    const input = inputRef.current!;
    if(!input) return;
    input.select();
    document.execCommand("copy");
    setAlertOpen(true)
  }

  function closeAlert() {
    setAlertOpen(false);
  }

  return (
    <div className={classes.root+(className? ` ${className}` : "")}>
      <input ref={inputRef} readOnly {...props}/>
      <IconButton onClick={copyToClipboard}>
        <FileCopyIcon/>
      </IconButton>
      <Snackbar 
        open={alertOpen}
        autoHideDuration={3000}
        onClose={closeAlert}
        TransitionComponent={Slide}
      >
        <Alert onClose={closeAlert} severity="success" elevation={6} variant="filled">
          {_("Copied to clipboard")}
        </Alert>
      </Snackbar>
    </div>
  );
}
