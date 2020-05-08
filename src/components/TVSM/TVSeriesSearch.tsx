import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import Preview from "./Preview";

import {fetchShowsSearch, TVSeriesPreview} from "./TVmazeAPI";

const useStyles = makeStyles(({palette})=> ({
  results: {
    margin: "20px 0",
    display: "flex",
    overflow: "auto",
  },
}));

export default function TVSeriesSearch({query, onClick}: TVSeriesSearchProps) {
  const classes = useStyles();
  const [shows, setShows] = React.useState<Array<TVSeriesPreview>>([]);

  React.useEffect(()=> {
    if(query) {
      fetchShowsSearch(query)
        .then(foundShows=> setShows(foundShows));
      return;
    }
    setShows([]);
  }, [query]);

  return (
    <div className={classes.results}>
      {shows.map(show=>
        <Preview
          key={show.id}
          onClick={()=> onClick(show.id)}
          image={show.image?.medium}
          name={show.name}
          status={show.status}
          network={show.network}/>
      )}
    </div>
  );
}

interface TVSeriesSearchProps {
  query: string;
  onClick: (seriesID: number)=> void;
}
