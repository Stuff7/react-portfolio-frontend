import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {useSelector} from "react-redux";
import {State} from "../../../state/types";
import {TVSeriesEpisode} from "../TVmazeAPI";

import useTranslator from "../../../hooks/useTranslator";
import useHighlightChanges from "../hooks/useHighlightChanges";

import {formatDate, isWithinAWeek} from "../../../utils/dry";

const Important = {
  light: "#4769a6",
  dark: "#649cff",
}

const useStyles = makeStyles(({palette})=> ({
  bold: {
    fontWeight: "bold",
    paddingRight: 4,
    textTransform: "uppercase",
  },
  transparent: {
    opacity: 0.7,
  },
  recentDate: {
    color: Important[palette.type],
    fontWeight: "bold",
  }
}));

export default function Episode({label, date, display}: EpisodeProps) {
  const _ = useTranslator();
  const classes = useStyles();
  const userLang = useSelector((state: State)=> state.user.language);

  return (
    <div>
      <span className={classes.bold}>{_(label)}:</span>
      <span className={classes.transparent} style={useHighlightChanges(display)}> {display} - </span>
      <span
        className={date && isWithinAWeek(date)? classes.recentDate : undefined}
        style={useHighlightChanges(date?.getTime())}>
        {date && formatDate(date, userLang)}
      </span>
    </div>
  );
}

interface EpisodeProps extends TVSeriesEpisode {
  label: string;
}
