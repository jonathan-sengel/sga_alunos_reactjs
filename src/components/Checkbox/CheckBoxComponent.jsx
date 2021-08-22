import React from "react";
import PropTypes from "prop-types";

class CheckBoxComponent extends React.Component {
  static propTypes = {
    checkName: PropTypes.string,
    checkId: PropTypes.string,
    labelDescription: PropTypes.string,
    children: PropTypes.element,
    actionOnChange: PropTypes.func,
    checked: PropTypes.bool,
  };

  render() {
    const {
      checkName,
      checkId,
      labelDescription,
      children,
      actionOnChange,
      checked,
    } = this.props;
    return (
      <div className="checkContainer">
        <div style={{ display: "flex", gap: "2px", alignItems: "center" }}>
          <input
            type="checkbox"
            name={checkName}
            id={checkId}
            checked={checked}
            onChange={actionOnChange}
          />
          <label htmlFor={checkId}>{labelDescription}</label>
        </div>
        {children}
      </div>
    );
  }
}

export default CheckBoxComponent;
