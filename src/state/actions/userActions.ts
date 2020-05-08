import {UserState, OAuthUser, Translation} from "../types";
import {UserAction} from "../reducers/userReducer";
import store from "../store";

export function updateUser(userModel: UserModel): {type: string; user: Partial<UserState>} {
  changeLanguage(userModel.language);
  const user: Partial<UserState> = {
    authenticated: userModel.is_authenticated,
    language: userModel.language,
  }
  if(user.authenticated) {
    const profiles = userProfiles(userModel.profiles!);
    Object.assign(user, {
      id: userModel.id,
      currentUser: profiles.find(oauth=> oauth.id === userModel.current_user),
      profiles: profiles,
    });
  }
  return {
    type: "UPDATE_USER",
    user,
  };
}

export function changeStatus(status: boolean) {
  return {
    type: "CHANGE_STATUS",
    status,
  };
}

export function changeLanguage(language: string) {
  import(`../../assets/translations/${language}.json`).then((translation: Translation)=> {
    store.dispatch(receiveTranslation(translation));
  });

  return {
    type: "CHANGE_LANGUAGE",
    language,
  };
}

function receiveTranslation(translation: Translation): UserAction {
  return {
    type: "RECEIVE_TRANSLATION",
    translation,
  } as UserAction;
}

function userProfiles(profiles: Array<OAuthUserModel>): Array<OAuthUser> {
  return profiles.map(oauth=> ({
    id: oauth.id,
    loginID: oauth.login_id,
    provider: oauth.provider,
    login: oauth.login,
    displayName: oauth.display_name,
    thumbnail: oauth.thumbnail,
  }))
}

export interface UserModel {
  is_authenticated: boolean;
  language: string;
  palette: string;
  id?: number;
  current_user?: string;
  profiles?: Array<OAuthUserModel>;
}

interface OAuthUserModel {
  id: string;
  login_id: number;
  provider: string;
  login: string;
  display_name: string;
  thumbnail: string;
}
