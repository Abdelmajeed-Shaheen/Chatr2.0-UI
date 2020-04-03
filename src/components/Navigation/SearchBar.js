import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { filterChannels } from "../../redux/actions/index";
import { connect } from "react-redux";

class SearchBar extends Component {
  render() {
    return (
      <div className="form-group col-12">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            onChange={event => this.props.filterChannels(event.target.value)}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  botlink: state.botState.channellink
});
const mapDispatchToProps = dispatch => {
  return {
    filterChannels: query => dispatch(filterChannels(query))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
