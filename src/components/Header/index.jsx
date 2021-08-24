import React from "react";
import PropTypes from "prop-types";

class Header extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.string,
    onButtonClick: PropTypes.func,
  };

  render() {
    return (
      <div
        style={{
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>{this.props.children}</h1>
        <button style={{ padding: "5px" }} onClick={this.props.onButtonClick}>
          {this.props.buttonText}
        </button>
      </div>
    );
  }
}

export default Header;
