import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {MenuItem, Input} from "@material-ui/core";

import {capitalize} from "../../utils/dry";
import {diamondBackground} from "../../utils/css";
import {InputStyles} from "./styles";

import useTitle from "../../hooks/useTitle";
import useTranslator from "../../hooks/useTranslator";
import useAPI from "./hooks/useAPI";

import AsyncContent from "./AsyncContent";
import IconSwitch from "./IconSwitch"
import MixerIcon from "../icons/MixerIcon";
import TwitchIcon from "../icons/TwitchIcon";

import Select from "./Select";
import Params from "./Params";

function useStyles(provider: ProviderStyles) {
  return makeStyles(({palette})=> ({
    root: {
      position: "relative",
      height: "100%",
      overflow: "auto",
      background: diamondBackground(provider.background[palette.type], 0.7, 5),
    },
    endpoint: {
      "&, & *": {
        color: "#fafafa",
      },
      "&, & .MuiSelect-root, & .MuiInput-root": {
        fontFamily: "Fira Code",
      },
      ...InputStyles(provider.background.light),
      position: "relative",
      padding: 8,
      height: 256,
      maxHeight: "65%",
      background: provider.background.main,
      borderRadius: "0 0 5% 65%",
      transition: "border-radius 0.4s",
      "&:hover": {
        borderBottomLeftRadius: "50%",
      },
    },
    options: {
      display: "flex",
      flexDirection: "column",
      width: "20em",
      maxWidth: "80%",
      position: "absolute",
      zIndex: 1,
      left: 32,
      top: 8,
    },
    provider: {
      fontSize: 48,
      fontWeight: "bold",
    },
  }))();
}

export default function CustomAPIs() {
  const _ = useTranslator();
  const [API, APIIsReady] = useAPI();
  const [provider, setProvider] = React.useState("twitch");
  const [endpoint, setEndpoint] = React.useState("followage");
  const [username, setUsername] = React.useState(_("Username"));
  const classes = useStyles(Style[provider]);
  useTitle(`${capitalize(provider)} | CustomAPIs`);

  function changeProvider({target}: React.ChangeEvent<{value: unknown}>) {
    setProvider(target.value as string);
  }

  function changeEndpoint({target}: React.ChangeEvent<{value: unknown}>) {
    setEndpoint(target.value as string);
  }

  function changeUsername({target}: React.ChangeEvent<HTMLInputElement>) {
    setUsername(target.value || _("Username"));
  }

  function getParams() {
    const api = API.apis.find(api=> api.name === endpoint);
    return api? api.params : [];
  }

  return (
    <AsyncContent ready={APIIsReady}>
      <div className={classes.root}>
        <div className={classes.endpoint}>
          <div className={classes.options}>
            <Select className={classes.provider} onChange={changeProvider} value={provider}>
              {API.providers.map(prov=>
                <MenuItem key={prov.name} value={prov.name}>
                  {prov.display_name}
                </MenuItem>
              )}
            </Select>
            <Select onChange={changeEndpoint} value={endpoint}>
              {API.apis.map(api=>
                <MenuItem key={api.name} value={api.name}>
                  {_(api.display_name)}
                </MenuItem>
              )}
            </Select>
            <Input
              onInput={changeUsername}
              placeholder={_("Username")}
              inputProps={{
                maxLength: 25,
                size: 25
              }}
            />
          </div>
          <IconSwitch Icon={Style[provider].icon}/>
        </div>
        <Params provider={provider} username={username} endpoint={endpoint} params={getParams()}/>
      </div>
    </AsyncContent>
  );
}

const Style: {[key: string]: ProviderStyles} = {
  twitch: {
    background: {
      main: "#9147ff",
      light: "#dbbeff",
      dark: "#1e1e23",
    },
    icon: TwitchIcon,
  },
  mixer: {
    background: {
      main: "#0270d9",
      light: "#b7d4ff",
      dark: "#131c2c",
    },
    icon: MixerIcon,
  },
};

interface ProviderStyles {
  background: {[key: string]: string};
  icon: React.ReactType;
}
