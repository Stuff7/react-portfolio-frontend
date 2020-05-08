import {useState, useEffect, Dispatch, SetStateAction} from "react";

import {useSelector} from "react-redux";
import {State} from "../../../state/types";

import useTimeout from "../../../hooks/useTimeout";

import {fetchJSON, postJSON} from "../../../utils/dry";
import {TVSeriesDetails} from "../TVmazeAPI";

const API = "/api/tvsm/"

export default function useSavedSeriesList(): SeriesListState {
  const isAuthenticated = useSelector(({user}: State)=> user.authenticated);
  const [seriesList, setSeriesList] = useState<Array<TVSeriesDetails>|null>(null);
  const [timeout, cancel] = useTimeout();

  useEffect(()=> {
    /* Checking for null since these variables are async. */
    if(isAuthenticated !== null && seriesList !== null) {
      cancel();
      timeout(()=> {
        isAuthenticated
        ? postJSON(API, seriesList)
        : localStorage.setItem("seriesList", JSON.stringify(seriesList));
      }, 350);
    }
  }, [seriesList, isAuthenticated, cancel, timeout])

  useEffect(()=> {
    if(isAuthenticated === null) return;
    
    if(isAuthenticated) {
      fetchJSON(API).then(series=> {
        setSeriesList(parseDates(series));
      });
      return;
    }
    
    const item = localStorage.getItem("seriesList");
    if(item === null)
      return setSeriesList([]);

    setSeriesList(parseDates(JSON.parse(item)));
  }, [isAuthenticated]);

  return [seriesList, setSeriesList];
}

function parseDates(seriesList: Array<TVSeriesDetails>) {
  return seriesList.map(series=> ({
    ...series,
    lastUpdated: new Date(series.lastUpdated),
    nextEp: {
      ...series.nextEp,
      date: series.nextEp.date && new Date(series.nextEp.date),
    },
    prevEp: {
      ...series.prevEp,
      date: series.prevEp.date && new Date(series.prevEp.date),
    },
  }));
}

type SeriesListState = [
  AsyncSeriesList,
  SetSeriesList,
];

type AsyncSeriesList = TVSeriesDetails[]|null;
export type SetSeriesList = Dispatch<SetStateAction<AsyncSeriesList>>;
