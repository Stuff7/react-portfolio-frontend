import React from "react";
import {makeStyles, fade} from "@material-ui/core/styles";
import {AppBar, Toolbar, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import UserDropDown from "./UserDropDown";
import DayNightSwitch from "./DayNightSwitch";
import MainDrawer from "./MainDrawer";

const useStyles = makeStyles(theme=> ({
  root: {
    "& .MuiGrid-item": {
      display: "flex",
      alignItems: "center"
    },
    "& .MuiSvgIcon-root": {
      color: theme.palette.primary.contrastText,
    },
    "& .MuiIconButton-root.Mui-checked:hover, & .MuiIconButton-root:hover": {
      backgroundColor: fade(theme.palette.primary.contrastText, 0.08),
    },
    "& .MuiButtonBase-root": {
      padding: 8,
      "& img": {
        width: "1.3em",
        height: "1.3em",
        borderRadius: "100%",
        border: "2px solid",
        borderColor: theme.palette.primary.contrastText,
      },
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: "none !important",
    fontFamily: "Satisfy",
    fontSize: "24px",
    fontWeight: "bold",
    color: theme.palette.primary.contrastText,
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} color="primary" position="static">
      <Toolbar variant="dense">
        <Grid container spacing={1}>
          <Grid item xs="auto">
            <MainDrawer edge="start"/>
            <Link to="/" className={classes.title}>
              S7
            </Link>
          </Grid>
          <Grid className={classes.alignRight} item xs>
            <DayNightSwitch/>
            <UserDropDown/>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
