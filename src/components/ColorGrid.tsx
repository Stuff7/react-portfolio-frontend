import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Tooltip, Grid, Slider, IconButton, Paper, TextField} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

import {ColorProps, HTMLDivProps} from "./types";
import Colors from "./types/Colors";

import useTranslator from "../hooks/useTranslator";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiIconButton-root": {
      padding: "0",
      width: "100%"
    },
    "& .MuiIconButton-label": {
      height: "100%"
    },
    "& [type=radio]": {
      position: "absolute",
      width: "100%",
      height: "100%",
      cursor: "inherit",
      opacity: 0
    },
    "& [type=radio] + div": {
      visibility: "hidden"
    },
    "& [type=radio]:checked + div": {
      visibility: "visible"
    }
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid",
    height: "100%",
    width: "100%"
  },
  spacing: {
    margin: ".5rem",
    paddingBottom: "1rem",
    width: "100%"
  },
  scrollableX: {
    width: "100%",
    overflowY: "hidden",
    overflowX: "auto"
  }
}));

export default function ColorGrid({id, initialColor, label, onColorChange, ...props}: ColorGridProps) {
  const _ = useTranslator();
  const [colors, setColors] = React.useState(getColors(initialColor.shade));
  const [currentColor, setCurrentColor] = React.useState(initialColor);
  const classes = useStyles();

  React.useEffect(()=> {
    onColorChange(currentColor);
  }, [currentColor, onColorChange]);

  function changeShade(event: React.ChangeEvent<Object>, value: number | number[]) {
    const shade = Shades[value as number];
    setColors(getColors(shade));
    setCurrentColor(color=> ({...color, shade: shade}));
  }
  function selectColor(name: string) {
    setCurrentColor(color=> ({...color, name}));
  }

  return (
    <div className={classes.spacing}>
      <TextField
        color={props.color}
        fullWidth label={label}
        value={HEX(currentColor)}/>
      <Slider
        className={props.className}
        value={Shades.indexOf(currentColor.shade)}
        color={props.color}
        getAriaValueText={getShadeValue}
        valueLabelDisplay="auto"
        valueLabelFormat={getShadeValue}
        step={1}
        marks
        min={0}
        max={13}
        onChange={changeShade}
      />
      <Paper elevation={3} className={classes.scrollableX}>
        <Grid container className={classes.root} wrap="nowrap">
          {colors.map((color: {name: string, style: {backgroundColor: string}}, i: number)=>
            <Tooltip key={"color#"+i} title={_(color.name)} arrow>
              <Grid item style={color.style}>
                <IconButton>
                  <input
                    checked={currentColor.name === color.name}
                    name={id}
                    type="radio"
                    onChange={selectColor.bind(null, color.name)}/>
                  <div className={classes.iconWrapper}><CheckIcon/></div>
                </IconButton>
              </Grid>
            </Tooltip>)}
        </Grid>
      </Paper>
    </div>
  );
}

export function HEX(color: ColorProps) {
  return Colors[color.name][color.shade];
}

function getColors(shade: string) {
  const colors = [];

  for(const color in Colors)
    colors.push(createStyles(color, Colors[color][shade]));

  return colors;
}
function getShadeValue(value: number) {
  return Shades[value];
}
function createStyles(name: string, backgroundColor: string) {
  return {name, style: {backgroundColor}}
}
const Shades: Array<string> = [
  "50","100","200","300","400","500",
  "600","700","800","900","A100",
  "A200","A400","A700"
];

interface ColorGridProps extends HTMLDivProps {
  id: string;
  label: string;
  color: "primary" | "secondary" | undefined;
  initialColor: ColorProps;
  onColorChange: (colorProps: ColorProps)=> void;
}
