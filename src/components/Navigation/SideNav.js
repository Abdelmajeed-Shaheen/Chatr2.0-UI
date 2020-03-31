import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faSignInAlt,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import SearchBar from "./SearchBar";

class SideNav extends React.Component {
  state = { collapsed: false };

  render() {
    const channelLinks = this.props.filteredChannels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          {this.props.user ? (
            <>
              <li
                className="nav-item"
                data-toggle="tooltip"
                data-placement="right"
              >
                <Link className="nav-link heading" to="/create/channel">
                  <span className="nav-link-text mr-2">Channels</span>
                  <FontAwesomeIcon icon={faPlusCircle} />
                </Link>
                {!this.state.collapsed && (
                  <SearchBar onChange={this.filterChannels} />
                )}
              </li>
              <>{channelLinks}</>
            </>
          ) : (
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
            >
              <Link to="/login" className="nav-link">
                <span className="nav-link-text mr-2">Login</span>
                <FontAwesomeIcon icon={faSignInAlt} />
              </Link>
            </li>
          )}
        </ul>
        <ul
          className="navbar-nav sidenav-toggler"
          style={{ backgroundColor: "#1c2331" }}
        >
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user,
  channels: state.channelsState.channels,
  filteredChannels: state.channelsState.filteredChannels
});

export default connect(mapStateToProps)(SideNav);
