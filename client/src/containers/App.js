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
    const { category } = this.props.match.params.category;
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
