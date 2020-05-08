import React from "react";
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {HTMLDivProps} from "../../types";

const useStyles = makeStyles(theme=> ({
  thumbnail: {
    position: "relative",
    zIndex: 2,
    display: "block",
    margin: "0 auto",
    minWidth: "10%",
    maxWidth: "95%",
  },
  shadow: {
    opacity: 0.3,
    maxWidth: "100%",
    width: 328,
    height: 12,
    borderRadius: "100%",
    background: "linear-gradient(90deg,transparent,#000,transparent)",
    marginTop: -12,
  },
  pokeID: {
    maxWidth: "100%",
    width: 128,
    textAlign: "center",
    borderBottom: "1px solid",
    borderColor: theme.palette.text.primary,
    lineHeight: "0.1em",
    margin: "24px auto",
    "& span": {
      backgroundColor: theme.palette.background.default,
      padding: "0 10px",
    }
  },
}));

export default function Thumbnail({name, strID, thumbnail, ...props}: ThumbnailProps) {
  const classes = useStyles();

  return (
    <div {...props}>
      <div>
        <img className={classes.thumbnail} src={thumbnail} alt={`${name}`}/>
        <div className={classes.shadow}/>
      </div>
      <Typography className={classes.pokeID} variant="subtitle1">
        <span>{strID}</span>
      </Typography>
    </div>
  );
}

interface ThumbnailProps extends HTMLDivProps {
  name: string;
  strID: string;
  thumbnail: string;
}
