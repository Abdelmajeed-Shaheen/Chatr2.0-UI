import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        backgroundColor: "#546e7a",
        height: "100vh",
        paddingLeft: "10em",
        paddingBottom: "1em"
      }}
    >
      <div style={{ paddingTop: "45vh", paddingLeft: "35%" }}>
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
