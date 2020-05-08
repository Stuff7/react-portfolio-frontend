import {fetchJSON, stripHTML, padZeroes} from "../../utils/dry";
import {Nullable} from "../types";

const TVmazeAPI = "https://api.tvmaze.com";
const embed = [
  "nextepisode",
  "previousepisode",
  "crew",
  "seasons",
  "episodes",
].join("&embed[]=");

export async function fetchShowsSearch(query: string): Promise<Array<TVSeriesPreview>> {
  /* Fetching and packing array of TV Series objects.

  @param {string} query - Query to use for the search

  @returns {Promise<Array<TVSeries>>} - Promise with
  Array of all TV Series found, if any */
  return (await fetchJSON(TVmazeAPI+`/search/shows?q=${query}`))
    .map(({show}: ShowResult)=> ({
      id: show.id,
      name: show.name,
      image: show.image,
      status: show.status,
      network: show.network?.name || show.webChannel?.name,
    })
  );
}

export async function fetchShow(id: number): Promise<TVSeries|false> {
  /* Fetching and packing single TV Series.

  @param {number} id - TVmaze show's ID

  @returns {Promise<TVSeries>} - TV Series promise or
  false if none is found */
  const show = await fetchJSON(TVmazeAPI+`/shows/${id}?embed[]=${embed}`);
  return show.status !== 404 && tvSeries(show);
}

export async function fetchShowByName(name: string): Promise<TVSeries|false> {
  /* Fetching and packing single TV Series by name (fuzzy search).

  @param {number} id - Series name

  @returns {Promise<TVSeries>} - TV Series promise or
  false if none is found */
  const response = await fetch(TVmazeAPI+
    `/singlesearch/shows?q=${encodeURIComponent(name)}&embed[]=${embed}`).then(r=> r);

  if(response.status === 404) return false;

  const show = await response.json();
  return tvSeries(show);
}

export function seriesDetails({
  language, runtime, type, premiered, genres,
  summary, directors, image, ...details
}: TVSeries): TVSeriesDetails {
  /*Destructuring TVSeries and returning only details.

  @param {TVSeries} - Series to get details from

  @returns {TVSeriesDetails} Series details */
  return details as TVSeriesDetails;
}

function tvSeries(show: Show): TVSeries {
  /* Removing props that won't be used or
  that will be packaged differently

  @param {Show} show - Show object from API

  @returns {TVSeries} - TVSeries object */
  const {rating, network, webChannel,
    url, summary, premiered, _links,
    _embedded, updated, weight,
    officialSite, schedule, externals,
    ...series} = show;
  return {
    ...series,
    lastUpdated: new Date(),
    rating: rating.average,
    network: network?.name || webChannel?.name,
    summary: stripHTML(summary),
    premiered: premiered && new Date(premiered),
    nextEp: episode(_embedded?.nextepisode),
    prevEp: episode(_embedded?.previousepisode),
    directors: directors(_embedded?.crew),
    seasons: _embedded?.seasons?.length || 0,
    episodes: _embedded?.episodes?.length || 0,
  } as TVSeries;
}

function episode(ep?: Episode) {
  return {
    display: formatEp(ep),
    date: ep?.airstamp? new Date(ep.airstamp) : null,
  };
}

function formatEp(ep?: Episode) {
  return ep
    ? `S${padZeroes(ep.season, 2)}E${padZeroes(ep.number, 2)}`
    : " - ";
}

function directors(crew?: Array<Crew>) {
  /* Trying to find series director.

  @param {Array<Crew>} crew - Full series crew

  @returns {Array<string>} List of director names,
  if any */
  if(crew === undefined || !crew.length)
    return ["No Info"];

  let directorsList;

  for(const type of ["Creator", "Developer", "Based"]) {
    directorsList = crew.filter(c=> c.type.includes(type));
    if(directorsList.length)
      return directorsList.map(c=> c.person.name);
  }

  return [crew[0].person.name];
}

// TVmazeAPI types
interface Cast {
  person: Person;
  character: Character;
  self: boolean;
  voice: boolean;
}

interface Character extends HyperlinkedResource {
  image: ImageResolutions;
}

interface Country {
  name: string;
  code: string;
  timezone: string;
}

interface Crew {
  type: string;
  person: Person;
}

interface EmbeddableResource {
  nextepisode: Episode;
  previousepisode: Episode;
  cast: Array<Cast>;
  crew: Array<Crew>;
  seasons: Array<Season>;
  episodes: Array<Episode>;
}

interface Episode extends HyperlinkedResource {
  season: number;
  number: number;
  airdate: string;
  airtime: string;
  airstamp: Nullable<string>;
  runtime: number;
  image: Nullable<ImageResolutions>;
  summary: Nullable<string>;
}

interface ExternalIDs {
  tvrage: Nullable<number>;
  thetvb: Nullable<number>;
  imdb: Nullable<string>;
}

interface HyperlinkedResource extends Resource {
  url: string;
  _links: Links;
}

interface ImageResolutions {
  medium: string;
  original: string;
}

interface Link {
  href: string;
}

interface Links {
  self: Link;
  nextepisode?: Link;
  previousepisode?: Link;
}

interface Network extends Resource {
  country: Nullable<Country>;
}

interface NotFound {
  name: string;
  message: string;
  code: number;
  status: number;
}

interface Person extends HyperlinkedResource {
  country: Nullable<Country>;
  birthday: Nullable<string>;
  deathday: Nullable<string>;
  gender: Nullable<string>;
  image: Nullable<ImageResolutions>;
}

interface Rating {
  average: Nullable<number>;
}

interface Resource {
  id: number;
  name: string;
}

interface Schedule {
  time: string;
  days: Array<string>;
}

type SearchResults<Type, PropName extends string> = {
  score: number;
} & { 
  [key in PropName]: Type; 
};

interface Season extends HyperlinkedResource {
  number: number;
  episodeOrder: Nullable<number>;
  premiereDate: Nullable<string>;
  endDate: Nullable<string>;
  network: Nullable<Network>;
  webChannel: Nullable<Network>;
  image: Nullable<ImageResolutions>;
  summary: Nullable<string>;
}

interface Show extends HyperlinkedResource {
  type: string;
  language: string;
  genres: Array<string>;
  status: string;
  runtime: number;
  premiered: Nullable<string>;
  officialSite: Nullable<string>;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Nullable<Network>;
  webChannel: Nullable<Network>;
  externals: ExternalIDs;
  image: Nullable<ImageResolutions>;
  summary: string;
  updated: number;
  _embedded?: Partial<EmbeddableResource>;
}

type ShowResult = SearchResults<Show, "show">;

// Custom types
export interface TVSeries extends TVSeriesPreview, TVSeriesDetails {
  genres: Array<string>;
  language: string;
  runtime: number;
  type: string;
  premiered: Nullable<Date>;
  summary: string;
  directors: Array<string>;
}

export interface TVSeriesPreview extends Resource {
  image: Nullable<ImageResolutions>;
  status: string;
  network: Nullable<string>;
}

export interface TVSeriesDetails extends Resource {
  lastUpdated: Date;
  status: string;
  network: Nullable<string>;
  rating: Nullable<number>;
  nextEp: TVSeriesEpisode;
  prevEp: TVSeriesEpisode;
  seasons: number;
  episodes: number;
}

export interface TVSeriesEpisode {
  display: string;
  date: Nullable<Date>;
}
