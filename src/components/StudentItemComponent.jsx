import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";

class StudentItem extends React.Component {
  static propTypes = {
    studentData: PropTypes.object,
    actionOnEditClick: PropTypes.func,
    actionOnDeleteClick: PropTypes.func,
  };

  deleteConfirm = (event) => {
    console.log(event.target);
    if (window.confirm("Deseja realmente excluir?")) {
      this.props.actionOnDeleteClick(event);
    }
  };

  render() {
    const { studentId, name, birthDate, grade, phone, nameResponsible } = this.props.studentData;
    return (
      <Box marginBottom={2}>
        <Paper elevation={2}>
          <ListItem>
            <Box>
              <ListItemText primary={`Nome: ${name}`} />
              <ListItemText primary={`Nascimento: ${birthDate}`} />
              <ListItemText primary={`Turma: ${grade}`} />
              <ListItemText primary={`Telefone: ${phone}`} />
              <ListItemText primary={`Avisar: ${nameResponsible}`} />
            </Box>
            <ListItemSecondaryAction>
              <Box flexDirection="column">
                <IconButton style={{ padding: 0 }}>
                  <span
                    aria-label="edit"
                    className="material-icon"
                    data-studentid={studentId}
                    onClick={this.props.actionOnEditClick}
                  >
                    edit
                  </span>
                </IconButton>
                <IconButton style={{ padding: 0 }}>
                  <span
                    className="material-icon"
                    aria-label="delete"
                    data-studentid={studentId}
                    onClick={this.deleteConfirm}
                  >
                    delete
                  </span>
                </IconButton>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      </Box>
    );
  }
}

export default StudentItem;
