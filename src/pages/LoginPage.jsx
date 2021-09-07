import { Typography, Box, Button, TextField, CardMedia } from "@material-ui/core";
import React from "react";

class LoginPage extends React.Component {
  render() {
    return (
      <Box width="50%" marginX="auto" display="flex" flexDirection="column" gridGap={10}>
        <Box alignSelf="center">
          <img src="/logo.jpg" alt="logo amorinha" width={250} />
        </Box>
        <Typography component="h1" variant="h5" align="center">
          Painel de Acesso
        </Typography>
        <TextField
          name="login"
          id="login"
          variant="outlined"
          label="E-mail"
          autoComplete="off"
          required
        />
        <TextField
          type="password"
          name="password"
          id="password"
          variant="outlined"
          label="Senha"
          required
        />
        <Button variant="contained" color="primary">
          Login
        </Button>
      </Box>
    );
  }
}

export default LoginPage;
