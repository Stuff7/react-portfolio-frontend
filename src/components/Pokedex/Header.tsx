import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, Paper} from "@material-ui/core";
import useTimeout from "../../hooks/useTimeout";
import useTranslator from "../../hooks/useTranslator";

import pokeball from "../../assets/pokedex.svg";

const floralwhite = "#fffaf0";
const crimson = "#dc143c";
const black = "#000000";

const useStyles = makeStyles(theme=> ({
  root: {
    zIndex: 3,
    backgroundColor: crimson,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "center",
    padding: "8px 12px 0 12px",
    "& .MuiTypography-root": {
      color: floralwhite,
    },
    "& .MuiTypography-h4": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      "& img": {
        border: "2px solid #434a54",
        borderRadius: "100%",
        marginRight: 8,
      },
    },
    "& .MuiTypography-caption": {
      fontStyle: "italic",
      textAlign: "right",
    },
    "& a": {
      fontWeight: "bold",
      textDecoration: "none",
      color: "rgba(255,255,255,0.7)",
    },
    "& input": {
      font: "1em Exo",
      color: floralwhite,
      backgroundColor: floralwhite,
      border: `2px solid ${black}`,
      borderRadius: 4,
      padding: 4,
      width: "100%",
      transition: "background-color .1s, border-color .5s, margin-top .5s, padding .5s",
      boxSizing: "border-box",
    },
    "& label": {
      position: "relative",
      flex: .5,
      cursor: "auto",
      margin: "0 8px",
      "& p": {
        position: "absolute",
        left: 8,
        top: -8,
        color: black,
        transition: "top .1s, background-color .1s, color .5s",
      },
      "& input:focus, & input:valid": {
        backgroundColor: "transparent",
        borderColor: floralwhite,
        marginTop: 8,
        padding: 6,
        "& + p": {
          top: -16,
          fontWeight: "bold",
          color: floralwhite,
          backgroundColor: crimson,
        },
      },
    },
  },
}));

// positionStyle, navHeight and navRef are a workaround to
// get rid of lag when animating the header in big screens
export default function Header({label, title, ...props}: InputProps) {
  const _ = useTranslator();
  const classes = useStyles();
  const navRef = React.useRef<HTMLDivElement | null>(null);
  const [timeoutAbsPos, cancelAbsPos] = useTimeout();
  const [positionStyle, setPositionStyle] = React.useState({} as React.CSSProperties);
  const [navHeight, setNavHeight] = React.useState(0);

  React.useEffect(()=> {
    setNavHeight(navRef.current!.clientHeight);
    return ()=> cancelAbsPos();
  }, [cancelAbsPos]);

  function enableAbsPos() {
    cancelAbsPos();
    setPositionStyle({position: "absolute", top: 0});
  };

  function disableAbsPos() {
    cancelAbsPos();
    timeoutAbsPos(()=> setPositionStyle({}), 500);
  }

  return (
    <>
      {positionStyle.position && <div style={{height: navHeight}}/>}
      <Paper component="header" ref={navRef} className={classes.root} style={positionStyle} elevation={4} square>
        <Typography variant="h4">
          <img src={pokeball} alt={_("Pokeball Icon")} width={32} height={32}/>{title}
        </Typography>
        <label>
          <input onFocus={enableAbsPos} onBlur={disableAbsPos} required {...props}/><p>{label}</p>
        </label>
        <Typography variant="caption">
          {_("Powered by")} <a href="https://pokeapi.co/"
                        target="_blank"
                        rel="noopener noreferrer">PokéAPI</a>
        </Typography>
      </Paper>
    </>
  );
}

interface InputProps extends HTMLInputProps {
  label?: string;
  title?: string;
}

type HTMLInputProps = React.PropsWithoutRef<JSX.IntrinsicElements["input"]>;
