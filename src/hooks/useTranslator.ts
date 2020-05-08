import {State} from "../state/types";
import {useSelector} from "react-redux";

export default function useTranslator() {
  const dictionary = useSelector(({user}: State)=> user.translation);

  return function(word: string) {
    return dictionary[word] || word;
  }
}
