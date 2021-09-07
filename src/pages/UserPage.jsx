import { Typography, Box, Button, TextField, Select, InputLabel } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/User";

class UserPage extends React.Component {
  static contextType = UserContext;
  render() {
    return (
      <UserContext.Consumer>
        {(user) => (
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
              value={user.name}
              inputProps={{ readOnly: true }}
            />
            <TextField
              type="email"
              name="email"
              id="email"
              variant="outlined"
              label="Email"
              value={user.email}
              inputProps={{ readOnly: true }}
            />
            <TextField
              name="position"
              id="position"
              variant="outlined"
              label="Cargo"
              value={user.position}
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
                {user.grades.map((grade, index) => (
                  <option key={index} value={index}>
                    {grade}
                  </option>
                ))}
              </Select>
            </Box>

            <Link to="/home">
              <Button variant="contained" color="primary">
                Home
              </Button>
            </Link>
          </Box>
        )}
      </UserContext.Consumer>
    );
  }
}

export default UserPage;
