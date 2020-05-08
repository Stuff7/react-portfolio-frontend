import {CSSProperties} from "react";
import {fade} from "@material-ui/core/styles/colorManipulator";
import {random} from "./dry";

export function RippleAnimation(color: string, power: number = 1) {
  const wave = [0, 0.5*power, 1*power, 1.5*power, 3*power]
  return {
    "@keyframes ripple": {
      "0%": {
        boxShadow:
          `0 0 0 ${wave[0]}em ${fade(color, 0.3)},`+
          `0 0 0 ${wave[1]}em ${fade(color, 0.3)},`+
          `0 0 0 ${wave[2]}em ${fade(color, 0.3)},`+
          `0 0 0 ${wave[3]}em ${fade(color, 0.3)}`
      },
      "100%": {
        boxShadow:
          `0 0 0 ${wave[1]}em ${fade(color, 0.3)},`+
          `0 0 0 ${wave[2]}em ${fade(color, 0.3)},`+
          `0 0 0 ${wave[3]}em ${fade(color, 0.3)},`+
          `0 0 0 ${wave[4]}em ${fade(color, 0)}`
      }
    }
  }
}

export function ConfettiAnimation(amount: number = 150) {
  /* Generating confetti.

  @param {number} amount - Amount of confetti to generate
  @returns {css} Confetti */
  const colors = ["#d13447", "#ffbf00", "#263672"];
  const confetti: {[key: string]: CSSProperties | CSSAnimation} = {};
  for(let i = 0; i < amount; i++) {
    const w = random(16);
    const l = random(100);
    confetti[`confetti-${i}`] = {
      position: "absolute",
      width: w+4,
      height: w*0.4,
      backgroundColor: colors[random(3)],
      top: "-10%",
      left: `${l}%`,
      opacity: random() + 0.5,
      transform: `rotate(${random()*360}deg)`,
      animation: `$drop-${i} ${4+random()}s ${random()}s infinite`,
    };
    confetti[`@keyframes drop-${i}`] = {
      "100%": {
        top: "110%",
        left: `${l+random(15)}%`,
      },
    }
  }

  return confetti;
}

export const WaveAnimation = {
  "@keyframes wave": {
    from: {
      transform: "rotate(360deg)",
    },
  },
};

export const SpinningAnimation = {
  "@keyframes spin": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
};

export const ExpandAnimation = {
  "@keyframes expand": {
    "0%": {
      top: -14,
    },
    "50%": { 
      top: -10,
    },
    "100%": {
      top: -14,
    },
  },
};

export const ShakeAnimation = {
  "@keyframes shake": {
    "0%": {
      transform: "translate(2px, 1px) rotate(0deg)"
    },
    "10%": {
      transform: "translate(-1px, -2px) rotate(-1deg)"
    },
    "20%": {
      transform: "translate(-3px, 0px) rotate(1deg)"
    },
    "30%": {
      transform: "translate(0px, 2px) rotate(0deg)"
    },
    "40%": {
      transform: "translate(1px, -1px) rotate(1deg)"
    },
    "50%": {
      transform: "translate(-1px, 2px) rotate(-1deg)"
    },
    "60%": {
      transform: "translate(-3px, 1px) rotate(0deg)"
    },
    "70%": {
      transform: "translate(2px, 1px) rotate(-1deg)"
    },
    "80%": {
      transform: "translate(-1px, -1px) rotate(1deg)"
    },
    "90%": {
      transform: "translate(2px, 2px) rotate(0deg)"
    },
    "100%": {
      transform: "translate(1px, -2px) rotate(-1deg)"
    }
  }
}

interface CSSAnimation {
  [key: string]: CSSProperties;
}
