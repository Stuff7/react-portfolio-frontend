import {CSSProperties} from "react";

export function getTransition(classes: {[key: string]: string}, transition: string) {
  return {
    appear: classes[transition+"Appear"],
    appearActive: classes[transition+"AppearActive"],
    appearDone: classes[transition+"AppearDone"],
    enter: classes[transition+"Enter"],
    enterActive: classes[transition+"EnterActive"],
    enterDone: classes[transition+"EnterDone"],
    exit: classes[transition+"Exit"],
    exitActive: classes[transition+"ExitActive"],
    exitDone: classes[transition+"ExitDone"],
  }
}

export function HighlightTransition(highlight: string, color: string) {
  /* Highlighting element.

  @param {string} highlight - Highlight color
  @param {string} color - Non-highlight color

  @returns {CSSTransitionGroup} CSS transition classes */
  return {
    highlightEnter: {
      backgroundColor: highlight,
    },
    highlightEnterActive: {
      backgroundColor: color,
      transition: "background-color 3s",
    },
  } as CSSTransitionGroup;
}

export const FadeTransition: CSSTransitionGroup = {
  fadeEnter: {
    opacity: 0,
  },
  fadeEnterActive: {
    opacity: 1,
    transition: "opacity 300ms",
  },
  fadeExit: {
    opacity: 1,
    transition: "opacity 300ms",
  },
  fadeExitActive: {
    opacity: 0,
  },
};

export const SlideTransition: CSSTransitionGroup = {
  slideEnter: {
    maxHeight: 0,
  },
  slideEnterActive: {
    maxHeight: "100%",
    overflow: "hidden",
    transition: "max-height .7s",
  },
  slideExit: {
    top: 0,
    position: "absolute",
    transition: "top .7s",
  },
  slideExitActive: {
    top: -100,
  },
  slideExitDone: {
    top: -100,
    position: "absolute",
    transition: "top .7s",
  }
};

interface CSSTransitionGroup {
  [key: string]: CSSProperties
}
