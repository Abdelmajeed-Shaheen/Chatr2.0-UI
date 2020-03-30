import React from "react";

/**
 * This component shows a single message
 * so why is it called `MessageS` (plural) ?
 */

const Message = props => {
  return (
    <li>
      <div className="card mt-2" style={{ width: "400px" }}>
        <div className="card-header text-danger">
          {props.messageObject.username}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{props.messageObject.message}</p>
          </blockquote>
        </div>
      </div>
    </li>
  );
};
export default Message;
