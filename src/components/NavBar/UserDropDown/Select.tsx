import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Select, SelectProps} from "@material-ui/core";
import {positionDropDown} from "../../types";

const useStyles = makeStyles(theme=> ({
  root: {
    height: "100%",
    width: 0,
    "& .MuiSelect-root": {
      minWidth: 0,
      padding: 0
    },
    "&:before, &:after": {
      border: "none !important",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "inherit",
    },
    "& .MuiSelect-icon": {
      display: "none"
    },
    "& .MuiSelect-iconOpen": {
      transform: "none",
    },
  },
  menu: {
    "& .MuiMenuItem-root": {
      minWidth: 256,
      "& svg, & img": {
        marginRight: 8,
        width: "1em",
        height: "1em",
        fill: theme.palette.text.primary,
      },
      "& img": {
        marginLeft: "auto",
        width: "1.5em",
        height: "1.5em",
        borderRadius: "100%",
        border: "2px solid",
        borderColor: theme.palette.text.primary,
      },
    },
    "& a": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
    "& .MuiMenuItem-root[color=secondary]": {
      fontWeight: "bold",
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      "& svg": {
        color: theme.palette.secondary.contrastText,
      },
    },
  },
}));

export default function({children, ...props}: SelectProps) {
  const classes = useStyles();

  return (
    <Select
      MenuProps={{...positionDropDown, className: classes.menu}}
      className={classes.root}
      value=""
      {...props}>
      {children}
    </Select>
  );
}
