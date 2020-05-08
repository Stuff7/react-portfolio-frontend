import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AsyncContent from "../AsyncContent";
import BuildIcon from "@material-ui/icons/Build";
import {SpinningAnimation} from "../../utils/animations";
import {HTMLDivProps} from "../types";

const useStyles = makeStyles(({palette})=> ({
  root: {
    position: "absolute",
    top: 0, bottom: 0, right: 0, left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `linear-gradient(${palette.primary.main}, ${palette.secondary.main})`,
  },
  loading: {
    width: "25%",
    height: "25%",
    animation: "$spin 1s linear infinite",
    stroke: palette.secondary.contrastText,
    strokeOpacity: 0.6,
  },
  ...SpinningAnimation,
}));

export default function({children, ...props}: AsyncContentProps) {
  const classes = useStyles();

  return (
    <AsyncContent
     loading={()=>
      <div className={classes.root}>
        <BuildIcon className={classes.loading}/>
      </div>} {...props}>
      {children}
    </AsyncContent>
  );
}

export interface AsyncContentProps extends HTMLDivProps {
  ready: boolean;
}
