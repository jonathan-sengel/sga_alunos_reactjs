import React from "react";
import PropTypes from "prop-types";
import { Box, InputLabel, MenuItem, Select } from "@material-ui/core";

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
    const shrinkId = Math.ceil(Math.random() * 1000).toString();
    return (
      <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
        <Box paddingLeft={1.8}>
          <InputLabel shrink id={shrinkId}>
            {labelText}
          </InputLabel>
        </Box>
        <Select
          variant="outlined"
          name={selectName}
          labelId={shrinkId}
          id={selectId}
          value={value}
          displayEmpty
          onChange={actionOnChange}
        >
          {optionsList &&
            optionsList.map(({ key, value }) => {
              return (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              );
            })}
        </Select>
      </div>
    );
  }
}

export default SelectComponent;
