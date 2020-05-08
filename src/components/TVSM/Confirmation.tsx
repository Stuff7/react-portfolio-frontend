import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {Dialog, DialogContent, DialogActions, Button} from "@material-ui/core";

import useTranslator from "../../hooks/useTranslator";

import {TVSeries} from "./TVmazeAPI";
import CRUDButtons from "./CRUDButtons";

const useStyles = makeStyles(theme => ({
  content: {
    padding: "1rem !important",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  crud: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Confirmation({removeSeries, onAdd}: ConfirmationProps) {
  const _ = useTranslator();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function openDialog() {
    setOpen(true);
  }

  function closeDialog() {
    setOpen(false);
  }

  function handleOk() {
    removeSeries([]);
    setOpen(false);
  }

  return (
    <>
      <CRUDButtons className={classes.crud} onDelete={openDialog} onAdd={onAdd} isSaved/>
      <Dialog open={open} onClose={closeDialog}>
        <DialogContent className={classes.content}>
          {_("Do you really want to delete all your saved shows?")}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeDialog}>
            {_("No")}
          </Button>
          <Button onClick={handleOk}>
            {_("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

interface ConfirmationProps {
  removeSeries: (series: Array<TVSeries>)=> void;
  onAdd: ()=> void;
};
