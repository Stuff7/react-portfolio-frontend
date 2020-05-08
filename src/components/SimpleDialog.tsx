import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Dialog, DialogContent, DialogActions, Button as MuiButton} from "@material-ui/core";
import {HTMLDivProps} from "./types";
import useTranslator from "../hooks/useTranslator";

const useStyles = makeStyles(theme => ({
  content: {
    padding: "1rem !important",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}));

export default function SimpleDialog({Button, buttonChildren, onCancel, onOk, children, ...props}: Props) {
  const _ = useTranslator();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  function openDialog() {
    setOpen(true);
  }
  function closeDialog() {
    setOpen(false);
  }
  function handleOk(event: React.MouseEvent<HTMLButtonElement>) {
    onOk && onOk(event);
    setOpen(false);
  }
  function handleCancel(event: React.MouseEvent<HTMLButtonElement>) {
    onCancel && onCancel(event);
    setOpen(false);
  }

  return (
    <>
      <Button onClick={openDialog}>{buttonChildren}</Button>
      <Dialog open={open} onClose={closeDialog} {...props}>
        <DialogContent className={classes.content}>
          {children}
        </DialogContent>
        <DialogActions>
          <MuiButton autoFocus onClick={handleCancel}>
            {_("Cancel")}
          </MuiButton>
          <MuiButton onClick={handleOk}>
            {_("Ok")}
          </MuiButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

interface Props extends HTMLDivProps {
  Button: React.ReactType;
  buttonChildren?: React.ReactNode;
  onCancel?: MouseEventHandler;
  onOk?: MouseEventHandler;
};

type MouseEventHandler = (event: React.MouseEvent<HTMLButtonElement>)=> void;
