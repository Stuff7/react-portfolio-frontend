import React from "react";
import {Route, Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {State} from "../../../state/types";

import {IconButton, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import useTitle from "../../../hooks/useTitle";
import useTranslator from "../../../hooks/useTranslator";

import {capitalize} from "../../../utils/dry";

import {useDispatch} from "react-redux";
import {addPokemonDetails} from "../../../state/actions/pokedexActions";

import {fetchPokemonDetails, PokemonInfo} from "../PokeAPI";

import AsyncContent from "../AsyncContent";
import PokeballIcon from "../PokeballIcon";
import PokemonTypes from "./PokemonTypes";
import Thumbnail from "./Thumbnail";
import Property from "./Property";
import EvolutionChart from "./EvolutionChart";
import Abilities from "./Abilities";
import BaseStats from "./BaseStats";
import GenderRatio from "./GenderRatio";
import Profile from "./Profile";
import PageControls from "./PageControls";

const useStyles = makeStyles(theme=> ({
  root: {
    overflow: "auto",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  returnIcon: {
    position: "absolute",
    zIndex: 3,
    marginTop: 16,
    "& .MuiSvgIcon-root": {
      fill: "#fafafa",
      stroke: "#222",
      strokeWidth: 0.5,
      width: 48,
      height: 48,
    },
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    margin: "0 auto",
    width: "100%",
    minHeight: "100%",
    borderRadius: "16px 16px 0 0",
    padding: 16,
    "& .MuiTypography-root": {
      width: "100%",
      fontWeight: "bold",
      textTransform: "capitalize",
    },
    "& .MuiTypography-h6": {
      fontWeight: "normal",
    },
    "& .MuiTypography-h4": {
      textAlign: "center",
    },
  },
  thumbnail: {
    marginTop: -105,
    maxWidth: "100%",
  },
  mark: {
    width: "50%",
    marginBottom: "-22%",
    transform: "rotate(30deg)",
    margin: 32,
    zIndex: -1,
    opacity: 0.5,
    stroke: theme.palette.text.primary,
    strokeOpacity: 0.6,
  },
  desc: {
    textAlign: "justify",
  },
  ...Colors,
}));

export default function DetailsCard({path, pokemon}: CardProps) {
  useTitle(`${capitalize(pokemon.name)} | Pokédex`);
  const _ = useTranslator();
  const lang = useSelector(({user}: State)=> user.language);
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(()=> {
    if(pokemon.types === undefined) {
      fetchPokemonDetails(pokemon.id).then((data)=> {
        dispatch(addPokemonDetails(data, pokemon.id));
      });
    }
  },[dispatch, pokemon.types, pokemon.id]);

  return (
    <Route path={path}>
      <div className={`${classes.root} ${classes[pokemon.color as "root"]}`}>
        <Link to="/pokedex" className={classes.returnIcon}>
          <IconButton><ArrowBackIosIcon/></IconButton>
        </Link>
        <PokeballIcon className={classes.mark}/>
        <div className={classes.card}>
          <Thumbnail className={classes.thumbnail} thumbnail={pokemon.thumbnail.large} 
            name={pokemon.name} strID={pokemon.strID}/>
          <Typography variant="h4">{pokemon.name}</Typography>
          <AsyncContent ready={pokemon.types !== undefined}>
            <Property name={_("Type")}><PokemonTypes types={pokemon.types}/></Property>
            <Property name={_("Species")}>
              <Typography variant="h6">{pokemon.genus&&pokemon.genus(lang)}</Typography></Property>
            <div className={classes.desc}>{pokemon.description&&pokemon.description(lang)}</div>
            <Typography variant="h5">{_("Evolution Chart")}</Typography>
            <EvolutionChart evolutions={pokemon.evolutionChart}/>
            <Typography variant="h5">{_("Abilities")}</Typography>
            <Abilities abilities={pokemon.abilities}/>
            <Typography variant="h5">{_("Base Stats")}</Typography>
            <BaseStats stats={pokemon.stats}/>
            <Typography variant="h5">{_("Gender Ratio")}</Typography>
            <GenderRatio {...pokemon.genderRatio}/>
            <Typography variant="h5">{_("Profile")}</Typography>
            <Profile {...pokemon.profile}/>
          </AsyncContent>
          <PageControls currentPage={pokemon.id-1}/>
        </div>
      </div>
    </Route>
  );
}

interface CardProps {
  path: string;
  pokemon: PokemonInfo;
}

const Colors = {
  black: {
    backgroundColor: "#303030 !important",
    "& > svg": {
      stroke: "#fffaf0",
    },
  },
  blue: {
    backgroundColor: "#12aabf !important",
    "& > svg": {
      stroke: "#303030",
    },
  },
  brown: {
    backgroundColor: "#4b342c !important",
    "& > svg": {
      stroke: "#fffaf0",
    },
  },
  gray: {
    backgroundColor: "#7c7c7c !important",
  },
  green: {
    backgroundColor: "#4caf50 !important",
    "& > svg": {
      stroke: "#303030",
    },
  },
  pink: {
    backgroundColor: "#ec407a !important",
    "& > svg": {
      stroke: "#303030",
    },
  },
  purple: {
    backgroundColor: "#9c27b0 !important",
  },
  red: {
    backgroundColor: "#dc143c !important",
    "& > svg": {
      stroke: "#303030",
    },
  },
  white: {
    backgroundColor: "#fffaf0 !important",
    "& > svg": {
      stroke: "#303030",
    },
  },
  yellow: {
    backgroundColor: "#ffeb3b !important",
    "& > svg": {
      stroke: "#303030",
    },
  },
};
