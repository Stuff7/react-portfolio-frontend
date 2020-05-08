import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../state/types";
import {addBasicPokemonInfo} from "../../../state/actions/pokedexActions";

import {fetchBasicPokemonInfo} from "../PokeAPI";

export default function usePokedexUpdate() {
  const dispatch = useDispatch();
  const pokemonList = useSelector(({pokemon}: State)=> pokemon);

  useEffect(()=> {
    if(!pokemonList.length) {
      fetchBasicPokemonInfo().then(data=> {
        dispatch(addBasicPokemonInfo(data));
      });
    }
  },[dispatch, pokemonList.length]);
}
