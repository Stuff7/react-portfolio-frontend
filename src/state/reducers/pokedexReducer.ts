import {PokemonInfo} from "../../components/Pokedex/PokeAPI";
import {Action, ActionDict, Reducer} from "../types"

const defaultPokemon: Array<PokemonInfo> = [];

const actions: ActionDict<Array<PokemonInfo>, PokedexAction> = {
  ADD_BASIC_POKEMON_INFO: (pokemon, action)=> action.pokemon,
  ADD_POKEMON_DETAILS: (pokemon, action)=> Object.assign([], pokemon, {
    [action.index]: {...pokemon[action.index], ...action.details}
  }),
};

export default Reducer(actions, defaultPokemon);

interface PokedexAction extends Action {
  pokemon: Array<PokemonInfo>;
  index: number;
  details: PokemonInfo;
}
