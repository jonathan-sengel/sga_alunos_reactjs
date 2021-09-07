import React from "react";
import { HeaderComponent } from "../components";
import { Paper, ListItem, Box, ListItemText, LinearProgress } from "@material-ui/core";
import { apiGet } from "../services/api";

class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    const data = await apiGet(`/api/student/${id}`);
    this.setState({ student: data, isLoading: false });
  }

  render() {
    return (
      <>
        {this.state.isLoading && <LinearProgress />}
        {!this.state.isLoading && (
          <>
            <HeaderComponent buttonText={"Inicio"} to="/">
              Detallhamento de Aluno
            </HeaderComponent>
            <Box marginTop={2}>
              <Paper elevation={2}>
                <ListItem dense style={{ alignItems: "flex-start" }}>
                  <Box flexBasis="40%">
                    <ListItemText primary={`Nome: ${this.state.student.name}`} />
                    <ListItemText primary={`Nascimento: ${this.state.student.birthDate}`} />
                    <ListItemText primary={`Turma: ${this.state.student.grade}`} />
                    <ListItemText primary={`Telefone: ${this.state.student.phone}`} />
                    <ListItemText primary={`Avisar: ${this.state.student.authorized}`} />
                    <ListItemText primary={`Responsável: ${this.state.student.nameResponsible}     `} />
                  </Box>
                  <Box flexBasis="60%">
                    <ListItemText primary={`Telefone Resp.: ${this.state.student.emergencyPhone}`} />
                    <ListItemText primary={`Parentesco: ${this.state.student.kinship}`} />
                    <ListItemText primary={`Autorização imagem: ${this.state.student.imageAuthorization ? "Sim" : "Não"}`} />
                    {this.state.student.foodRestriction && (
                      <ListItemText primary={`Restrição alimentar: ${this.state.student.foodRestrictionInfo}`} />
                    )}
                    {this.state.student.observation && <ListItemText primary={`Observações: ${this.state.student.observation}`} />}
                  </Box>
                </ListItem>
              </Paper>
            </Box>
          </>
        )}
      </>
    );
  }
}

export default DetailsPage;
