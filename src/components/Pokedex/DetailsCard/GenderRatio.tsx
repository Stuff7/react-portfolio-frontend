import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {PokemonGender} from "../PokeAPI";
import useTranslator from "../../../hooks/useTranslator";

const female = "#f48fb1";
const male = "#2196f3";

const useStyles = makeStyles(theme=> ({
  circle: {
    height: 196,
    width: 196,
    fontSize: 16,
    color: "#202020",
    borderRadius: "100%",
    overflow: "hidden",
    textAlign: "center",
    fontWeight: "bold",
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }
  },
  female: {
    backgroundColor: female,
  },
  male: {
    backgroundColor: male,
  },
  genderless: {
    fontSize: 32,
    height: "100%",
    animation: "$genderless 2s linear infinite",
  },
  "@keyframes genderless": {
    from: {
      backgroundColor: female,
    },
    "50%": {
      backgroundColor: male,
    },
    to: {
      backgroundColor: female,
    },
  },
}));


export default function GenderRatio({genderless, female, male}: PokemonGender) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.circle}>
      {genderless && 
        <div className={classes.genderless}>{_("Genderless")}</div>
      }
      {female > 0 && 
        <div className={classes.female} style={progress(female)}>
          {female}% {female===100 && _("Female")}
        </div>
      }
      {male > 0 &&
        <div className={classes.male} style={progress(male)}>
          {male}% {male===100 && _("Male")}
        </div>
      }
    </div>
  );
}

function progress(percentage: number) {
  return {
    height: `${percentage}%`
  }
}
