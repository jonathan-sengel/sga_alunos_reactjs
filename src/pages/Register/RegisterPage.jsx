import React from "react";
import { HeaderComponent, FormComponent } from "../../components";
import PropTypes from "prop-types";

class RegisterPage extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    studentData: PropTypes.object,
    actionClick: PropTypes.func,
  };
  render() {
    return (
      <>
        <HeaderComponent buttonText={"Listagem"} onButtonClick={this.props.actionClick}>
          {this.props.title}
        </HeaderComponent>
        <FormComponent editingStudent={this.props.studentData} />
      </>
    );
  }
}

export default RegisterPage;
