import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Select, SelectProps} from "@material-ui/core";
import {positionDropDown} from "../types";

const useStyles = makeStyles(({palette})=> ({
  root: {
    height: "100%",
    "& .MuiSelect-root": {
      minWidth: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    "&:before, &:after": {
      border: "none !important",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "inherit",
    },
  },
  menu: {
    "& .MuiPaper-root": {
      minWidth: "170px !important",
    },
    "& .MuiMenuItem-root": {
      padding: "2px 8px",
      "& svg": {
        fill: palette.text.primary,
        position: "static",
      },
    },
  },
}));

export default function({children, className, ...props}: SelectProps) {
  const classes = useStyles();

  return (
    <Select
      MenuProps={{...positionDropDown, className: classes.menu}}
      className={`${classes.root} ${className? className : ""}`}
      value=""
      {...props}>
      {children}
    </Select>
  );
}
