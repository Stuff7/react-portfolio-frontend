import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {LinearProgress} from "@material-ui/core";
import {FadeTransition, getTransition} from "../utils/transitions";

const Homepage = React.lazy(()=> import(
  /* webpackChunkName: "homepage" */ "./Homepage"));

const Pokedex = React.lazy(()=> import(
  /* webpackChunkName: "pokedex" */ "./Pokedex"));

const CustomAPIs = React.lazy(()=> import(
  /* webpackChunkName: "customapis" */ "./CustomAPIs"));

const TVSM = React.lazy(()=> import(
  /* webpackChunkName: "tvsm" */ "./TVSM"));

const NotFound = React.lazy(()=> import(
  /* webpackChunkName: "tvsm" */ "./NotFound"));

const useStyles = makeStyles(theme=> ({
  scenery: {
    height: "100%",
    display: "flex",
    position: "relative",
  },
  scene: {
    height: "100%",
    overflow: "auto",
    position: "absolute",
    left: 0,
    right: 0,
    overscrollBehavior: "contain",
  },
  ...FadeTransition
}));

export default function AnimatedRoutes(props: SceneProps) {
  const classes = useStyles();

  return (
    <Route render={({location})=> (
      <TransitionGroup className={classes.scenery}>
        <CSSTransition
          key={location.key}
          timeout={300}
          classNames={getTransition(classes, "fade")}>
          <React.Suspense fallback={<LinearProgress variant="query" color="secondary"/>}>
            <div {...props} className={classes.scene}>
              <Switch location={location}>
                <Route path="/pokedex">
                  <Pokedex/>
                </Route>
                <Route path="/customapis">
                  <CustomAPIs/>
                </Route>
                <Route path="/tvsm">
                  <TVSM/>
                </Route>
                <Route exact path="/">
                  <Homepage/>
                </Route>
                <Route path="*">
                  <NotFound/>
                </Route>
              </Switch>
            </div>
          </React.Suspense>
        </CSSTransition>
      </TransitionGroup>
    )}/>
  );
}

type SceneProps = React.PropsWithoutRef<JSX.IntrinsicElements["div"]>;
