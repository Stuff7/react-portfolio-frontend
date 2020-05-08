import React from "react";
import {SelectProps} from "@material-ui/core";

export default function Menu({CurrentMenu, ...props}: MenuProps) {
  return (
    <CurrentMenu {...props}/>
  );
}

interface MenuProps extends SelectProps {
  CurrentMenu: React.ReactType;
}
