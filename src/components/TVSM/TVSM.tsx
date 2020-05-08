import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core/styles/colorManipulator";

import useTitle from "../../hooks/useTitle";
import useTimeout from "../../hooks/useTimeout";
import useSavedSeriesList from "./hooks/useSavedSeriesList";

import {TVSeries, TVSeriesDetails, seriesDetails, fetchShow, fetchShowByName} from "./TVmazeAPI";

import Header from "./Header";
import TVSeriesSearch from "./TVSeriesSearch";
import TVSeriesInfo from "./TVSeriesInfo";
import TVSeriesList from "./TVSeriesList";
import TVSeriesSorter from "./TVSeriesSorter";

import TVSMIcon from "../../assets/tvsm.svg";

const BG = {
  dark: "#222222",
  light: "#f0f0f0",
};

const useStyles = makeStyles(({palette})=> {
  const transparent = fade(BG[palette.type], 0.5)
  return {
    root: {
      height: "100%",
      padding: 16,
      overflow: "auto",
      position: "relative",
      backgroundColor: BG[palette.type],
    },
    background: {
      position: "absolute",
      top: 0, right: 0,
      backgroundColor: BG[palette.type],
      width: "100%",
      minHeight: "100%",
      "& div": {
        float: "right",
        position: "relative",
        overflowX: "hidden",
        "&:after": {
          content: '""',
          background: `linear-gradient(90deg, ${BG[palette.type]} 5%, ${transparent}),`+
                      `linear-gradient(360deg, ${BG[palette.type]} 1%, ${transparent})`,
          position: "absolute",
          top: 0, bottom: 0, left: 0, right: 0,
        },
        "& img": {
          maxWidth: "100%",
        },
      },
    },
  };
});

export default function TVSM() {
  useTitle("TVSM");
  const [search, setSearch] = React.useState("");
  const [currentSeries, setCurrentSeries] = React.useState(0);
  const [background, setBackground] = React.useState("");
  const [timeoutSearch, cancelSearch] = useTimeout();
  const [seriesList, setSeriesList] = useSavedSeriesList();
  const classes = useStyles();

  function getSearch({target}: React.ChangeEvent<HTMLInputElement>) {
    /* Getting user input. */
    let {value} = target;
    value = value.trim();
    if(value[0] === "#") return;

    cancelSearch();
    timeoutSearch(()=> setSearch(value), 360);
  }

  function handleEnter({key, target}: React.KeyboardEvent<HTMLInputElement>) {
    /* Adding/Updating specified series when user hits enter. */
    const {value} = target as HTMLInputElement;
    if(key === "Enter" && value.trim()[0] === "#")
      updSeries(value.slice(1).split(","));
  }

  function updSeries(list?: Array<string|number>) {
    /* Updating list of series.

    @param {Array} list - Series to update, can be
    IDs or names */
    if(!list?.length) return;

    const type = typeof(list[0]) as "string"|"number";
    const fetchByType = {
      string: fetchShowByName,
      number: fetchShow,
    }[type];

    if(fetchByType === undefined) return;

    let i = 0;
    for(const series of list) {
      window.setTimeout(()=>
        (fetchByType as (x: string|number)=> Promise<TVSeries|false>)(series).then(show=> {
          show && addSeries(show);
        }), i++*333
      );
    }
  }

  function updAll() {
    /* Updating all series in user's list. */
    updSeries(seriesList?.map(series=> series.id));
  }

  function changeCurrentSeries(seriesID: number) {
    /* Changing current displayed series.

    @param {number} seriesID - ID of series to set
    as current */
    setCurrentSeries(seriesID);
  }

  function addSeries(series: TVSeries) {
    /* Adding/updating series.

    @param {TVSeries} series - Series to add or 
    update if it already exists */
    (series as TVSeriesDetails) = seriesDetails(series);
    setSeriesList(list=> {
      if(list === null) return list;
      const index = list.findIndex(s=> s.id === series.id);
      if(index > -1) {
        const updated = [...list];
        updated[index] = series;
        return updated;
      }
      return [...list, series];
    });
  }

  function delSeries(id: number) {
    /* Removing series.

    @param {number} id - ID of series to remove */
    setSeriesList(list=> {
      if(list === null) return list;
      const index = list.findIndex(s=> s.id === id);
      const updated = [...list];
      updated.splice(index, 1);
      return updated;
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <div>
          <img src={background || TVSMIcon} alt="tvsm"/>
        </div>
      </div>
      <Header onInput={getSearch} onKeyUp={handleEnter}/>
      <TVSeriesInfo
        isSaved={seriesList?.some(s=> s.id === currentSeries)}
        addSeries={addSeries}
        delSeries={delSeries}
        id={currentSeries}
        img={setBackground}/>
      <TVSeriesSearch onClick={changeCurrentSeries} query={search}/>
      {seriesList?.length
      ? <TVSeriesSorter setSeriesList={setSeriesList} onAdd={updAll}/>
      : null}
      <TVSeriesList
        onClick={changeCurrentSeries}
        updSeries={addSeries}
        delSeries={delSeries}
        seriesList={seriesList}/>
    </div>
  );
}
