import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import PropTypes from "prop-types";

class FilterComponent extends React.Component {
  static propyTypes = {
    handleOnChange: PropTypes.func,
  };

  render() {
    return (
      <div
        className="divContainer"
        style={{ padding: "0 20px", color: "#E5E5E5", marginTop: "10px" }}
      >
        <InputComponent
          type="text"
          name="filter"
          id="filter"
          placeholderText="Pesquisar..."
          actionOnChange={this.props.handleOnChange}
        />
      </div>
    );
  }
}

export default FilterComponent;
