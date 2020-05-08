import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {Link} from "react-router-dom";
import {IconButton} from "@material-ui/core";

import {useSelector} from "react-redux";
import {State} from "../../../state/types";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles(theme=> ({
  pages: {
    width: "100%",
    marginTop: 16,
    "& > div": {
      display: "inline-block",
    },
    "& a": {
      color: theme.palette.text.primary,
      textDecoration: "none",
    },
  },
  right: {
    "&, & .MuiButtonBase-root": {
      float: "right"
    }
  },
  name: {
    textTransform: "capitalize",
  },
}));

export default function PageControls({currentPage}: PageControlsProps) {
  const classes = useStyles();
  const [prev, next] = useSelector(({pokemon}: State)=> [pokemon[currentPage-1], pokemon[currentPage+1]]);

  return (
    <div className={classes.pages}>
      {prev &&
        <div>
          <Link to={prev.path}>
            <IconButton><ArrowBackIosIcon/></IconButton>
          </Link>
          <div className={classes.name}>{prev.name}#{prev.strID}</div>
        </div>
      }
      {next &&
        <div className={classes.right}>
          <Link to={next.path}>
            <IconButton><ArrowForwardIosIcon/></IconButton>
          </Link>
          <div className={classes.name}>{next.name}#{next.strID}</div>
        </div>
      }
    </div>
  );
}

interface PageControlsProps {
  currentPage: number;
}
