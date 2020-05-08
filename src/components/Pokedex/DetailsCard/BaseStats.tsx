import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {LinearProgress} from "@material-ui/core";
import {Stat} from "../PokeAPI";
import useTranslator from "../../../hooks/useTranslator";

const useStyles = makeStyles(theme=> ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  stat: {
    display: "flex",
    alignItems: "center",
  },
  name: {
    flex: 0,
    minWidth: 78,
    marginRight: 6,
    textTransform: "capitalize",
    textAlign: "right",
  },
  value: {
    flex: 0,
    minWidth: 30,
    fontWeight: "bold",
  },
  progress: {
    flex: 1,
    backgroundColor: theme.palette.secondary.contrastText,
    border: "1px solid",
    borderColor: theme.palette.text.primary,
    height: 16,
  }
}));

export default function BaseStats({stats}: BaseStatsProps) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {stats.map((stat, i: number)=>
        <div className={classes.stat} key={`stat${i}:${stat.name}`}>
          <div className={classes.name}>{_(stat.name)}</div>
          <div className={classes.value}>{stat.value}</div>
          <LinearProgress className={classes.progress} 
            variant="determinate"
            color="secondary"
            value={stat.value/2.55}/>
        </div>
      )}
    </div>
  );
}

interface BaseStatsProps {
  stats: Array<Stat>;
}
