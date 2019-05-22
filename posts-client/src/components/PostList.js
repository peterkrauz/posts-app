import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withStyles, Zoom } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Post from "./posts/Post";

const url = "http://localhost:8080";

const styles = theme => ({
  container: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center"
  },
  list: {
    padding: "5px"
  },
  progressContainer: {
    display: "flex"
  },
  progress: {
    margin: "0 auto",
    marginTop: "200px"
  }
});

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      posts: []
    };

    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount() {
    this.getPosts();
  }

  getPosts = () => {
    axios
      .get(url + "/posts")
      .then(response => {
        this.setState({ isLoading: false, posts: response });
      })
      .catch(error => console.log(error));
  };

  render() {
    const { classes } = this.props;

    let filteredPosts;

    if (!this.state.isLoading) {
      filteredPosts = this.state.posts.data.filter(({ post }) =>
        post.title.toLowerCase().includes(this.props.searchFilter)
      );
    }

    return this.state.isLoading ? (
      <div className={classes.progressContainer}>
        <CircularProgress className={classes.progress} color="secondary" />
      </div>
    ) : (
      <div className={classes.container}>
        <div className={classes.list}>
          {filteredPosts.map(({ post }) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);
