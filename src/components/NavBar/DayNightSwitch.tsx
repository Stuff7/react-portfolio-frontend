import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Checkbox} from "@material-ui/core";

import {changePaletteType} from "../../state/actions/themeActions";
import usePalette from "../../hooks/usePalette";
import useTranslator from "../../hooks/useTranslator";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness2Icon from "@material-ui/icons/Brightness2";

const useStyles = makeStyles(theme=> ({
  root: {
    "&.Mui-checked": {
    	color: "inherit",
    }
  },
}));

export default function DayNightSwitch() {
  const _ = useTranslator();
  const [type, primary, secondary, patch] = usePalette();
  const classes = useStyles();

  function switchTheme(event: React.ChangeEvent<HTMLInputElement>) {
    const {checked} = event.target;
    const palette = `${checked? "dark" : "light"}:${primary}:${secondary}`;

    patch(changePaletteType(checked), palette);
  }

  return (
    <Checkbox
      className={classes.root}
      checkedIcon={<Brightness2Icon/>}
      icon={<WbSunnyIcon/>}
      checked={type === "dark"}
      onChange={switchTheme}
      inputProps={{ "aria-label": _("Switch Theme") }}
    />
  );
}
