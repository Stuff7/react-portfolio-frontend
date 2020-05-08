import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton} from "@material-ui/core";
import {ExpandAnimation} from "../utils/animations";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme=> ({
  root: {
    position: "absolute",
    zIndex: 9,
    cursor: "pointer",
    width: "100%",
    height: 16,
    display: "flex",
    justifyContent: "center",
  },
  downArrow: {
    color: theme.palette.primary.contrastText,
    position: "absolute",
    zIndex: 9,
    padding: 0,
    animation: "$expand 0.8s linear infinite",
    "& .MuiSvgIcon-root": {
      fill: "#fafafa",
      stroke: "#222",
      strokeWidth: 0.5,
      width: 40,
      height: 40,
    },
  },
  ...ExpandAnimation
}));

export default function DisplayNavButton(props: DisplayNavButtonProps) {
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      <IconButton className={classes.downArrow}><ExpandMoreIcon/></IconButton>
    </div>
  );
}

type DisplayNavButtonProps = React.PropsWithoutRef<JSX.IntrinsicElements["div"]>;
