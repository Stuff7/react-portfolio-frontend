import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CSSTransition} from "react-transition-group";

import useTranslator from "../../../hooks/useTranslator";

import {HTMLDivProps} from "../../types";
import {HighlightTransition, getTransition} from "../../../utils/transitions";

function useStyles(status: string) {
  const statusColor = StatusColor[status];

  return makeStyles(({palette})=> ({
    series: {
      border: "2px solid",
      borderColor: statusColor,
      borderRadius: 8,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      margin: "8px 4px",
      transition: "margin 0.3s",
      "&:hover": {
        margin: "8px 0",
      },
    },
    title: {
      position: "relative",
      top: 0,
      left: 0,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      padding: "16px 4px 4px 4px",
      borderRadius: "4px 4px 0 0",
      width: "100%",
      color: "#ffffff",
      backgroundColor: statusColor,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      padding: "2px 16px",
    },
    position: {
      position: "absolute",
      top: 0,
      left: 8,
      fontSize: 12,
    },
    status: {
      position: "absolute",
      top: 0,
      right: 8,
      fontSize: 12,
    },
    moreInfo: {
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 4,
      fontSize: 16,
      fontWeight: "bold",
      backgroundColor: statusColor,
      color: "#ffffff"
    },
    ...HighlightTransition("#ff6000", statusColor),
  }))();
}

export default function Series({status, name, position, lastUpdated, children, onClick, ...props}: SeriesProps) {
  const _ = useTranslator();
  const classes = useStyles(status);
  const [updated, setUpdated] = React.useState(false);

  React.useEffect(()=> {
    setUpdated(true);
  }, [lastUpdated]);

  function finishUpdate() {
    setUpdated(false);
  }

  return (
    <div className={classes.series}>
      <CSSTransition
        in={updated}
        timeout={3e3}
        classNames={getTransition(classes, "highlight")}
        onEntered={finishUpdate}>
        <div className={classes.title}>
          <span className={classes.position}>#{position}</span>
          <span>{name}</span>
          <span className={classes.status}>{_(status)}</span>
        </div>
      </CSSTransition>
      <div className={classes.content}>
        {children}
      </div>
      <div className={classes.moreInfo} onClick={onClick}>
        <span>{_("More Info")}</span>
      </div>
    </div>
  );
}

const StatusColor: {[key: string]: string} = {
  "Running": "#556b2f",
  "Ended": "#dc143c",
  "To Be Determined": "#626262",
  "In Development": "#4769a6",
};

interface SeriesProps extends HTMLDivProps {
  status: string;
  name: string;
  position: number;
  lastUpdated: Date;
}
