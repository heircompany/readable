import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { VisiblePosts, VisibleCategoryPosts } from './VisiblePosts';
import { PostDetails } from './PostDetails';
import { CreatePostFormDetails } from './CreatePostFormDetails';
import { EditPostFormDetails } from './EditPostFormDetails';
import { fetchAllPosts } from '../actions';
import '.././App.css';

class App extends Component {
  state = {
    shouldFetchPosts: true
  };

  componentDidMount() {
    if (this.state.shouldFetchPosts) {
      this.props.getAllPosts();
      this.setState({
        shouldFetchPosts: false
      });
    }
  }

  render() {
    /*
     * Get the `match` object from Route props (see '../index.js').
     * A `match` object contains information about how a <Route path>
     * matched the URL. `match` objects contain a `params` object property
     * with key/value pairs parsed from the URL corresponding to the dynamic
     * segment of the path.
     */
    const urlParams = this.props.match.params;
    // Get the category value from the params properties.
    const category = urlParams.category;
    /*
     * A `location` object is a <Switch> prop used for matching children
     * elements instead of the current history location.
     * All children of a <Switch> should be <Route> elements.
     * <Route> elements are matched using their pathname prop.
     */
    const path = this.props.location.pathname;

    return (
      <div className="App">
        <div className="App-header">
          <h1>Readable App</h1>
        </div>
        <Switch>
          <Route exact path="/" render={() => <VisiblePosts />} />
          <Route
            exact
            path="/create"
            render={() => <CreatePostFormDetails />}
          />
          <Route
            exact
            path="/edit/:postId?"
            render={() => <EditPostFormDetails path={path} />}
          />
          <Route
            exact
            path="/:category?"
            render={() => <VisibleCategoryPosts selectedCategory={category} />}
          />
          <Route path="/:postId?" render={() => <PostDetails path={path} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = {
  getAllPosts: fetchAllPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
