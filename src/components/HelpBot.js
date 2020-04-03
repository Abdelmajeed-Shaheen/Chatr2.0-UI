import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { activateAziz, deactivateAziz, filterChannels } from "../redux/actions";
const config = {
  width: "300px",
  height: "400px",
  floating: true
};
// all available props
const theme = {
  background: "#f5f8fb",
  fontFamily: "Comic Sans MS",
  headerBgColor: "#1a237e",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#1a237e",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a"
};

class HelpBot extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          {...config}
          headerTitle="Bot سواليف"
          steps={[
            {
              id: "1",
              message: `Hi ${this.props.user.username} , How can i help you`,
              trigger: "2"
            },
            {
              id: "2",
              options: [
                { value: 1, label: "Add Channel", trigger: "3" },
                { value: 2, label: "Find Channel", trigger: "findchannel" },
                {
                  value: 3,
                  label: "Activate Aziz Bot",
                  trigger: "startAzizrequest"
                },
                { value: 4, label: "Add Notes", trigger: "profile" },
                { value: 5, label: "Thank you ", trigger: "end" }
              ]
            },
            {
              id: "3",
              component: <Link to="/create/channel">Add Channel</Link>,
              trigger: "2"
            },
            {
              id: "findchannel",
              user: true,
              validator: value => {
                const channel = this.props.channels.find(
                  channel => channel.name.toLowerCase() === value
                );
                if (channel) {
                  const name = channel.name.replace(
                    /[^a-z0-9 - $ . ^A-Z]/g,
                    ""
                  );
                  this.props.filterChannels(name);
                  return true;
                }
                return "channel not found";
              },
              trigger: "channel"
            },
            {
              id: "channel",
              message: `${this.props.user.username} look at the left`,
              trigger: "2"
            },
            {
              id: "startAzizrequest",
              message: "Please Enter 'start aziz'",
              trigger: "typeaziz"
            },
            {
              id: "typeaziz",
              user: true,
              validator: value => {
                if (
                  value === "start aziz" &&
                  this.props.openedChannel.length > 0
                ) {
                  this.props.activateAziz();
                  return true;
                }
                if (value === "start aziz") {
                  return "Please go into a channel";
                }
                return "Please Enter 'start aziz'";
              },
              trigger: "startAziz"
            },
            {
              id: "startAziz",
              message: "Aziz Bot Activated",
              trigger: "endAziz"
            },
            {
              id: "endAziz",
              options: [
                {
                  value: 1,
                  label: "Deactivate Aziz Bot",
                  trigger: "stopAzizrequest"
                }
              ]
            },
            {
              id: "stopAzizrequest",
              message: "Please Enter 'stop aziz'",
              trigger: "typestopaziz"
            },
            {
              id: "typestopaziz",
              user: true,
              validator: value => {
                if (value === "stop aziz") {
                  this.props.deactivateAziz();
                  return true;
                }
                return "Please Enter 'stop aziz'";
              },
              trigger: "stopAziz"
            },
            {
              id: "stopAziz",
              message: "Aziz Bot Deactivated",
              trigger: "2"
            },
            {
              id: "profile",
              component: <Link to="/private">Add Notes</Link>,
              trigger: "2"
            },
            {
              id: "end",
              message: `Your welcome, ${this.props.user.username}`,
              trigger: "refresh"
            },
            {
              id: "refresh",
              message: `Refresh the page and you will find me again 😀`,
              end: true
            }
          ]}
        />
      </ThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userState.user,
  channels: state.channelsState.channels,
  openedChannel: state.channelsState.openedChannel
});

const mapDispatchToProps = dispatch => {
  return {
    activateAziz: () => dispatch(activateAziz()),
    deactivateAziz: () => dispatch(deactivateAziz()),
    filterChannels: query => dispatch(filterChannels(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpBot);
