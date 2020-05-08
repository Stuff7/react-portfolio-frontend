import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import {IconButton, IconButtonProps} from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

import useTranslator from "../../hooks/useTranslator";

import SimpleDialog from "../SimpleDialog";

const useStyles = makeStyles(({palette})=> ({
  root: {
    fontFamily: "Fira Code, consolas",
  },
  bold: {
    fontWeight: "bold",
  },
  paragraph: {
    marginBottom: "1em",
    width: "100%",
  },
}))

export default function HelpDialog() {
  const _ = useTranslator();
  const classes = useStyles();

  return (
    <SimpleDialog className={classes.root} Button={HelpButton}>
      <h1>{_("CUSTOM TIME RESPONSES")}</h1>
      <div className={classes.paragraph}>
        {_("There's an special syntax that is used to allow for a ")}
        {_("more dynamic way to format the time elapsed when using ")}
        {_("custom messages, here's a guide on how to use it")}:
      </div>

      <div className={classes.paragraph}>
        {_("General use variables: ")}<br/><br/>
        <span className={classes.bold}>
          {"{follower}"}: </span>{_("The follower's username (if any)")}<br/>
        <span className={classes.bold}>
          {"{channel}"}: </span>{_("The channel's name")}<br/>
        <span className={classes.bold}>
          {"{date}"}: </span>{_("The formatted date (when applicable)")}<br/>
        <span className={classes.bold}>
          {"{keyword}"}: </span>{_("User input (when nothing was found)")}
      </div>

      <div className={classes.paragraph}>
        <span>
          {_("Time variables tell you the time passed. Can be any of ")}
          {timeUnits.map((unit: string, i: number)=>
            <span key={unit}>
              <span className={classes.bold}>
                {`{${unit}}`}
              </span>
              {i !== timeUnits.length-1 && (i < timeUnits.length-2? ", " : _(" and "))}
            </span>
          )}
        </span>
      </div>

      <div className={classes.paragraph}>
        <span>
          {_("When dealing with plural words you can simply ")}
          {_("use the time variable as a function like this")}:
          <p className={classes.bold}>
            {` {days(${_("singularWord")}, ${_("pluralWord")}}`}
          </p>
          {_("In the example if the")}
          <span className={classes.bold}> {"{days}"} </span> 
          {_("variable is equal to")}
          <span className={classes.bold}> 1 </span> 
          {_("it will show the ")}
          <span className={classes.bold}> {_("singularWord")}</span>,
          {_(" otherwise it will show the ")}
          <span className={classes.bold}> {_("pluralWord")}</span>. 
          {_(" The same applies for the other time variables.")}
        </span>
      </div>

      <div className={classes.paragraph}>
        {_("Anything like")}
        <span className={classes.bold}> {`<${_("this")}>`} </span>{_("or")}
        <span className={classes.bold}> [{_("this")}] </span>{_("is called a block.")}
      </div>

      <div className={classes.paragraph}>
        <span>
          {_("A block like this:")}
          <span className={classes.bold}>
            {` <{days} ${_("passed")}> `}
          </span>{_("will only be shown if the variable used inside is greater than")}
          <span className={classes.bold}> 0</span>.
        </span>
      </div>

      <div className={classes.paragraph}>
        <span>
          {_("Meanwhile a block like this")}
          <span className={classes.bold}>
            {` [{hours} ${_("live")}] `}
          </span>{_("will always be shown.")}
        </span>
      </div>

      <div className={classes.paragraph}>
        {_("Anything between")}
        <span className={classes.bold}> 2 </span> 
        {_("blocks will only be shown if there's a visible block already placed.")}
      </div>

      <div className={classes.paragraph}>
        {_("Now with everything you've learned, ")}
        {_("this simple example should make a lot of sense! Right?")}
      </div>

      <div className={classes.paragraph}>
        <span className={classes.bold}>
          {"{follower} "}
        </span>
        {_("has been following")}
        <span className={classes.bold}>
          {" {channel} "}
        </span>
        {_("for")}
        <span className={classes.bold}>
          {` <{years} ${_("year")}{years(s)}>, <{months} ${_("month")}{months(${_("s")})}>, <{days} ${_("day")}{days(s)}>, <{hours} ${_("hour")}{hours(s)}>, <{minutes} ${_("minute")}{minutes(s)}>, <{seconds} ${_("second")}{seconds(s)}>${_(" and ")}<{microseconds}μs>.`}
        </span>
      </div>
      <div className={classes.paragraph}>
        {_("Which could compile into something like this:")}
      </div>
      <div className={classes.paragraph}>
        {_("AwesomeFollower has been following NeatChannel for 5 years, 4 months, 3 days, 2 hours, 1 minute, 1 second and 12345μs.")}
      </div>
    </SimpleDialog>
  );
}

function HelpButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <HelpIcon/>
    </IconButton>
  )
}


const timeUnits = [
  "years",
  "months",
  "days",
  "hours",
  "minutes",
  "seconds",
  "microseconds"
];
