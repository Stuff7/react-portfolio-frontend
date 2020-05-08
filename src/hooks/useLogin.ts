import {useEffect} from "react";

import {useDispatch} from "react-redux";
import {updateUser, changeLanguage, changeStatus, UserModel} from "../state/actions/userActions";
import {updatePalette} from "../state/actions/themeActions";

import {fetchJSON, getter} from "../utils/dry";

export default function useLogin() {
  const dispatch = useDispatch();

  useEffect(()=> {
    fetchJSON("/api/users/current/").then((user: UserModel)=> {
      if(user.is_authenticated) {
        dispatch(updateUser(user));
        dispatch(updatePalette(user.palette));
      }
      else {
        dispatch(changeStatus(false));
        const get = getter<string>(localStorage);
        dispatch(changeLanguage(get("language", user.language)));
        dispatch(updatePalette(get("palette", user.palette)));
      }
    });
  }, [dispatch]);
}
