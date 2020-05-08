import {fetchJSON, padZeroes} from "../../utils/dry";
import * as PokeImg from "../../assets/images/pokemon";

export const TotalPokemon = 807;
const PokeAPI = "https://pokeapi.co/api/v2";

export async function fetchBasicPokemonInfo(): Promise<Array<BasicPokemonInfo>> {
  return (await fetchJSON(PokeAPI+`/pokemon-species/?limit=${TotalPokemon}`) as PokemonSpeciesList).results
    .map((pokemon: NamedAPIResource)=> basicPokemonInfo(pokemon)
  );
}

export async function fetchPokemonDetails(id: number): Promise<PokemonDetails> {
  const [pokemon, species]: [Pokemon, PokemonSpecies] = await
    Promise.all([fetchJSON(PokeAPI+`/pokemon/${id}`),
                fetchJSON(PokeAPI+`/pokemon-species/${id}`)]);
  const evolutions: EvolutionChain = await fetchJSON(species.evolution_chain.url);

  return {
    abilities: pokemon.abilities.map(ability=> pokemonAbility(ability)),
    color: species.color.name,
    evolutionChart: evolutionChart(evolutions.chain),
    description: (lang: string)=> findByLang(species.flavor_text_entries, langCode(lang)).flavor_text,
    genderRatio: pokemonGender(species.gender_rate),
    genus: (lang: string)=> findByLang(species.genera, langCode(lang)).genus,
    profile: pokemonProfile(pokemon, species),
    stats: pokemonStats(pokemon.stats),
    types: pokemon.types.map(t=> t.type.name),
  };
}

function basicPokemonInfo(resource: NamedAPIResource): BasicPokemonInfo {
  const id = urlID(resource.url);
  return {
    id,
    name: resource.name,
    path: `/pokedex/pokemon/${id}`,
    strID: padZeroes(id, 3),
    thumbnail: {
      small: PokeImg[`sprite${id}` as PokeImgKey],
      large: PokeImg[`sprite${id}L` as PokeImgKey],
    },
  };
}

function evolutionChart(chain: ChainLink): Array<PokemonEvolution> {
  let currentChain = chain;
  const evolutions: Array<PokemonEvolution> = [];

  while(currentChain.evolves_to.length) {
    const currentEvolutions = currentChain.evolves_to;
    for(const chain of currentEvolutions) {
      for(const details of chain.evolution_details) {
        evolutions.push({
          fromIndex: urlID(currentChain.species.url)-1,
          toIndex: urlID(chain.species.url)-1,
          details,
        });
      }
      currentChain = chain;
    }
  }
  return evolutions;
}

export function evolutionDetailsString(details: EvolutionDetail, _: (word:string)=>string): ()=> string {
  return function() {
    const sentence: Array<string> = [];
    const action = ({
      "trade": _("on trading"),
      "level-up": _("on level up"),
      "use-item": _("using ")
    } as {[key: string]: string})[details.trigger.name];

    details.gender&&(sentence.push(_("being a ")+["",_("female"), _("male"), _("genderless")][details.gender]));
    details.held_item&&(sentence.push(_("holding ")+details.held_item.name));
    details.item&&(sentence.push(details.item.name));
    details.known_move&&(sentence.push(_("knowing ")+details.known_move.name));
    details.known_move_type&&(sentence.push(_("knowing ")+details.known_move_type.name+_(" type move")));
    details.location&&(sentence.push(_("while in ")+details.location.name));
    for(const stat of ["affection", "beauty", "happiness"]) {
      const min_stat = details["min_"+stat as "min_affection"];
      min_stat&&(sentence.push(_("needs to have at least ")+min_stat+" "+_(stat)));
    }
    details.min_level&&(sentence.push(_("at level ")+details.min_level));
    details.needs_overworld_rain&&(sentence.push(_("while is raining")));
    details.party_species&&(sentence.push(_("need to have ")+details.party_species.name+_(" in player's party")));
    details.party_type&&(sentence.push(_("need to have ")+details.party_type.name+_(" type in player's party")));
    details.relative_physical_stats!==null&&(sentence.push(({
      "-1": _("must have more defense than attack"),
      "0": _("must have equal defense and attack"),
      "1": _("must have more attack than defense")
    } as {[key: string]: string})[details.relative_physical_stats!]));
    details.time_of_day&&(sentence.push(_("during ")+_(details.time_of_day)));
    details.trade_species&&(sentence.push(_("must trade with ")+details.trade_species.name));
    details.turn_upside_down&&(sentence.push(_("3DS must be turned upside down")));

    return `${action} ${sentence.join(", ")}`;
  }
}

