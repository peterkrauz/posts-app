import React, { Component } from "react";
import LeftDrawer from "../components/LeftDrawer";
import SearchBar from "../components/SearchBar";
import PostList from "../components/PostList";
import FloatingActionButton from "../components/FloatingActionButton";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      searchFilter: ""
    };

    this.filterPosts = this.filterPosts.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  filterPosts(event) {
    let filterString;
    if (event.target.value !== "") {
      filterString = event.target.value;
    } else {
      filterString = "";
    }
    this.setState({
      searchFilter: filterString
    });
  }

  toggleDrawer() {
    this.setState({
      showDrawer: !this.state.showDrawer
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          toggleDrawer={this.toggleDrawer}
          filterPosts={this.filterPosts}
        />
        <LeftDrawer
          open={this.state.showDrawer}
          toggleDrawer={this.toggleDrawer}
        />
        <PostList searchFilter={this.state.searchFilter} />
        <FloatingActionButton />
      </div>
    );
  }
}

export default App;
