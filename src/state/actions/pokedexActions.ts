import {PokemonDetails, BasicPokemonInfo} from "../../components/Pokedex/PokeAPI";

export function addBasicPokemonInfo(pokemon: Array<BasicPokemonInfo>) {
  return {
    type: "ADD_BASIC_POKEMON_INFO",
    pokemon,
  };
}

export function addPokemonDetails(details: PokemonDetails, id: number) {
  return {
    type: "ADD_POKEMON_DETAILS",
    index: id-1,
    details,
  };
}
