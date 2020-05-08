import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import useHighlightChanges from "../hooks/useHighlightChanges";

const useStyles = makeStyles(({palette})=> ({
  seriesLen: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    "& div": {
      marginLeft: 6,
    },
  },
  bold: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
}));

export default function SeriesLength({seasons, episodes}: SeriesLengthProps) {
  const classes = useStyles();

  return (
    <div className={classes.seriesLen}>
      <div className={classes.bold}>S: </div>
      <div style={useHighlightChanges(seasons)}>{seasons}</div>
      <div> | </div>
      <div className={classes.bold}>E: </div>
      <div style={useHighlightChanges(episodes)}>{episodes}</div>
    </div>
  );
}

interface SeriesLengthProps {
  seasons: number;
  episodes: number;
}
