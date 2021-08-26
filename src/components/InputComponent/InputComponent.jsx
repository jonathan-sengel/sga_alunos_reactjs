import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

class InputComponent extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholderText: PropTypes.string,
    labelText: PropTypes.string,
    actionOnChange: PropTypes.func,
    maxLength: PropTypes.number,
    value: PropTypes.string,
    fullWidth: PropTypes.bool,
  };

  render() {
    const { type, name, id, placeholderText, actionOnChange, maxLength, value } = this.props;
    return (
      <TextField
        type={type}
        name={name}
        value={value}
        id={id}
        label={placeholderText}
        variant="outlined"
        onChange={actionOnChange}
        inputProps={{ maxLength: maxLength }}
        autoComplete="off"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        required
        fullWidth={true}
      />
    );
  }
}

export default InputComponent;
