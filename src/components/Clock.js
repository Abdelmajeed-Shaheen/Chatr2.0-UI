import React, { Component } from "react";

class Clock extends Component {
  state = {
    timeanddate: new Date()
  };

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.setState({ timeanddate: new Date() }),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  render() {
    const date = this.state.timeanddate.toLocaleDateString();
    const time = this.state.timeanddate.toLocaleTimeString();
    return (
      <div className="text-center ml-5">
        <div className="row mt-5">
          <h1
            style={{
              fontFamily: "Calligraffitti",
              fontSize: "70px",
              color: "#1a237e  ",
              fontWeight: "1000"
            }}
          >
            <b>Date: {date}</b>
          </h1>
        </div>
        <div className="row">
          <h1
            style={{
              fontFamily: "Calligraffitti",
              fontSize: "70px",
              color: "#1a237e  ",
              fontWeight: "1000"
            }}
          >
            <b>Time: {time}</b>
          </h1>
        </div>
      </div>
    );
  }
}

export default Clock;
