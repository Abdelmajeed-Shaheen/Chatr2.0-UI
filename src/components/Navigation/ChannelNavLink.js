import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";

class ChannelNavLink extends Component {
  imageExists(url) {
    var image = new Image();

    image.src = url;

    if (!image.complete) {
      return false;
    } else if (image.height === 0) {
      return false;
    }
    return true;
  }
  render() {
    const channel = this.props.channel;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink
          className="nav-link"
          to={`/channels/${channel.name.replace(/[^a-z0-9 - $ . ^A-Z]/g, "")}/${
            channel.id
          }`}
        >
          <ReactImageFallback
            className="rounded-circle"
            src={channel.image_url}
            style={{ height: "30px", width: "30px" }}
            fallbackImage="https://media.giphy.com/media/ZrlYxeVZ0zqkU/giphy.gif"
            initialImage="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif"
            alt={channel.name}
          />

          <span className="nav-link-text" style={{ fontSize: "16px" }}>
            {" "}
            {channel.name.length > 20
              ? `${channel.name.substring(0, 17)}...`
              : channel.name}
          </span>
        </NavLink>
      </li>
    );
  }
}

export default ChannelNavLink;
