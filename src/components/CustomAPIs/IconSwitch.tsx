import React from "react";
import {IconProps} from "../types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(({palette})=> ({
  root: {
    position: "absolute",
    bottom: 8,
    right: 8,
    opacity: 0.25,
    width: 128,
    height: 128,
    maxWidth: "50%",
  },
}));

export default function IconSwitch({Icon, ...props}: IconSwitchProps) {
  const classes = useStyles();

  return (
    <Icon className={classes.root} {...props}/>
  );
}

interface IconSwitchProps extends IconProps {
  Icon: React.ReactType;
}
