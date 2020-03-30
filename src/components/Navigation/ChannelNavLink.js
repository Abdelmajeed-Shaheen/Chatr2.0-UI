import React from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const ChannelNavLink = ({ channel }) => (
  <li
    className="nav-item"
    data-toggle="tooltip"
    data-placement="right"
    title={channel.name}
  >
    <NavLink className="nav-link" to={`/channels/${channel.name}`}>
      <img
        src={
          channel.image_url
            ? channel.image_url
            : "https://www.pngfind.com/pngs/m/403-4038340_koren-hosnell-profile-icon-white-png-transparent-png.png"
        }
        className="rounded-circle"
        alt=""
        style={{ height: "30px", width: "30px" }}
      />
      <span className="nav-link-text" style={{ fontSize: "16px" }}>
        {" "}
        {channel.name}
      </span>
    </NavLink>
  </li>
);

export default ChannelNavLink;
