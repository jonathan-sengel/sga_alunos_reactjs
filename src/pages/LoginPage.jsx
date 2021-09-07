import { Typography, Box, Button, TextField } from "@material-ui/core";
import React from "react";
import { UserContext } from "../providers/User";
import { get } from "../services/api";

class LoginPage extends React.Component {
  static contextType = UserContext;

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  onLogin = async (event) => {
    event.preventDefault();
    const { email, pass } = this.state;
    if (this.props.userLogin) {
      const user = await get(`/api/users/${email}/${pass}`);
      this.props.userLogin(user);
      this.props.history.push("/user");
    }
  };

  render() {
    return (
      <form onSubmit={this.onLogin}>
        <Box width="50%" marginX="auto" display="flex" flexDirection="column" gridGap={10}>
          <Box alignSelf="center">
            <img src="/logo.jpg" alt="logo amorinha" width={250} />
          </Box>
          <Typography component="h1" variant="h5" align="center">
            Painel de Acesso
          </Typography>
          <TextField
            type="email"
            name="email"
            id="email"
            variant="outlined"
            label="E-mail"
            autoComplete="off"
            required
            onChange={this.handleChange}
            defaultValue="sandrao@amorinha.com.br"
          />
          <TextField
            type="password"
            name="pass"
            id="pass"
            variant="outlined"
            label="Senha"
            required
            onChange={this.handleChange}
            defaultValue="amorinha123"
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    );
  }
}

export default LoginPage;
