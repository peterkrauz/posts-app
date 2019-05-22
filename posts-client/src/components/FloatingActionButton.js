import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    background: "blueviolet",
    left: "90vw",
    top: "85vh",
    position: "fixed"
  }
});

const FloatingActionButton = props => {
  const { classes } = props;

  return (
    <div>
      <Fab color="secondary" className={classes.fab} position="absolute">
        <AddIcon />
      </Fab>
    </div>
  );
};

FloatingActionButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingActionButton);
