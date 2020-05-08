import {patchJSON} from "../utils/dry";
import {useCallback} from "react";
import {useSelector, useDispatch} from "react-redux";

import {UserModel} from "../state/actions/userActions";
import {ColorProps} from "../components/types";
import {State} from "../state/types";

import {Theme} from "@material-ui/core/styles";
import {ThemeAction} from "../state/reducers/themeReducer";
import Color from "../components/types/HexColors";

export default function usePalette(namedColors?: boolean): PaletteHook {
  const dispatch = useDispatch();
  const [authenticated, ...palette] = useSelector(({theme, user}: State)=> {
    const palette = (theme as Theme).palette;
    const [primary, secondary] = [palette.primary.main, palette.secondary.main];
    return [
      user.authenticated, palette.type,
      ...(namedColors? [Color[primary], Color[secondary]] : [primary, secondary]),
    ];
  });

  const patch = useCallback((action: Partial<ThemeAction>, palette: string)=> {
    if(authenticated)
      patchJSON("/api/users/current/", {palette}).then((userModel: UserModel)=> {
        dispatch(action);
      });

    else {
      localStorage.setItem("palette", palette);
      dispatch(action);
    }
  }, [dispatch, authenticated]);

  return [...palette, patch] as PaletteHook;
}

type patchCallback = (action: Partial<ThemeAction>, palette: string)=> void;
type PaletteHook = ["light"|"dark", ColorProps, ColorProps, patchCallback];
