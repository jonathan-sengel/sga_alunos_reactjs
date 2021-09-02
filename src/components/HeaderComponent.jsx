import React from "react";
import PropTypes from "prop-types";
import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

class HeaderComponent extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.string,
    to: PropTypes.string,
    onButtonClick: PropTypes.func,
  };

  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Box flexGrow={1}>
            <Typography variant="h4">{this.props.children}</Typography>
          </Box>
          <Link to={this.props.to}>
            <Button variant="contained">{this.props.buttonText}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default HeaderComponent;
