import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import {IconButton, List, ListSubheader, ListItem,
        ListItemIcon, ListItemText, Drawer} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SearchBar from "./SearchBar";
import useTranslator from "../../hooks/useTranslator";

import pokeball from "../../assets/pokedex.svg";
import tvsm from "../../assets/tvsm.svg";
import customapis from "../../assets/customapis.svg";

const useStyles = makeStyles(theme=> ({
  root: {
    "& .MuiListSubheader-root": {
      fontSize: "1.5em",
      fontWeight: "bold",
    },
    "& .MuiListItem-gutters": {
      paddingRight: 64,
    },
    "& a": {
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
  },
  menuButton: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function MainDrawer({edge}: {edge?: "start" | "end" | false}) {
  const _ = useTranslator();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState(ProjectList);

  function openDrawer() {
    setOpen(true);
  }

  function closeDrawer() {
    setOpen(false);
  }

  function searchProjects({target}: React.ChangeEvent<HTMLInputElement>) {
    const {value} = target;
    if(!value) return setSearch(ProjectList);

    setSearch(ProjectList.filter( project=> project.keywords.some(kw=> kw.includes(value)) ));
  }

  return (
    <>
      <IconButton className={classes.menuButton} edge={edge} onClick={openDrawer}><MenuIcon/></IconButton>
      <Drawer
        className={classes.root}
        open={open}
        onClose={closeDrawer}
      >
        <List component="nav" aria-label={_("Projects Drawer")} subheader={
          <ListSubheader>
            <IconButton size="small" onClick={closeDrawer}>
              <ArrowBackIosIcon/>
            </IconButton>{_("Projects")}
          </ListSubheader>}>
          <SearchBar onInput={searchProjects} autoFocus/>
          {search.map((project, i: number)=> 
            <Project key={`proj:${project.name}#${i}`}
              onClick={closeDrawer}
              image={project.icon}
              alt={`${project.name}`}
              label={project.name}
              path={project.path}/>
          )}
        </List>
      </Drawer>
    </>
  );
}

const ProjectList = [
  {
    name: "Pokedex",
    path: "/pokedex",
    icon: pokeball,
    keywords: ["pokedex", "pokemon", "pikachu", "guide"],
  },
  {
    name: "TVSM",
    path: "/tvsm",
    icon: tvsm,
    keywords: ["tvsm", "television", "show", "series", "manager", "guide"],
  },
  {
    name: "CustomAPIs",
    path: "/customapis",
    icon: customapis,
    keywords: ["customapis", "api", "twitch", "mixer", "streaming", "bot"],
  },
];

function Project({image, alt, label, path, ...props}: ProjectProps) {
  return (
    <Link to={path} {...props}>
      <ListItem button>
        <ListItemIcon>
          <img width={28} src={image} alt={alt}/>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItem>
    </Link>
  );
}

interface ProjectProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  image: string;
  alt: string;
  label: string;
  path: string;
}
