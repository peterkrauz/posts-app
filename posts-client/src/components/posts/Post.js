import React, { Fragment, Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  withStyles,
  Paper,
  Typography,
  Divider,
  IconButton,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import Comment from "../comments/Comment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const url = "http://localhost:8080/posts/";

const styles = theme => ({
  post: {
    marginTop: "20px",
    width: "450px",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    ...theme.mixins.gutters(),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    borderRadius: "5px 5px 0px 0px"
  },
  title: {
    maxWidth: "450px",
    maxHeight: "200px",
    overflow: "hidden"
  },
  content: {
    maxWidth: "450px",
    maxHeight: "200px",
    overflow: "hidden",
    marginBottom: "15px",
    marginTop: "10px"
  },
  comments: {
    flexDirection: "column",
    padding: "8px 24px 12px"
  },
  expansionPanel: {
    borderRadius: "0px 0px 5px 5px"
  },
  voteCell: {
    display: "flex",
    marginRight: "15px",
    alignItems: "center"
  }
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.post.title,
      content: this.props.post.content,
      upVotes: this.props.post.upVotes,
      downVotes: this.props.post.downVotes,
      isUpVoted: this.props.post.isUpVoted,
      isDownVoted: this.props.post.isDownVoted
    };
  }

  upvote = postId => {
    // TODO
    console.log("up up kkk");
    this.setState(
      this.state.isUpVoted ? { isUpvoted: true } : { isUpvoted: true }
    );
    console.log(this.state);
  };

  downvote = postId => {
    console.log("dawun.");
    axios
      .put(url + postId + "/downVote", {
        isUpVoted: this.state.isUpVoted,
        isDownVoted: this.state.isDownVoted
      })
      .then(() =>
        this.setState(
          this.state.isDownVoted
            ? {
                downVotes: this.state.downVotes - 1,
                wasDownVoted: false
              }
            : {
                downVotes: this.state.downVotes + 1,
                wasDownVoted: true
              }
        )
      )
      .catch(error => console.log(error));
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;

    const comments = this.props.post.comments;
    const postId = this.props.post.id;

    const { upVotes, downVotes, isUpvoted, isDownVoted } = this.state;

    return (
      <Fragment>
        <Paper className={classes.post}>
          <Typography variant="h5" component="h3" className={classes.title}>
            {this.state.title}
          </Typography>
          <Typography component="p" className={classes.content}>
            {this.state.content}
          </Typography>
          <Divider />
          {/* footer */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <div style={{ display: "flex" }}>
                <div className={classes.voteCell}>
                  <Typography
                    variant="h6"
                    component="p"
                    style={{ fontSize: "16px" }}
                  >
                    {upVotes}
                  </Typography>
                  <IconButton onClick={() => this.upvote(postId)}>
                    <ThumbUpIcon
                      style={this.isUpVoted ? { color: "green" } : undefined}
                    />
                  </IconButton>
                </div>
                <div className={classes.voteCell}>
                  <Typography
                    variant="h6"
                    component="p"
                    style={{ fontSize: "16px" }}
                  >
                    {downVotes}
                  </Typography>
                  <IconButton onClick={() => this.downvote(postId)}>
                    <ThumbDownIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
          {/* end of footer */}
        </Paper>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h5"
              component="h3"
              style={{ fontSize: "16px" }}
            >
              Comments
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.comments}>
            {comments.map(comment => (
              <Comment key={comment.id} comment={comment} postId={postId} />
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Fragment>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Post);
