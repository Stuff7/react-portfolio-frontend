import React from "react";
import {Route} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

import {useSelector} from "react-redux";
import {State} from "../../state/types";

import useCardManager from "./hooks/useCardManager";
import useTimeout from "../../hooks/useTimeout";
import useTitle from "../../hooks/useTitle";
import useTranslator from "../../hooks/useTranslator";

import AsyncContent from "./AsyncContent";
import Header from "./Header";
import PreviewCard from "./PreviewCard";

import {PokemonInfo} from "./PokeAPI";

const useStyles = makeStyles(theme=> ({
  root: {
    "& .MuiGrid-item": {
      maxWidth: "100%",
    },
  },
  scroll: {
    padding: 16,
    overflow: "auto",
    width: "100%",
    flex: 1,
  },
}));

export default function PokeGrid() {
  useTitle("Pokédex");
  const _ = useTranslator();
  const classes = useStyles();
  const pokemonList = useSelector(({pokemon}: State)=> pokemon);

  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const [cardCount, updateLayout] = useCardManager(gridRef);

  const [search, setSearch] = React.useState("");
  const [timeoutSearch, cancelSearch] = useTimeout();

  function getSearch({target}: React.ChangeEvent<HTMLInputElement>) {
    cancelSearch();
    timeoutSearch(()=> setSearch(target.value), 200);
  }

  function searchResults(): Array<PokemonInfo> {
    if(search.length > 25) return [];
    const insensitiveSearch = search.toLowerCase();
    return pokemonList.filter(pokemon=> pokemon.name.includes(insensitiveSearch));
  }

  return (
    <Route>
      <Header onInput={getSearch} title="Pokédex" label={_("Search Pokémon")}/>
      <div ref={gridRef} className={classes.scroll} onScroll={updateLayout}>
        <AsyncContent ready={pokemonList.length !== 0}>
          <Grid container className={classes.root} spacing={4} justify="center">
            {(search? searchResults() : pokemonList)
              .slice(0, cardCount).map((pokemon: PokemonInfo)=> (
              <Grid item key={`basic:${pokemon.name}#${pokemon.strID}`}>
                <PreviewCard
                  path={pokemon.path}
                  name={pokemon.name}
                  id={pokemon.strID}
                  thumbnail={pokemon.thumbnail.small}
                />
              </Grid>
            ))}
          </Grid>
        </AsyncContent>
      </div>
    </Route>
  );
}
