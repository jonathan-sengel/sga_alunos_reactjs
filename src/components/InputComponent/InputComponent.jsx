import React from "react";
import PropTypes from "prop-types";

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
  };

  render() {
    const {
      type,
      name,
      id,
      placeholderText,
      labelText,
      actionOnChange,
      maxLength,
      value,
    } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
        <label htmlFor={id}>{labelText}</label>
        <input
          type={type}
          name={name}
          value={value}
          id={id}
          placeholder={placeholderText}
          onChange={actionOnChange}
          maxLength={maxLength}
          autoComplete="off"
          required
        />
      </div>
    );
  }
}

export default InputComponent;
