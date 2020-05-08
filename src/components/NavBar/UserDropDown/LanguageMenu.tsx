import React from "react";

import {useSelector, useDispatch} from "react-redux";
import {changeLanguage, UserModel} from "../../../state/actions/userActions";
import {State} from "../../../state/types";
import useTranslator from "../../../hooks/useTranslator";

import {patchJSON, fetchJSON} from "../../../utils/dry";
import {ReturnButton} from "../../../utils/ui";

import {MenuItem, SelectProps} from "@material-ui/core";

import Select from "./Select";

let languages: Array<[string, string]>;
fetchJSON("/api/languages/").then((langs)=> languages = langs);

export default function LanguageMenu(props: SelectProps) {
  const _ = useTranslator();
  const dispatch = useDispatch();
  const user = useSelector(({user}: State)=> user);

  function setLanguage({target}: React.MouseEvent<HTMLLIElement>) {
    const lang = (target as HTMLLIElement).dataset.lang!;

    if(user.authenticated) {
      patchJSON("/api/users/current/", {language: lang}).then((userModel: UserModel)=> {
        dispatch(changeLanguage(lang));
      });
    }

    else {
      localStorage.setItem("language", lang);
      dispatch(changeLanguage(lang));
    }
  }

  return (
    <Select {...props}>
      <MenuItem value="main" color="secondary" dense>
        <ReturnButton>{_("Language")}</ReturnButton>
      </MenuItem>
      {languages && languages.map(([code, lang])=>
        <MenuItem key={`${code}:${lang}`} onMouseDown={setLanguage} data-lang={code}>{lang}</MenuItem>
      )}
    </Select>
  );
}
