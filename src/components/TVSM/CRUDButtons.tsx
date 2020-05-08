import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {IconButton, Tooltip} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import {HTMLDivProps} from "../types";
import useTranslator from "../../hooks/useTranslator";

const useStyles = makeStyles(({palette})=> ({
  root: {
    display: "flex",
  },
  button: {
    padding: 0,
    marginLeft: 8,
    "& svg": {
      width: "1.5em",
      height: "1.5em",
      fill: palette.text.secondary,
      "&:hover": {
        fill: palette.text.primary,
      },
    },
  },
}));

export default function CRUDButtons({isSaved, onDelete, onAdd, ...props}: CRUDButtonsProps) {
  const _ = useTranslator();
  const classes = useStyles();
  const tooltip = isSaved? "Update" : "Add";

  return (
    <div className={classes.root} {...props}>
      <Tooltip title={_(tooltip)} aria-label={_(tooltip)}>
        <IconButton className={classes.button} onClick={onAdd}>
          {isSaved? <UpdateIcon/> : <AddCircleIcon/>}
        </IconButton>
      </Tooltip>
      {isSaved &&
        <Tooltip title={_("Delete")} aria-label={_("Delete")}>
          <IconButton className={classes.button} onClick={onDelete}>
            <DeleteForeverIcon/>
          </IconButton>
        </Tooltip>
      }
    </div>
  );
}

export interface CRUDButtonsProps extends HTMLDivProps {
  isSaved?: boolean;
  onAdd?: (event: React.MouseEvent)=> void;
  onDelete?: (event: React.MouseEvent)=> void;
}
