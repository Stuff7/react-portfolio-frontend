import React from "react";
import {Container, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import useMediaQuery from "../../hooks/useMediaQuery";
import useTitle from "../../hooks/useTitle";
import useTranslator from "../../hooks/useTranslator";

import Logo from "../Logo";
import ProjectCard from "./ProjectCard";

import pokeball from "../../assets/pokedex.svg";
import tvsm from "../../assets/tvsm.svg";
import customapis from "../../assets/customapis.svg";

const useStyles = makeStyles(theme=> ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: "auto",
    minWidth: "100%",
    "& h2": {
      fontWeight: "bold",
    },
    "& .MuiCard-root": {
      overflow: "inherit"
    },
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    minHeight: "36vh",
    minWidth: "100%",
    padding: 8,
    background: `linear-gradient(${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    color: theme.palette.secondary.contrastText,
    borderBottom: `2px solid ${theme.palette.text.primary}`,
  },
  projectGrid: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: 8,
    "& > .MuiCard-root": {
      margin: 8
    }
  },
  phone: {
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: "100vh",
    "& .MuiTypography-root": {
      textAlign: "center"
    },
    "& .MuiTypography-h5": {
      padding: "0 1em",
    },
  },
}));

export default function Homepage() {
  useTitle("Stuff7");
  const _ = useTranslator();
  const classes = useStyles();
  const isPhone = useMediaQuery("(max-width:800px)");

  return (
    <Container className={classes.root} disableGutters>
      <div className={isPhone(classes.container, classes.phone)}>
        <Logo/>
        <div>
          <Typography variant="h2">Stuff7</Typography>
          <Typography variant="h5">
            {_("Personal projects with no correlation whatsoever, a portfolio of sorts.")}
          </Typography>
        </div>
      </div>
      <div className={classes.projectGrid}>
        <ProjectCard
          name="Pokédex" image={pokeball} path="/pokedex"
          description={_("Find details about pokémon such as evolutions or stats by their name")}/>
        <ProjectCard
          name="TVSM" image={tvsm} path="/tvsm"
          description={_("Keep track of your favorite tv shows, release dates, status, ratings and more details")}/>
        <ProjectCard
          name="CustomAPIs" image={customapis} path="/customapis"
          description={_("Custom plain text APIs to use with Twitch and Mixer bots")}/>
      </div>
    </Container>
  );
}
