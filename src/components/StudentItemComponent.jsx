import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

class StudentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dialogIsOpen: false };
  }
  static propTypes = {
    studentData: PropTypes.object,
    actionOnEditClick: PropTypes.func,
    actionOnDeleteClick: PropTypes.func,
  };

  openDialog = () => {
    this.setState({ dialogIsOpen: true });
  };
  closeDialog = () => {
    this.setState({ dialogIsOpen: false });
  };

  render() {
    const { studentId, name, birthDate, grade, phone, nameResponsible } = this.props.studentData;
    const { actionOnEditClick, actionOnDeleteClick } = this.props;
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
                <IconButton aria-label="edit">
                  <span
                    className="material-icon"
                    data-studentid={studentId}
                    onClick={actionOnEditClick}
                  >
                    edit
                  </span>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  data-studentid={studentId}
                  onClick={this.openDialog}
                >
                  <span className="material-icon">delete</span>
                </IconButton>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
        <Dialog
          open={this.state.dialogIsOpen}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Exclusão de cadastro"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você realmente deseja remover este cadastro?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Não
            </Button>
            <Button onClick={actionOnDeleteClick} color="primary" autoFocus>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default StudentItem;
