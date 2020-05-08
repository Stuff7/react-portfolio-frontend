import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Typography, Card, CardContent, CardActionArea, CardMedia} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    "& .MuiIconButton-root": {
      float: "right"
    }
  },
  media: {
    height: 140,
  },
  link: {
    textDecoration: "none",
    margin: 8,
  }
});

export default function Project({name, description, image, path}: ProjectProps) {
  const classes = useStyles();

  return (
    <Link to={path} className={classes.link}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={`${name} Project`}
            height="140"
            image={image}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

interface ProjectProps {
  name?: string;
  description?: string;
  image?: string;
  path: string;
}
