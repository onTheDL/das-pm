import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.common.blue,
    width: "100%",
    height: "18em",
    zIndex: 1302,
    position: "relative",
    [theme.breakpoints.down("md")]: {
      height: "12em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "8em",
    },
  },
  // mainContainer: {
  //   position: "absolute",
  // },
  // link: {
  //   color: "white",
  //   fontFamily: "Arial",
  //   fontSize: "0.75rem",
  //   fontWeight: "bold",
  //   textDecoration: "none",
  // },
  // gridItem: {
  //   margin: "3em",
  // },
  // icon: {
  //   height: "4em",
  //   width: "4em",
  //   [theme.breakpoints.down("xs")]: {
  //     height: "2.5em",
  //     width: "2.5em",
  //   },
  // },
  // socialContainer: {
  //   position: "absolute",
  //   marginTop: "10em",
  //   [theme.breakpoints.down("md")]: {
  //     marginTop: "4em",
  //   },
  //   [theme.breakpoints.down("xs")]: {
  //     marginTop: "2em",
  //     right: "0.6em",
  //   },
  //   right: "1.5em",
  // },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      

    </footer>
  );
}
