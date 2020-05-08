import React from "react";
import {MenuItem, SelectProps} from "@material-ui/core";

import {useSelector, useDispatch} from "react-redux";
import {State} from "../../../state/types";
import {updateUser, UserModel} from "../../../state/actions/userActions";
import useTranslator from "../../../hooks/useTranslator";

import {patchJSON} from "../../../utils/dry";
import {ReturnButton, SubMenuLabel} from "../../../utils/ui";
import TwitchIcon from "../../icons/TwitchIcon";
import MixerIcon from "../../icons/MixerIcon";

import Select from "./Select";

export default function ProvidersMenu(props: SelectProps) {
  const _ = useTranslator();
  const dispatch = useDispatch();
  const user = useSelector(({user}: State)=> user);

  function switchUser({target}: React.MouseEvent<HTMLLIElement>) {
    const userID = (target as HTMLLIElement).dataset.userid!;
    patchJSON("/api/users/current/", {current_user: userID}).then((userModel: UserModel)=> {
      dispatch(updateUser(userModel));
    });
  }

  return (
    <Select {...props}>
      <MenuItem value="main" color="secondary" dense>
        <ReturnButton>{_((user.authenticated? "Accounts" : "Providers"))}</ReturnButton>
      </MenuItem>
      {user.authenticated && user.profiles!.map((profile, i: number)=> 
        <MenuItem key={`userProfile#${i}`} onMouseDown={switchUser} data-userid={profile.id}>
          {profile.provider === "twitch"? <TwitchIcon/> : <MixerIcon/>}
          {profile.displayName}
          <img src={profile.thumbnail} alt={_("Profile")}/>
        </MenuItem>
      )}
      {user.authenticated && <MenuItem color="secondary" dense>{_("Add new account")}</MenuItem>}
      <MenuItem component="a" href="/api/oauth/twitch/authorize/">
        <SubMenuLabel Icon={TwitchIcon}>Twitch</SubMenuLabel>
      </MenuItem>
      <MenuItem component="a" href="/api/oauth/mixer/authorize/">
        <SubMenuLabel Icon={MixerIcon}>Mixer</SubMenuLabel>
      </MenuItem>
    </Select>
  );
}
