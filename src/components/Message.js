import React from "react";

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
            borderColor: "transparent"
          }}
        >
          <div
            className="card-header"
            style={{
              fontSize: "15px",
              color: "white",
              backgroundColor: "transparent",
              borderBlockColor: "transparent"
            }}
          >
            <b>
              {props.messageObject.username} (
              {props.messageObject.timestamp.substring(11, 16)})
            </b>
          </div>
          <div className="card-body">
            {props.messageObject.message.startsWith("https://") ||
            props.messageObject.message.startsWith("http://") ? (
              <img
                src={props.messageObject.message}
                alt={props.messageObject.message}
                style={{ width: "250px", height: "250px" }}
              />
            ) : (
              <blockquote className="blockquote ">
                <p>{props.messageObject.message}</p>
              </blockquote>
            )}
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
