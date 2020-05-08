import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Ability} from "../PokeAPI";
import useTranslator from "../../../hooks/useTranslator";

const useStyles = makeStyles(theme=> ({
  list: {
    width: "100%",
    textTransform: "capitalize",
  },
  hidden: {
    opacity: 0.5,
  },
}));

export default function Abilities({abilities}: AbilitesProps) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.list}>
      {abilities.map(ability=>
        <div key={`ability:${ability.name}`} className={ability.hidden? classes.hidden : undefined}>
          -- {_(ability.name)} {ability.hidden && `(${_("hidden ability")})`}
        </div>)}
    </div>
  );
}

interface AbilitesProps {
  abilities: Array<Ability>;
}
