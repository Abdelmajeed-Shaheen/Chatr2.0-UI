import React from "react";

/**
 * This component shows a single message
 * so why is it called `MessageS` (plural) ?
 */

const Message = props => {
  return (
    <li>
      <div
        className={
          props.user !== props.messageObject.username
            ? "speech-bubble-ds"
            : "speech-bubble-ds-owner"
        }
      >
        <div
          className="card"
          style={{
            backgroundColor: "transparent",
            borderBlockColor: "transparent"
          }}
        >
          <div
            className="card-header"
            style={{ fontSize: "15px", color: "white" }}
          >
            <b>{props.messageObject.username}</b>
          </div>
          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>{props.messageObject.message}</p>
            </blockquote>
          </div>
          <div
            className={
              props.user !== props.messageObject.username
                ? "speech-bubble-ds-arrow"
                : "speech-bubble-ds-arrow-owner"
            }
          ></div>
        </div>
      </div>
    </li>
  );
};
export default Message;