function findByLang<T extends MultiLanguage>(list: Array<T>, lang: string): T {
  return list.find(item=> item.language.name === lang) || list[0];
}

function langCode(lang: string) {
  return lang.split("-")[0];
}

function pokemonAbility(abilityResource: PokemonAbility): Ability {
  return {
    name: abilityResource.ability.name,
    hidden: abilityResource.is_hidden,
  };
}

function pokemonGender(F: number) {
  const M = 8 - F;

  return {
    genderless: F < 0,
    female: F/0.08,
    male: M/0.08,
  };
}

function pokemonProfile(pokemon: Pokemon, species: PokemonSpecies): PokemonProfile {
  return {
    catchRate: parseFloat((species.capture_rate/2.55).toFixed(3)),
    eggGroups: species.egg_groups.map(egg=> egg.name),
    hatchSteps: 255*(species.hatch_counter+1),
    height: pokemon.height/10,
    weight: pokemon.weight/10,
  };
}

function pokemonStats(stats: Array<PokemonStat>): Array<Stat> {
  return stats.map(statResource=> ({
    name: statResource.stat.name,
    value: statResource.base_stat,
  }));
}

function urlID(url: string) {
  const noTrailingSlash = url.slice(0,-1);
  return parseInt(noTrailingSlash.slice(noTrailingSlash.lastIndexOf("/")+1));
}

// PokeAPI types
interface APIResource {
  url: string;
}

interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: Array<EvolutionDetail>;
  evolves_to: Array<ChainLink>;
}

interface EvolutionChain {
  id: number;
  baby_trigger_item?: NamedAPIResource;
  chain: ChainLink;
}

interface EvolutionDetail {
  item?: NamedAPIResource;
  trigger: NamedAPIResource;
  gender?: number;
  held_item?: NamedAPIResource;
  known_move?: NamedAPIResource;
  known_move_type?: NamedAPIResource;
  location?: NamedAPIResource;
  min_level?: number;
  min_happiness?: number;
  min_beauty?: number;
  min_affection?: number;
  needs_overworld_rain?: boolean;
  party_species?: NamedAPIResource;
  party_type?: NamedAPIResource;
  relative_physical_stats?: number;
  time_of_day?: string;
  trade_species?: NamedAPIResource;
  turn_upside_down?: boolean;
}

interface FlavorText extends MultiLanguage {
  flavor_text: string;
  version: NamedAPIResource;
}

interface Genus extends MultiLanguage {
  genus: string;
}

interface MultiLanguage {
  language: NamedAPIResource;
}

interface NamedAPIResource extends APIResource {
  name: string;
}

interface Pokemon {
  abilities: Array<PokemonAbility>;
  height: number;
  stats: Array<PokemonStat>;
  types: Array<PokemonType>;
  weight: number;
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface PokemonSpecies {
  capture_rate: number;
  color: NamedAPIResource;
  egg_groups: Array<NamedAPIResource>;
  evolution_chain: APIResource;
  flavor_text_entries: Array<FlavorText>;
  gender_rate: number;
  genera: Array<Genus>;
  hatch_counter: number;
}

interface PokemonSpeciesList {
  count: number;
  next: string;
  previous: string;
  results: Array<NamedAPIResource>;
}

interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

// Custom types
type PokeImgType = typeof PokeImg;
export type PokeImgKey = keyof PokeImgType;

export interface Ability {
  name: string;
  hidden: boolean;
}

export interface BasicPokemonInfo {
  id: number;
  name: string;
  path: string;
  strID: string;
  thumbnail: {[key in "small"|"large"]: string};
}

export interface PokemonEvolution {
  fromIndex: number;
  toIndex: number;
  details: EvolutionDetail;
}

export interface PokemonDetails {
  abilities: Array<Ability>;
  color: string;
  evolutionChart: Array<PokemonEvolution>;
  description: LanguageFinder;
  genderRatio: PokemonGender;
  genus: LanguageFinder;
  profile: PokemonProfile;
  stats: Array<Stat>;
  types: Array<string>;
}

export interface PokemonGender {
  female: number;
  genderless: boolean;
  male: number;
}

export interface PokemonProfile {
  catchRate: number;
  eggGroups: Array<string>;
  hatchSteps: number;
  height: number;
  weight: number;
}

export interface Stat {
  name: string;
  value: number;
}

export type PokemonInfo = BasicPokemonInfo & PokemonDetails;

type LanguageFinder = (lang: string)=> string;
