import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CSSTransition} from "react-transition-group";
import {FadeTransition, getTransition} from "../utils/transitions";
import {HTMLDivProps} from "./types";

const useStyles = makeStyles(theme=> ({
  root: {},
  ...FadeTransition
}));

export default function AsyncContent({ready, children, loading, ...props}: AsyncContentProps) {
  const classes = useStyles();

  return (
    <>
      <CSSTransition
        mountOnEnter
        in={ready}
        timeout={300}
        classNames={getTransition(classes, "fade")}>
        <>{children}</>
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        in={!ready}
        timeout={300}
        classNames={getTransition(classes, "fade")}>
        {loading()}
      </CSSTransition>
    </>
  );
}

export interface AsyncContentProps extends HTMLDivProps {
  ready: boolean;
  loading(): React.ReactNode;
}
