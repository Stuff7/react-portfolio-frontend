import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

import {State} from "../state/types";
import {useSelector} from "react-redux";
import useLogin from "../hooks/useLogin";

import {createMuiTheme, ThemeProvider, makeStyles} from "@material-ui/core/styles";
import {CSSTransition} from "react-transition-group";
import {SlideTransition, getTransition} from "../utils/transitions";
import CssBaseline from "@material-ui/core/CssBaseline";

import NavBar from "./NavBar";
import DisplayNavButton from "./DisplayNavButton";
import AnimatedRoutes from "./AnimatedRoutes";

const useStyles = makeStyles(theme=> ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  ...SlideTransition
}));

export default function Stuff7() {
  useLogin();
  const classes = useStyles();
  const lastScrollRef = React.useRef<number>(0);
  const theme = useSelector(({theme, user}: State)=> theme);
  const [navHidden, setNavHidden] = React.useState(false);

  function hideNav({target}: UIEvent) {
    target.scrollTop > lastScrollRef.current && setNavHidden(true);
    lastScrollRef.current = target.scrollTop;
  }

  function showNav({button}: React.MouseEvent) {
    !button && setNavHidden(false);
  }

  return (
    <Router>
      <ThemeProvider theme={createMuiTheme(theme)}>
        <CssBaseline/>
        <div className={classes.root}>
          <CSSTransition
            in={!navHidden}
            timeout={700}
            classNames={getTransition(classes, "slide")}>
            <NavBar/>
          </CSSTransition>
          {navHidden && <DisplayNavButton onMouseDown={showNav}/>}
          <AnimatedRoutes onScroll={hideNav}/>
        </div>
      </ThemeProvider>
    </Router>
  );
}

interface UIEvent extends React.UIEvent<HTMLDivElement> {
  target: HTMLDivElement;
}
