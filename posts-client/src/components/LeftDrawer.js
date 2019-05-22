import React from "react";
import {
  withStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Typography
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import githubLogo from "../misc/github-logo.svg";
import linkedinLogo from "../misc/linkedin-logo.svg";

const styles = theme => ({
  list: {
    width: 220
  },
  header: {
    left: 170
  },
  credit: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  }
});

const LeftDrawer = props => {
  const { classes } = props;

  const info = [
    {
      text: "GitHub",
      link: "http://github.com/peterkrauz/"
    },
    {
      text: "LinkedIn",
      link: "http://linkedin.com/in/peter-krause-2395a5167/"
    }
  ];

  const drawerContent = (
    <div className={classes.list}>
      <List>
        <IconButton
          onClick={() => props.toggleDrawer()}
          className={classes.header}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Divider />
        {info.map(({ text, link }) => (
          <ListItem button key={text} onClick={() => window.open(link)}>
            <ListItemIcon>
              <img
                src={text === "GitHub" ? githubLogo : linkedinLogo}
                alt="icon"
                style={{ height: "20px" }}
              />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <Divider />
        <Typography className={classes.credit} variant="h6" color="inherit">
          {/* Props to the icon's creator, as per request of FlatIcon */}
          <div
            style={{
              fontSize: "10px",
              padding: "10px",
              position: "fixed",
              bottom: "10px"
            }}
          >
            Icons made by{" "}
            <a
              href="https://www.flaticon.com/authors/simpleicon"
              title="SimpleIcon"
            >
              SimpleIcon
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>{" "}
            is licensed by{" "}
            <a
              href="http://creativecommons.org/licenses/by/3.0/"
              title="Creative Commons BY 3.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC 3.0 BY
            </a>
          </div>
        </Typography>
      </List>
    </div>
  );

  return <Drawer open={props.open}>{drawerContent}</Drawer>;
};

export default withStyles(styles)(LeftDrawer);
