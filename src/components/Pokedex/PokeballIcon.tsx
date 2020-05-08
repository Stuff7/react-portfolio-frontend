import React from "react";
import {IconProps} from "../types";

export default function PokeballIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" strokeWidth="2" fill="none" stroke="#c0c0c0" {...props}>
      <path d="M16 16 m-15 0 a15 15 0 1 0 30 0 a15 15 0 1 0 -30 0 M16 16 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0 M0 16 h12 M20 16 h12"/>
    </svg>
  );
}
