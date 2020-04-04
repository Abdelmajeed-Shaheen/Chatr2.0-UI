import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import LoginForm from "./components/LoginForm";
import AddChannel from "./components/AddChannel";
import ChannelPage from "./components/ChannelPage";
import HelpBot from "./components/HelpBot";

class App extends Component {
  componentDidMount() {
    main();
  }
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={RegistrationForm} />
          <Route path="/private" component={SuperSecretPage} />
          <Route path="/create/channel" component={AddChannel} />
          <Route path="/channels/:name/:channelID" component={ChannelPage} />
          <Redirect to="/welcome" />
        </Switch>
        {this.props.user && <HelpBot />}

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user
});

export default connect(mapStateToProps)(App);
