import React from "react";
import Header from "../../components/Header";
import FormComponent from "../../components/Form/FormComponent";
import PropTypes from "prop-types";
import "./style.css";

class RegisterPage extends React.Component {
  static propTypes = {
    actionClick: PropTypes.func,
  };
  render() {
    return (
      <>
        <Header buttonText={"Voltar"} onButtonClick={this.props.actionClick}>
          Registrar Aluno
        </Header>
        <FormComponent />
      </>
    );
  }
}

export default RegisterPage;
