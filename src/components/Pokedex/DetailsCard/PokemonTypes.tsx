import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import useTranslator from "../../../hooks/useTranslator";

const useStyles = makeStyles(theme=> ({
  types: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    "& div": {
      zIndex: 1,
      display: "inline-block",
      borderRadius: 4,
      width: "5.5em",
      textAlign: "center",
      margin: 4,
      textTransform: "capitalize"
    },
  },
  ...Types,
}));

export default function PokemonTypes({types}: PokemonTypeProps) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.types}>
      {types.map(type=>
        <div className={classes[type as "types"]} key={`pokemon-type:${type}`}>{_(type)}</div>
      )}
    </div>
  );
}

interface PokemonTypeProps {
  types: Array<string>
}

const Types: {[key: string]: React.CSSProperties} = {
  bug: {
    backgroundColor: "#729f3f",
    color: "#fff",
    border: "2px solid #406d0d"
  },
  dragon: {
    background: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
    backgroundColor: "#f16e57",
    color: "#fff",
    border: "2px solid #bf3c25"
  },
  fairy: {
    backgroundColor: "#fdb9e9",
    color: "#000",
    border: "2px solid #cb87b7"
  },
  fire: {
    backgroundColor: "#fd7d24",
    color: "#fff",
    border: "2px solid #cb4b00"
  },
  ghost: {
    backgroundColor: "#7b62a3",
    color: "#fff",
    border: "2px solid #493071"
  },
  ground: {
    background: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)",
    backgroundColor: "#f7de3f",
    color: "#000",
    border: "2px solid #c5ac0d"
  },
  normal: {
    backgroundColor: "#a4acaf",
    color: "#000",
    border: "2px solid #727a7d"
  },
  psychic: {
    backgroundColor: "#f366b9",
    color: "#fff",
    border: "2px solid #c13487"
  },
  steel: {
    backgroundColor: "#9eb7b8",
    color: "#000",
    border: "2px solid #6c8586"
  },
  dark: {
    backgroundColor: "#707070",
    color: "#fff",
    border: "2px solid #3e3e3e"
  },
  electric: {
    backgroundColor: "#eed535",
    color: "#000",
    border: "2px solid #bca303"
  },
  fighting: {
    backgroundColor: "#d56723",
    color: "#fff",
    border: "2px solid #a33500"
  },
  flying: {
    background: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)",
    backgroundColor: "#3dc7ef",
    color: "#000",
    border: "2px solid #b95bd"
  },
  grass: {
    backgroundColor: "#9bcc50",
    color: "#000",
    border: "2px solid #699a1e"
  },
  ice: {
    backgroundColor: "#51c4e7",
    color: "#000",
    border: "2px solid #1f92b5"
  },
  poison: {
    backgroundColor: "#b97fc9",
    color: "#fff",
    border: "2px solid #874d97"
  },
  rock: {
    backgroundColor: "#a38c21",
    color: "#fff",
    border: "2px solid #715a00"
  },
  water: {
    backgroundColor: "#4592c4",
    color: "#fff",
    border: "2px solid #136092"
  }
}
