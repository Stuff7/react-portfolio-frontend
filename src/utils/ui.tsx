import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles(theme => ({
  left: {
    width: "1em",
    height: "1em",
    fill: theme.palette.text.primary,
  },
  right: {
    marginLeft: "auto",
  },
}));

export function ReturnButton({children}: Label) {
  return (<><ArrowBackIosIcon color="secondary" fontSize="inherit"/>{children}</>);
}

export function SubMenuLabel({Icon, launchIcon, children}: SubMenuLabel) {
  return (
    <LabelWithIcons LeftIcon={Icon} RightIcon={launchIcon? LaunchIcon : ArrowForwardIosIcon}>
      {children}
    </LabelWithIcons>
  );
}

function LabelWithIcons({LeftIcon, RightIcon, children}: LabelWithIconsProps) {
  const classes = useStyles();

  return (
    <>
      <LeftIcon className={classes.left}/>
        {children}
      <RightIcon className={classes.right} fontSize="inherit"/>
    </>
  );
}

SubMenuLabel.defaultProps = {
  Icon: ArrowBackIosIcon
};

interface Label {
  children?: React.ReactNode;
}

interface LabelWithIconsProps extends Label {
  LeftIcon: React.ReactType;
  RightIcon: React.ReactType;
}

interface SubMenuLabel extends Label {
  Icon: React.ReactType;
  launchIcon?: boolean;
}
