import {CSSProperties} from "react";

export function InputStyles(borderBottomColor: string) {
  return {
    "& .MuiInput-root": {
      color: "#fafafa",
      fontFamily: "Fira Code",
    },
    "& .MuiInput-underline": {
      "&:hover:before": {
        borderBottomColor: "#fff",
      },
      "&:before": {
        borderBottomColor: "#fafafa",
      },
      "&:after": {
        borderBottomColor,
      },
    },
  };
}

export const TextAreaStyles: CSSProperties = {
  border: "none",
  font: "16px Fira Code",
  padding: 16,
  resize: "none",
}
