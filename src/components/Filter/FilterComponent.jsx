import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

class FilterComponent extends React.Component {
  static propyTypes = {
    value: PropTypes.string,
    handleOnFilterChange: PropTypes.func,
  };

  render() {
    return (
      <Box>
        <InputComponent
          type="text"
          name="filter"
          id="filter"
          value={this.props.value}
          placeholderText="Pesquisar..."
          actionOnChange={this.props.handleOnFilterChange}
        />
      </Box>
    );
  }
}

export default FilterComponent;
