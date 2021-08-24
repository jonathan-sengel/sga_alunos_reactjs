import React from "react";
import PropTypes from "prop-types";

class SelectComponent extends React.Component {
  static propTypes = {
    selectName: PropTypes.string,
    selectId: PropTypes.string,
    optionsList: PropTypes.array,
    value: PropTypes.string,
    actionOnChange: PropTypes.func,
  };

  render() {
    const { selectName, selectId, optionsList, labelText, actionOnChange, value } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
        <label htmlFor={selectId}>{labelText}</label>
        <select name={selectName} id={selectId} value={value} onChange={actionOnChange}>
          {optionsList &&
            optionsList.map(({ key, value }) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              );
            })}
        </select>
      </div>
    );
  }
}

export default SelectComponent;
