import React from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import {InputBase, InputBaseProps} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useTranslator from "../../hooks/useTranslator";

const useStyles = makeStyles(theme=> ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: "0 8px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    right: 4,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1),
    width: "80%",
  },
}));

export default function SearchBar(props: InputBaseProps) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={_("Search")}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": _("Search") }}
        {...props}
      />
    </div>
  );
}
