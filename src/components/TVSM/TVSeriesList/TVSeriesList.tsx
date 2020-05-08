import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {TVSeries, TVSeriesDetails, fetchShow} from "../TVmazeAPI";

import Alert from "../Alert";
import CRUDButtons from "../CRUDButtons";
import Episode from "./Episode";
import Network from "./Network";
import Series from "./Series";
import SeriesLength from "./SeriesLength";
import SeriesRating from "./SeriesRating";

const useStyles = makeStyles(({palette})=> ({
  dim: {
    opacity: 0.7,
  },
  crud: {
    position: "absolute",
    left: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    "& button": {
      margin: "0 8px",
    },
    "& svg": {
      width: "1em",
      height: "1em",
    },
  }
}));

export default function TVSeriesList({seriesList, updSeries, delSeries, onClick}: TVSeriesListProps) {
  const classes = useStyles();

  function upd(seriesID: number) {
    return ()=>
      fetchShow(seriesID).then(updated=> {
        updated && updSeries(updated);
      });
  }

  function del(seriesID: number) {
    return ()=> delSeries(seriesID);
  }

  return (
    <div>
      <Alert length={seriesList?.length || 0}/>
      {seriesList?.map((series: TVSeriesDetails, i: number)=>
        <Series
        key={`seriesList#${series.id}`}
        position={i+1}
        lastUpdated={series.lastUpdated}
        name={series.name}
        status={series.status}
        onClick={()=> onClick(series.id)}>
          <SeriesRating rating={series.rating}/>
          <Network name={series.network}/>
          <Episode label="prev" {...series.prevEp}/>
          <Episode label="next" {...series.nextEp}/>
          <CRUDButtons className={classes.crud} onAdd={upd(series.id)} onDelete={del(series.id)} isSaved/>
          <SeriesLength seasons={series.seasons} episodes={series.episodes}/>
        </Series>
      )}
    </div>
  );
}

interface TVSeriesListProps {
  seriesList: Array<TVSeriesDetails> | null;
  onClick: (seriesID: number)=> void;
  updSeries: (series: TVSeries)=> void;
  delSeries: (seriesID: number)=> void;
}
