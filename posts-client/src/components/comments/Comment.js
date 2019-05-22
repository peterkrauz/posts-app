import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles, Typography, IconButton, Divider } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const url = "http://localhost:8080/posts/";
// {postId}/comments/{commentId}/like"

const styles = theme => ({
  comment: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  likesWrapper: {
    display: "flex",
    alignItems: "center"
  }
});

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentId: this.props.comment.id,
      content: this.props.comment.content,
      likes: this.props.comment.likes,
      wasLiked: this.props.comment.wasLiked
    };
  }

  handleLike = (postId, commentId) => {
    if (this.state.wasLiked) {
      this.unlikeComment(postId, commentId);
    } else {
      this.likeComment(postId, commentId);
    }
  };

  likeComment = (postId, commentId) => {
    axios
      .put(url + postId + "/comments/" + commentId + "/like", {
        wasLiked: this.state.wasLiked
      })
      .then(
        this.setState({
          likes: this.state.likes + 1,
          wasLiked: true
        })
      )
      .catch(error => console.log(error));
  };

  unlikeComment = (postId, commentId) => {
    axios
      .put(url + postId + "/comments/" + commentId + "/like", {
        wasLiked: this.state.wasLiked
      })
      .then(
        this.setState({
          likes: this.state.likes - 1,
          wasLiked: false
        })
      )
      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;

    const { commentId, content, likes } = this.state;

    const { postId } = this.props;

    return (
      <div>
        <Divider />
        <div className={classes.comment}>
          <Typography>{content}</Typography>
          <div className={classes.likesWrapper}>
            <Typography
              variant="h6"
              component="p"
              style={
                this.state.wasLiked
                  ? { fontSize: "13px", color: "blue" }
                  : { fontSize: "13px" }
              }
            >
              {likes}
            </Typography>
            <IconButton
              onClick={() => this.handleLike(postId, commentId)}
              style={this.state.wasLiked ? { color: "blue" } : undefined}
            >
              <ThumbUpIcon />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comment);
