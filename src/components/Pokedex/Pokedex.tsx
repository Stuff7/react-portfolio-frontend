import React from "react";
import {Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

import {State} from "../../state/types";
import {useSelector} from "react-redux";
import usePokedexUpdate from "./hooks/usePokedexUpdate";

import PokeGrid from "./PokeGrid";
import DetailsCard from "./DetailsCard";

import {PokemonInfo} from "./PokeAPI";

const Background = {
  dark: "#45001c",
  light: "#dc143c",
};

const useStyles = makeStyles(theme=> ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    height: "100%",
    overflow: "hidden",
    "& > div": {
      backgroundColor: Background[theme.palette.type],
    }
  },
}));

export default function Pokedex() {
  usePokedexUpdate();
  const classes = useStyles();
  const pokemonList = useSelector(({pokemon}: State)=> pokemon);

  return (
    <div className={classes.root}>
      <Switch>
        {pokemonList.map((pokemon: PokemonInfo)=> (
          <DetailsCard key={`details:${pokemon.name}#${pokemon.strID}`}
            path={`/pokedex/pokemon/${pokemon.id}`}
            pokemon={pokemon}/>
        ))}
        <PokeGrid/>
      </Switch>
    </div>
  );
}
