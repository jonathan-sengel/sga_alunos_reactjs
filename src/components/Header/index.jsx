import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";

class Header extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.string,
    onButtonClick: PropTypes.func,
  };

  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="h4">{this.props.children}</Typography>
          </Box>
          <Button variant="contained" onClick={this.props.onButtonClick}>
            {this.props.buttonText}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
