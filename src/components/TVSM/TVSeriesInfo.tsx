import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import useTranslator from "../../hooks/useTranslator";

import CRUDButtons from "./CRUDButtons";
import {fetchShow, TVSeries} from "./TVmazeAPI";

const useStyles = makeStyles(({palette})=> ({
  root: {
    height: "100%",
    padding: 16,
    overflow: "hidden",
    position: "relative"
  },
  bold: {
    fontWeight: "bold"
  },
  crud: {
    display: "flex",
    position: "absolute",
    top: 16,
    right: 16,
  }
}));

export default function TVSeriesInfo({id, isSaved, img, addSeries, delSeries}: TVSeriesInfoProps) {
  const _ = useTranslator();
  const [tvSeries, setTvSeries] = React.useState<TVSeries|false>(false)
  const classes = useStyles();

  const upd = React.useCallback(async ()=> {
    if(id) {
      const series = await fetchShow(id);
      setTvSeries(series);
      return series;
    }
    return false;
  }, [id]);

  React.useEffect(()=> {
    upd();
  }, [upd]);

  React.useEffect(()=> {
    tvSeries && img(tvSeries.image?.original || "");
  }, [tvSeries, img]);

  function add() {
    upd().then(series=> {
      series && addSeries(series);
    });
  }

  function del() {
    tvSeries && delSeries(tvSeries.id);
  }

  return (
    <div>
      {tvSeries &&
        <div className={classes.root}>
          <CRUDButtons className={classes.crud} isSaved={isSaved} onAdd={add} onDelete={del}/>
          <p className={classes.bold}>
            {tvSeries.genres.join(" | ")}
          </p>
          <h1 className={classes.bold}>
            {tvSeries.name} ({_(tvSeries.status)})
          </h1>
          <p>
            <span className={classes.bold}>
              {tvSeries.premiered?.getFullYear()}
            </span>
            <span className={classes.bold}> | </span>
            <span className={classes.bold}>
              {_("DIRECTOR")}:
            </span> {tvSeries.directors.join(", ")}
            <span className={classes.bold}> | </span>
            <span className={classes.bold}>
              {_("SEASONS")}:
            </span> {tvSeries.seasons} ({tvSeries.episodes} {_("episodes")})
          </p>
          <p>{tvSeries.summary}</p>
        </div>
      }
    </div>
  );
}

interface TVSeriesInfoProps {
  id: number;
  isSaved?: boolean;
  img: (src: string)=> void;
  addSeries: (series: TVSeries)=> void;
  delSeries: (seriesID: number)=> void;
}
