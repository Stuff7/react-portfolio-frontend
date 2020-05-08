import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";
import {PokemonProfile} from "../PokeAPI";
import useTranslator from "../../../hooks/useTranslator";

const useStyles = makeStyles(theme=> ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textTransform: "capitalize",
    "& > div": {
      display: "flex",
      alignItems: "center",
    },
    "& .MuiTypography-subtitle1": {
      flex: 1,
      "& + div": {
        flex: 0.5,
        textAlign: "right",
      },
    },
  },
}));

export default function Profile({catchRate, eggGroups, hatchSteps, height, weight}: PokemonProfile) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="subtitle1">{_("Height")}:</Typography><div>{height}m</div>
      </div>
      <div>
        <Typography variant="subtitle1">{_("Hatch Steps")}:</Typography><div>{hatchSteps}</div>
      </div>
      <div>
        <Typography variant="subtitle1">{_("Weight")}:</Typography><div>{weight}kg</div>
      </div>
      <div>
        <Typography variant="subtitle1">{_("Catch Rate")}:</Typography><div>{catchRate}%</div>
      </div>
      <div>
        <Typography variant="subtitle1">{_("Egg Groups")}:</Typography>
        <div>{eggGroups.map(egg=> _(egg)).join(", ")}</div>
      </div>
    </div>
  );
}
