import React from "react";
import {Typography, useMediaQuery} from "@material-ui/core";
import {makeStyles, fade} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

import PokeballIcon from "./PokeballIcon";

const useStyles = makeStyles(theme=> ({
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: 16,
    margin: "0 auto",
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    maxWidth: "100%",
    width: 320,
    height: 96,
    "&:hover":{
      backgroundColor: theme.palette.secondary.light,
      "& .MuiTypography-root": {
        color: theme.palette.secondary.contrastText,
      },
      "& svg": {
        stroke: theme.palette.secondary.contrastText,
      },
    },
    "& .MuiTypography-root": {
      textTransform: "capitalize",
      fontWeight: "bold",
    },
    "& .MuiTypography-caption": {
      color: fade(theme.palette.text.primary, 0.5),
    },
  },
  sprite: {
    zIndex: 1,
  },
  mark: {
    position: "absolute",
    transform: "rotate(-30deg)",
    stroke: theme.palette.text.primary,
    strokeOpacity: 0.6,
    top: 8,
    right: 16,
    opacity: 0.5,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  phone: {
    fontSize: 16,
  }
}));

export default function PreviewCard({name, path, id, thumbnail}: CardProps) {
  const classes = useStyles();
  const isPhone = useMediaQuery("(max-width:800px)");

  return (
    <Link className={classes.link} to={path}>
      <div className={classes.card}>
        <Typography component="div">
          <Typography className={isPhone? classes.phone : undefined} variant="h5">{name}</Typography>
          <Typography variant="caption">#{id}</Typography>
        </Typography>
        <img 
          className={classes.sprite}
          src={thumbnail}
          alt={name}
        />
        <PokeballIcon className={classes.mark} width={128} height={128}/>
      </div>
    </Link>
  );
}

interface CardProps {
  name?: string;
  id: string;
  path: string;
  thumbnail: string;
}
