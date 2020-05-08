import {Action, ActionDict, Reducer, UserState, Translation} from "../types"

const defaultUser: UserState = {
  authenticated: null,
  language: "",
  translation: {},
};

const actions: ActionDict<UserState, UserAction> = {
  UPDATE_USER: (user, action)=> ({
    ...user, ...action.user
  }),
  CHANGE_LANGUAGE: (user, action)=> ({
    ...user, language: action.language
  }),
  RECEIVE_TRANSLATION: (user, action)=> ({
    ...user, translation: action.translation
  }),
  CHANGE_STATUS: (user, action)=> ({
    ...user, authenticated: action.status
  }),
};

export default Reducer(actions, defaultUser);

export interface UserAction extends Action {
  user: UserState;
  language: string;
  translation: Translation;
  status: boolean;
}
