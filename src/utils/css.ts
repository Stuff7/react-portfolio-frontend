import {fade} from "@material-ui/core/styles/colorManipulator";

export function repLinearGradient(rotation: number, ...colors: string[]) {
  return `repeating-linear-gradient(${rotation}deg, ${colors.join(", ")})`;
}

export function diamondBackground(color: string, strength: number = 0.75, rotation: number = 40) {
  return [
    repLinearGradient(rotation, color, `${fade(color, strength)} 60px`),
    repLinearGradient(rotation*3, fade(color, strength), `${color} 60px`),
  ].join(", ");
}

export function Wave(
waveColor = "rgba(255, 255, 255, .75)",
background = "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)"): CSSClasses {
  return {
    waveWrapper: {
      top: 0,
      left: 0,
      background: waveColor,
      width: "100%",
      height: "100%",
      position: "absolute",
      overflow: "hidden",
      zIndex: -1,
    },
    wave: {
      background,
      bottom: "25%",
      right: "-25%",
      width: `150v${window.screen.width > window.screen.height? "w" : "h"}`,
      height: `140v${window.screen.width > window.screen.height? "w" : "h"}`,
      position: "absolute",
      borderRadius: "150%",
      animation: "$wave 15s infinite linear",
    },
  };
}

type CSSClasses = {[key: string]: any};
