import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

/**
 * The list management (fetch, add, delete) should be in redux
 */
class Notes extends Component {
  state = {
    itemName: "",
    list: JSON.parse(localStorage.getItem("list"))
      ? JSON.parse(localStorage.getItem("list"))
      : []
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.itemName) {
      const newList = [this.state.itemName, ...this.state.list];
      localStorage.setItem("list", JSON.stringify(newList));
      this.setState({ itemName: "", list: newList });
    }
  };

  deleteItem = name => {
    const deleteItemList = this.state.list.filter(item => item !== name);
    localStorage.setItem("list", JSON.stringify(deleteItemList));
    this.setState({ list: deleteItemList });
  };

  render() {
    const items = this.state.list.map(item => (
      <li
        className="list-group-item d-flex justify-content-between align-items-center mb-2"
        style={{
          borderRadius: "50px",
          height: "40px",
          fontFamily: "Calligraffitti",
          color: "#1a237e  "
        }}
      >
        <b>{item}</b>
        <span class="badge ">
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#1a237e" }}
            onClick={() => this.deleteItem(item)}
          />
        </span>
      </li>
    ));
    return (
      <>
        <div className="ml-5 pl-5 pr-5">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className=" form-control"
                placeholder="Add Note"
                value={this.state.itemName}
                onChange={event =>
                  this.setState({ itemName: event.target.value })
                }
                style={{
                  borderTopLeftRadius: "25px",
                  borderBottomLeftRadius: "25px"
                }}
              />
              <div className="input-group-prepend">
                <button
                  className=" input-group-text text-black"
                  id="basic-addon1"
                  style={{
                    borderTopRightRadius: "25px",
                    borderBottomRightRadius: "25px",
                    backgroundColor: "rgba(26, 35, 126)"
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ color: "white" }}
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          style={{
            overflowY: "auto",
            height: "300px",
            backgroundColor: "rgba(26, 35, 126,0.5)",
            borderRadius: "40px"
          }}
          className="mt-2 ml-5"
        >
          <ul className="list-group mx-3 mt-2 pl-3 pr-3">{items}</ul>
        </div>
      </>
    );
  }
}

export default Notes;
