import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TextareaAutosize} from "@material-ui/core";

import {getQueryString} from "../../utils/dry";

import {TextAreaStyles} from "./styles";
import {Param} from "./types";

import useTimeout from "../../hooks/useTimeout";
import useTranslator from "../../hooks/useTranslator";

import HelpDialog from "./HelpDialog";
import ParamInput from "./ParamInput";
import CopyPasteInput from "../CopyPasteInput";

const useStyles = makeStyles(({palette})=> ({
  root: {
    padding: 16,
    fontFamily: "Fira Code",
  },
  params: {
    marginBottom: 16,
  },
  path: {
    borderRadius: "16px 16px 0 0",
  },
  response: {
    ...TextAreaStyles,
    width: "100%",
    backgroundColor: palette.background.default,
    color: palette.text.primary,
    border: "2px solid",
    borderColor: palette.text.primary,
    borderTop: "none",
  }
}))

export default function Params({provider, username, endpoint, params}: ParamsProps) {
  const _ = useTranslator();
  const classes = useStyles();
  const [queryParams, setQueryParams] = React.useState({});
  const [url, setUrl] = React.useState("");
  const [APIResponse, setAPIResponse] = React.useState("");
  const [timeoutFetch, cancelFetch] = useTimeout();

  React.useEffect(()=> {
    setQueryParams({});
  }, [params]);

  React.useEffect(()=> {
    const {protocol, host} = window.location;
    const queryString = getQueryString(queryParams);
    setUrl(`${protocol}//${host}/api/${provider}/${username}/${endpoint}${queryString}`);
  }, [provider, username, endpoint, queryParams]);

  React.useEffect(()=> {
    cancelFetch();
    timeoutFetch(()=> fetchResponse(url), 350);
  }, [url, cancelFetch, timeoutFetch]);

  function getParam({target}: React.ChangeEvent<HTMLTextAreaElement>) {
    const {value, name} = target;
    setQueryParams(currentParams=> ({
      ...currentParams,
      [name]: value,
    }));
  }

  function fetchResponse(endpoint: string) {
    fetch(endpoint).then(r=> r.text()).then(response=> {
      setAPIResponse(response);
    });
  }

  return (
    <div className={classes.root}>
      <div>
        <CopyPasteInput className={classes.path} value={url}/>
        <TextareaAutosize
          className={classes.response}
          value={APIResponse}
          placeholder={_("API Response")}
          name="response"
          readOnly
        />
      </div>
      <div className={classes.params}>
        <h1>{_("Parameters")}<HelpDialog/></h1>
        {params.map((param: Param, i: number)=>
          <ParamInput
            name={param.name}
            onInput={getParam}
            key={`${endpoint}?${param.name}`}
            {...param}/>
        )}
      </div>
    </div>
  );
}

interface ParamsProps {
  provider: string;
  username: string;
  endpoint: string;
  params: Array<Param>;
}
