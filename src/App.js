import React, { Component } from "react";
import Header from "./components/Header/Header";
import BurgerBuilder from "./containers/BurgerBuilder";
import HeroPage from "./components/HeroPage/HeroPage";
import { Switch, Route, withRouter } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <main>
        {this.props.location.pathname !== "/" ? <Header /> : ""}
        <Switch>
          <Route path="/" exact component={HeroPage} />
          <Route path="/builder" component={BurgerBuilder} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
