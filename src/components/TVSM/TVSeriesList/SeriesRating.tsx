import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import Rating from "@material-ui/lab/Rating";

import useTranslator from "../../../hooks/useTranslator";
import useHighlightChanges from "../hooks/useHighlightChanges";

const useStyles = makeStyles(({palette})=> ({
  rating:{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& div": {
      marginLeft: 6,
    },
  },
}));

export default function SeriesRating({rating}: SeriesRatingProps) {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <div className={`${classes.rating}`}>
      <div style={useHighlightChanges(rating)}>{rating}</div>
      <div>
        {rating !== null
          ? <Rating
              name="read-only"
              value={rating/2}
              size="small"
              precision={0.1}
              readOnly/>
          : _("Not Rated")
        }
      </div>
    </div>
  );
}

interface SeriesRatingProps {
  rating: number|null;
}
