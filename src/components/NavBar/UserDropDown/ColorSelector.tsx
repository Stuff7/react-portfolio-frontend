import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {changePaletteColors} from "../../../state/actions/themeActions";
import {ColorProps} from "../../types";
import usePalette from "../../../hooks/usePalette";
import useTranslator from "../../../hooks/useTranslator";

import {SubMenuLabel} from "../../../utils/ui";
import {MenuItem} from "@material-ui/core";
import SimpleDialog from "../../SimpleDialog";

import ColorGrid, {HEX} from "../../ColorGrid";
import PaletteIcon from "@material-ui/icons/Palette";

const useStyles = makeStyles(({palette})=> ({
  primary: {
    "& .MuiSlider-valueLabel span span": {
      color: palette.primary.contrastText,
    },
  },
  secondary: {
    "& .MuiSlider-valueLabel span span": {
      color: palette.secondary.contrastText,
    },
  },
}));

export default function ColorSelector() {
  const _ = useTranslator();
  const [paletteType, lastPrimary, lastSecondary, patch] = usePalette(true);
  const [primary, setPrimary] = React.useState(lastPrimary);
  const [secondary, setSecondary] = React.useState(lastSecondary);
  const classes = useStyles();

  function submitThemeColors() {
    const palette = `${paletteType}:${HEX(primary)}:${HEX(secondary)}`;
    patch(changePaletteColors(primary, secondary), palette);
  }

  const changePrimaryColor = React.useCallback((color: ColorProps)=> {
    setPrimary(color);
  }, []);

  const changeSecondaryColor = React.useCallback((color: ColorProps)=> {
    setSecondary(color);
  }, []);

  return (
    <SimpleDialog
      onOk={submitThemeColors}
      Button={MenuItem}
      buttonChildren={<SubMenuLabel Icon={PaletteIcon} launchIcon>{_("Color")}</SubMenuLabel>}>
      <ColorGrid id="p" label={_("Primary Color")} color="primary" 
        className={classes.primary}
        initialColor={lastPrimary}
        onColorChange={changePrimaryColor}/>
      <ColorGrid id="s" label={_("Secondary Color")} color="secondary"
        className={classes.secondary}
        initialColor={lastSecondary} onColorChange={changeSecondaryColor}/>
    </SimpleDialog>
  );
}
