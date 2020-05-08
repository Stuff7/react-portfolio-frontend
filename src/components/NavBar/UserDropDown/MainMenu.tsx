import React from "react";
import {useSelector} from "react-redux";
import {State} from "../../../state/types";
import useTranslator from "../../../hooks/useTranslator";

import {MenuItem, Divider, SelectProps} from "@material-ui/core";
import Select from "./Select";

import {SubMenuLabel} from "../../../utils/ui";
import LanguageIcon from "@material-ui/icons/Language";
import PaletteIcon from "@material-ui/icons/Palette";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";


const ColorSelector = React.lazy(()=> import(
  /* webpackChunkName: "mui-pickers" */ "./ColorSelector"));

export default function MainMenu(props: SelectProps) {
  const _ = useTranslator();
  const user = useSelector(({user}: State)=> user);

  return (
    <Select {...props}>
      {user.authenticated &&
      <MenuItem color="secondary">
        {user.currentUser !== undefined && user.currentUser.displayName}
      </MenuItem>}
      {user.authenticated && <Divider variant="middle"/>}
      <MenuItem value="language">
        <SubMenuLabel Icon={LanguageIcon}>{_("Language")}</SubMenuLabel>
      </MenuItem>
      <React.Suspense
        fallback={<SubMenuLabel Icon={PaletteIcon} launchIcon>{_("Color")}</SubMenuLabel>}>
        <ColorSelector/>
      </React.Suspense>
      <Divider variant="middle"/>
      <MenuItem value="providers">
        <SubMenuLabel Icon={VpnKeyIcon}>
          {_((user.authenticated? "Manage accounts" : "Login"))}
        </SubMenuLabel>
      </MenuItem>
      {user.authenticated && 
      <MenuItem component="a" href="/logout">
        <SubMenuLabel Icon={PowerSettingsNewIcon}>{_("Logout")}</SubMenuLabel>
      </MenuItem>}
    </Select>
  );
}
