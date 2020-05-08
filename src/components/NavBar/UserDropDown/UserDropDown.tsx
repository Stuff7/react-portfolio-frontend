import React from "react";
import {useSelector} from "react-redux";
import {State} from "../../../state/types";
import {IconButton} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import useTranslator from "../../../hooks/useTranslator";

import Menu from "./Menu";
import MainMenu from "./MainMenu";
import LanguageMenu from "./LanguageMenu";
import ProvidersMenu from "./ProvidersMenu";

const Menus: {[key: string]: React.ReactType} = {
  main: MainMenu,
  language: LanguageMenu,
  providers: ProvidersMenu,
};

export default function UserDropDown() {
  const _ = useTranslator();
  const user = useSelector(({user}: State)=> user);
  const [menu, setMenu] = React.useState({isOpen: false, id: "main"});

  function openDropDown() {
    setMenu({isOpen: true, id: "main"});
  }

  function closeDropDown(event: React.ChangeEvent<{}>) {
    setMenu(state=> ({...state, isOpen: false}));
  }

  function switchMenu(event: React.ChangeEvent<{value: unknown}>) {
    event.target.value && setMenu({id: event.target.value as string, isOpen: true});
  }

  return (
    <>
      <IconButton onClick={openDropDown} color="inherit">
        {user.authenticated
          ? user.currentUser && <img src={user.currentUser.thumbnail} alt={_("Current Profile")}/>
          : <FaceIcon/>}
      </IconButton>
      <Menu CurrentMenu={Menus[menu.id] || Menus.main}
        open={menu.isOpen}
        onOpen={openDropDown}
        onClose={closeDropDown}
        onChange={switchMenu}/>
    </>
  );
}
