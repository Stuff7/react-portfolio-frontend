import {ColorProps} from "../../components/types";

import {HEX} from "../../components/ColorGrid";

export function updatePalette(palette: string) {
  const [type, primary, secondary] = palette.split(":");
  return {
    type: "UPDATE_PALETTE",
    palette: {
      type,
      ...paletteColors(primary, secondary),
    },
  };
}

export function changePaletteType(darkMode: boolean) {
  return {
    type: "CHANGE_TYPE",
    darkMode,
  };
}

export function changePaletteColors(primary: ColorProps, secondary: ColorProps) {
  return {
    type: "CHANGE_COLORS",
    palette: paletteColors(HEX(primary), HEX(secondary)),
  };
}
// 
// export function getPalette({theme, user}: State): [boolean|null, "light"|"dark", string, string] {
//   const palette = (theme as Theme).palette;
//   return [
//     user.authenticated,
//     palette.type,
//     palette.primary.main,
//     palette.secondary.main,
//   ];
// }

function paletteColors(primary: string, secondary: string) {
  return {
    primary: {main: primary},
    secondary: {main: secondary},
  }
}
