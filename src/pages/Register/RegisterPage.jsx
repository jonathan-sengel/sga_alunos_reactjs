import React from "react";
import Header from "../../components/Header";
import FormComponent from "../../components/Form/FormComponent";
import PropTypes from "prop-types";
// import "./style.css";

class RegisterPage extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    studentData: PropTypes.object,
    actionClick: PropTypes.func,
  };
  render() {
    return (
      <>
        <Header buttonText={"Listagem"} onButtonClick={this.props.actionClick}>
          {this.props.title}
        </Header>
        <FormComponent editingStudent={this.props.studentData} />
      </>
    );
  }
}

export default RegisterPage;
