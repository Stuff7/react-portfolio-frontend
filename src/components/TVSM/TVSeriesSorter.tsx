import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import {SetSeriesList} from "./hooks/useSavedSeriesList";
import {closestDate} from "../../utils/dry";
import useTranslator from "../../hooks/useTranslator";
import {positionDropDown} from "../types";

import {TVSeriesDetails} from "./TVmazeAPI";

import Confirmation from "./Confirmation";

const useStyles = makeStyles(({palette})=> ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  form: {
    width: "90%",
    minWidth: 128,
    "& .MuiSelect-select:focus": {
      background: "transparent",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: palette.text.primary,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: palette.text.primary,
    },
  },
}));

export default function TVSeriesSorter({setSeriesList, onAdd}: TVSeriesSorterProps) {
  const _ = useTranslator();
  const classes = useStyles();
  const [sortedBy, setSortedBy] = React.useState<SortKey|"">("");
  const [order, setOrder] = React.useState("ascending");

  React.useEffect(()=> {
    if(!sortedBy) return;
    const ascending = order === "ascending";
    const currentSorter = sortedBy.includes("Ep")
      ? (a: TVSeriesDetails,b: TVSeriesDetails)=> {
        return SortHandlers[sortedBy](ascending)(
          a[sortedBy as Ep]?.date, b[sortedBy as Ep]?.date
        );
      }
      : (a:TVSeriesDetails,b: TVSeriesDetails)=> {
        return SortHandlers[sortedBy](ascending)(a[sortedBy], b[sortedBy]);
      }
    
    setSeriesList(list=>{
      if(list === null) return list;
      return [...list].sort(currentSorter);
    });
  }, [order, sortedBy, setSeriesList]);

  function sort({target}: React.ChangeEvent<{value: unknown}>) {
    const value = target.value as SortKey;
    setSortedBy(value);
  }

  function getOrder({target}: React.ChangeEvent<HTMLInputElement>) {
    const {value} = target;
    setOrder(value);
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.form}>
        <InputLabel id="sort-by">
          {_("Sort by")}...
        </InputLabel>
        <Select
          MenuProps={positionDropDown}
          labelId="sort-by"
          value={sortedBy}
          onChange={sort}>
          {SortKeys.map(([key, name])=>
            <MenuItem key={`sortBy-${key}`} value={key}>{_(name)}</MenuItem>
          )}
        </Select>
        <RadioGroup
          aria-label="sort order"
          name="sort-order"
          value={order}
          onChange={getOrder}
          row>
          <FormControlLabel value="ascending" control={<Radio/>} label={_("Ascending")}/>
          <FormControlLabel value="descending" control={<Radio/>} label={_("Descending")}/>
        </RadioGroup>
        <Confirmation onAdd={onAdd} removeSeries={setSeriesList}/>
      </FormControl>
    </div>
  );
}

function sorter({ascending, type}: SortOptions = {}): SortHandler {
  /* Finding sort function for specified type.

  @param {boolean} ascending - Whether to sort
  in ascending order or not
  @param {type} string - Type of data to sort

  @returns {SortHandler} Sorter function for
  the given type */
  const toggle = ascending === undefined? false : !ascending;

  if(type === "date") {
    return function(a: Date|null, b: Date|null) {
      return compare(a, b, (a, b)=> ascending? closestDate(a, b) : closestDate(b, a));
    } as SortHandler
  }
  return function<T>(a: T|null, b: T|null) {
    return compare(a, b, (a, b)=> (a > b) !== toggle? 1 : -1);
  } as SortHandler
}

function compare<T>(a: T|null, b: T|null, comparison: (a: T, b: T)=> number) {
  /* Generic sorter function with null checks.

  @param {T} a - First element to compare
  @param {T} b - Second element to compare
  @param {SortHandler} Comparison to be made
  after null checking

  @returns {number} Comparison result */
  if(a === b) return 0;
  if(a === null) return 1;
  if(b === null) return -1;
  return comparison(a, b);
}

const SortHandlers: {[key in SortKey]: SortHandlerDispenser} = {
  name: (ascending)=> sorter({ascending}),
  network: (ascending)=> sorter({ascending}),
  status: (ascending)=> sorter({ascending}),
  rating: (ascending)=> sorter({ascending: !ascending}),
  nextEp: (ascending)=> sorter({ascending: !ascending, type: "date"}),
  prevEp: (ascending)=> sorter({ascending: !ascending, type: "date"}),
  seasons: (ascending)=> sorter({ascending: !ascending}),
  episodes: (ascending)=> sorter({ascending: !ascending}),
}

const SortKeys: Array<[SortKey, string]> = [
  ["name", "Name"],
  ["nextEp", "Next Episode"],
  ["prevEp", "Prev Episode"],
  ["network", "Network"],
  ["status", "Status"],
  ["seasons", "Seasons"],
  ["episodes", "Episodes"],
  ["rating", "Rating"],
];

interface SortOptions {
  ascending?: boolean;
  type?: string;
}

interface TVSeriesSorterProps {
  setSeriesList: SetSeriesList;
  onAdd: ()=> void;
}

type SortKey = "name"|"network"|"status"|"seasons"|"episodes"|"rating"|Ep;
type Ep = "prevEp"|"nextEp";
type SortHandlerDispenser = (ascending?: boolean)=> SortHandler;
type SortHandler = (a: unknown, b: unknown)=> number;
type AnyArray = Array<unknown>;
