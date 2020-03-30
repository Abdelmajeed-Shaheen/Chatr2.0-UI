import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

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

class App extends Component {
  componentDidMount() {
    main();
  }
  // commented by tala test1 <--- don't leave "dead" comments in master
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={RegistrationForm} />

          {/* You can get rid of this. It was just there
           * to test your login. You should be redirecting the user
           * somewhere more useful. First channel in the list? */}
          <Route path="/private" component={SuperSecretPage} />

          <Route path="/create/channel" component={AddChannel} />

          {/* NO CHEATING - change this back to a channel name - better UX */}
          <Route path="/channels/:name/:channelID" component={ChannelPage} />

          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
