import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {ColorProps} from "../components/types";
import {PokemonInfo} from "../components/Pokedex/PokeAPI";

export function Reducer<StateType, ActionType extends Action>
(actions: ActionDict<StateType, ActionType>, defaultState?: StateType): ActionHandler<StateType, ActionType> {
  return (state = defaultState!, action)=>
    actions[action.type]? actions[action.type](state, action) : state;
}

export interface State {
  theme: ThemeOptions;
  navBar: NavBarState;
  pokemon: Array<PokemonInfo>;
  user: UserState;
}

export interface Action {
  type: string;
}

export interface ActionDict<StateType, ActionType extends Action> {
  [key: string]: ActionHandler<StateType, ActionType>;
}

type ActionHandler<StateType, ActionType extends Action> = (state: StateType, action: ActionType)=> StateType;

export interface NavBarState {
  colorSelector: SelectedColors;
}

export interface UserState {
  authenticated: boolean|null;
  language: string;
  translation: Translation;
  id?: number;
  currentUser?: OAuthUser;
  profiles?: Array<OAuthUser>;
}

export interface OAuthUser {
  id: string;
  loginID: number;
  provider: string;
  login: string;
  displayName: string;
  thumbnail: string;
}

export interface Translation {
  [key: string]: string;
}

export type SelectedColors = {
  [key in "primary" | "secondary"]: ColorProps;
};
