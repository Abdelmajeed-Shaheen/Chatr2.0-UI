import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchMessages } from "../redux/actions";
import Chat from "./Chat";

class ChannelPage extends Component {
  scrollToBottom() {
    var objDiv = document.getElementById("divscroll");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  setFetchMessagesInterval(channelID) {
    this.props.fetchMessages(channelID);
    this.interval = setInterval(() => {
      if (this.props.match.params.channelID !== undefined)
        this.props.fetchMessages(this.props.match.params.channelID);
    }, 3000);
  }

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    this.setFetchMessagesInterval(channelID);
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.openedChannel !== null) {
      if (prevProps.openedChannel.length !== this.props.openedChannel.length) {
        setTimeout(() => this.scrollToBottom(), 1000);
      }
    }
    if (prevProps.match.params.channelID !== channelID) {
      clearInterval(this.interval);
      this.setFetchMessagesInterval(channelID);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
          <Chat
            owner={owner}
            name={this.props.match.params.name}
            channelID={this.props.match.params.channelID}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user,
  openedChannel: state.channelsState.openedChannel,
  channels: state.channelsState.channels,
  channelid: state.channelsState.channelid
});

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID => dispatch(fetchMessages(channelID))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
