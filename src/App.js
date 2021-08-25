import { Button } from "@material-ui/core";
import React from "react";
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/Register/RegisterPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHome: true, isRegister: false, isEditing: false };
  }

  onChangePage = () => {
    if (this.state.studentEditing) {
      this.setState({ studentEditing: null });
    }
    this.setState({
      isHome: !this.state.isHome,
      isRegister: !this.state.isRegister,
      isEditing: false,
    });
  };

  onEditingStudent = (student) => {
    this.setState({
      isHome: false,
      isRegister: true,
      isEditing: !this.state.isEditing,
      studentEditing: student,
    });
  };

  render() {
    const { isHome, isRegister, isEditing, studentEditing } = this.state;
    return (
      <>
      <Button variant="contained" color="primary">New Button</Button>
        {isHome && (
          <HomePage actionClick={this.onChangePage} actionOnEditing={this.onEditingStudent} />
        )}
        {isRegister && !isEditing && (
          <RegisterPage actionClick={this.onChangePage} title="Cadastrar Aluno" />
        )}
        {isRegister && isEditing && (
          <RegisterPage
            actionClick={this.onChangePage}
            title="Editando Aluno"
            studentData={studentEditing}
          />
        )}
      </>
    );
  }
}

export default App;
