import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

import {useSelector} from "react-redux";
import {State} from "../../../state/types";
import useTranslator from "../../../hooks/useTranslator";

import ForwardIcon from "@material-ui/icons/Forward";

import {PokemonEvolution, evolutionDetailsString} from "../PokeAPI";
import Thumbnail from "./Thumbnail";

const useStyles = makeStyles(theme=> ({
  evolution: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    "& .MuiSvgIcon-root": {
      fontSize: 32,
      margin: "0 4px",
    },
    "& a": {
      width: "40%",
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
  },
  thumbnail: {
    "& > div": {
      height: 96,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      "& div": {
        maxWidth: 96,
      },
    },
  },
  details: {
    textTransform: "capitalize",
    textAlign: "center",
  },
}));

export default function Evolution({fromIndex, toIndex, details}: PokemonEvolution) {
  const _ = useTranslator();
  const classes = useStyles();
  const [from, to] = useSelector(({pokemon}: State)=> [pokemon[fromIndex], pokemon[toIndex]]);

  const getDetails = React.useCallback(evolutionDetailsString(details, _), [details, _]);

  return (
    <div>
      <div className={classes.evolution}>
        <Link to={from.path}>
          <Thumbnail className={classes.thumbnail}
            thumbnail={from.thumbnail.small} name={from.name} strID={from.strID}/>
        </Link>
        <ForwardIcon/>
        <Link to={to.path}>
          <Thumbnail className={classes.thumbnail}
            thumbnail={to.thumbnail.small} name={to.name} strID={to.strID}/>
        </Link>
      </div>
      <div className={classes.details}>{from.name} {_("evolves into")} {to.name} {getDetails()}</div>
    </div>
  );
}
