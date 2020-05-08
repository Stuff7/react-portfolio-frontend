import {createStore, combineReducers} from "redux";
import theme from "./reducers/themeReducer";
import pokemon from "./reducers/pokedexReducer";
import user from "./reducers/userReducer";

export default createStore(combineReducers({theme, pokemon, user}));
