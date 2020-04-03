import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  fetchMessages,
  clearMessages,
  aziztalks,
  deactivateAziz
} from "../redux/actions";
import Chat from "./Chat";
import HelpBot from "./HelpBot";
import { azizmsg } from "../aziz";
class ChannelPage extends Component {
  state = {
    updated: true,
    msg: localStorage.getItem(this.props.match.params.channelID)
      ? localStorage.getItem(this.props.match.params.channelID)
      : ""
  };
  scrollToBottom() {
    var objDiv = document.getElementById("divscroll");
    if (objDiv) {
      objDiv.scrollIntoView();
    }
  }

  setFetchMessagesInterval(channelID) {
    this.props.fetchMessages(channelID, "");
    this.interval = setInterval(() => {
      if (this.props.match.params.channelID !== undefined) {
        const msg = this.props.openedChannel;
        if (msg.length) {
          const lastmsg = msg[msg.length - 1];
          const timestamp = lastmsg.timestamp;
          this.props.fetchMessages(
            this.props.match.params.channelID,
            timestamp
          );
          if (this.props.aziz && !azizmsg.includes(lastmsg.message)) {
            this.props.aziztalks(
              lastmsg.message,
              this.props.match.params.channelID
            );
            this.props.deactivateAziz();
          }
        } else {
          this.props.fetchMessages(this.props.match.params.channelID, "");
        }
      }
    }, 3000);
  }

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    setTimeout(() => this.setState({ updated: false }), 3000);
    this.setFetchMessagesInterval(channelID);
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.setState({ updated: true });
      clearInterval(this.interval);
      this.props.clearMessages();
      this.setFetchMessagesInterval(channelID);
      this.setState({
        msg: localStorage.getItem(channelID)
      });
      setTimeout(() => this.setState({ updated: false }), 3000);
      setTimeout(() => this.scrollToBottom(), 3500);
    }
    if (prevProps.openedChannel !== null) {
      if (prevProps.openedChannel.length !== this.props.openedChannel.length) {
        setTimeout(() => this.scrollToBottom(), 1000);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.clearMessages();
  }

  render() {
    const channel = this.props.channels.find(
      channel => channel.name === this.props.match.params.name
    );
    const owner = channel ? channel.owner : "";
    return (
      <>
        {!this.props.user ? (
          <Redirect to="/login" />
        ) : (
          <>
            <Chat
              owner={owner}
              name={this.props.match.params.name}
              channelID={this.props.match.params.channelID}
              updated={this.state.updated}
              msg={this.state.msg}
            />
            <HelpBot />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user,
  openedChannel: state.channelsState.openedChannel,
  channels: state.channelsState.channels,
  aziz: state.botState.aziz
});

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: (channelID, timestamp) =>
      dispatch(fetchMessages(channelID, timestamp)),
    clearMessages: () => dispatch(clearMessages()),
    aziztalks: (msg, channelID) => dispatch(aziztalks(msg, channelID)),
    deactivateAziz: () => dispatch(deactivateAziz())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
