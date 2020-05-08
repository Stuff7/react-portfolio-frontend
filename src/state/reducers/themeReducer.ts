import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import {PaletteOptions} from "@material-ui/core/styles/createPalette";
import {Action, ActionDict, Reducer} from "../types"

const defaultTheme: ThemeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Exo",
  },
};

const actions: ActionDict<ThemeOptions, ThemeAction> = {
  UPDATE_PALETTE: (theme, action)=> ({
    ...theme, palette: action.palette
  }),
  CHANGE_TYPE: (theme, action)=> ({
    ...theme, palette: {...theme.palette, type: action.darkMode? "dark" : "light"}
  }),
  CHANGE_COLORS: (theme, action)=> ({
    ...theme, palette: {...theme.palette, ...action.palette}
  }),
};

export default Reducer(actions, defaultTheme);

export interface ThemeAction extends Action {
  darkMode: boolean;
  palette: PaletteOptions;
}
