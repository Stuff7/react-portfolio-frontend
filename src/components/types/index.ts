import {MenuProps} from "@material-ui/core";

export interface ColorProps {
  name: string;
  shade: string;
}

export type Nullable<Type> = Type | null;

export const positionDropDown: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left"
  },
  getContentAnchorEl: null
};

export type TextAreaProps = React.PropsWithoutRef<JSX.IntrinsicElements["textarea"]>;
export type ButtonProps = React.PropsWithoutRef<JSX.IntrinsicElements["button"]>;
export type InputProps = React.PropsWithoutRef<JSX.IntrinsicElements["input"]>;
export type IconProps = React.PropsWithoutRef<JSX.IntrinsicElements["svg"]>;
export type HTMLDivProps = React.PropsWithoutRef<JSX.IntrinsicElements["div"]>;
