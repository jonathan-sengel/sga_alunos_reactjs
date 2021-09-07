import { Typography, Box, Button, TextField, Select, InputLabel } from "@material-ui/core";
import React from "react";

class UserPage extends React.Component {
  render() {
    return (
      <Box width="50%" marginX="auto" display="flex" flexDirection="column" gridGap={10}>
        <Typography component="h1" variant="h5" align="center">
          Informações do Usuário
        </Typography>
        <TextField
          name="name"
          id="name"
          variant="outlined"
          label="Nome"
          autoComplete="off"
          defaultValue="José Antônio"
          inputProps={{ readOnly: true }}
        />
        <TextField
          type="email"
          name="email"
          id="email"
          variant="outlined"
          label="Email"
          defaultValue="abc@teste.com"
          inputProps={{ readOnly: true }}
        />
        <TextField
          name="position"
          id="position"
          variant="outlined"
          label="Cargo"
          defaultValue="Coordernador"
          inputProps={{ readOnly: true }}
        />
        <Box>
          <Box paddingLeft={1.8}>
            <InputLabel shrink id="ois">
              Turmas
            </InputLabel>
          </Box>
          <Select
            multiple
            native
            variant="outlined"
            labelId="ois"
            displayEmpty
            inputProps={{ readOnly: true }}
            fullWidth
          >
            <option>Oi</option>
            <option>Tchau</option>
            <option>Obrigado</option>
          </Select>
        </Box>

        <Button variant="contained" color="primary">
          Login
        </Button>
      </Box>
    );
  }
}

export default UserPage;
