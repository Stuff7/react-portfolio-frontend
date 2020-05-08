import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {PokemonEvolution} from "../PokeAPI";
import Evolution from "./Evolution";

const useStyles = makeStyles(theme=> ({
  root: {
    maxWidth: "100%",
  },
}));

export default function EvolutionChart({evolutions}: EvolutionChartProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {evolutions.map((evolution: PokemonEvolution, i: number)=> 
        <Evolution {...evolution} key={`evolution${i}:#${evolution.fromIndex}#${evolution.toIndex}`}/>
      )}
    </div>
  );
}

interface EvolutionChartProps {
  evolutions: Array<PokemonEvolution>
}
