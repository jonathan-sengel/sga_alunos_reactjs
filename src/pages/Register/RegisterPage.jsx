import React from "react";
import { HeaderComponent, FormComponent } from "../../components";
import dataHelper from "../../helpers";
import PropTypes from "prop-types";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiPost } from "../../services/api";

const blankData = {
  studentId: "",
  imageAuthorization: false,
  authorized: "",
  birthDate: "",
  foodRestrictionInfo: "",
  name: "",
  nameResponsible: "",
  observation: "",
  kinship: "",
  foodRestriction: false,
  phone: "",
  emergencyPhone: "",
  grade: "",
};

class RegisterPage extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    studentData: PropTypes.object,
    actionClick: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    const atualData = props.studentData
      ? props.studentData
      : savedFormData
      ? savedFormData
      : blankData;
    this.state = {
      atualData: atualData,
    };
  }

  onSubmitForm = async (data) => {
    let studentList = [];
    if (localStorage.getItem("studentList")) {
      studentList = JSON.parse(localStorage.getItem("studentList"));
    }

    if (data.studentId) {
      const studentIndexOnArray = studentList.findIndex(
        (student) => student.studentId === data.studentId
      );
      studentList[studentIndexOnArray] = data;
    } else {
      studentList.push({ ...data, studentId: dataHelper.generateId(10) });
    }
    await apiPost("/api/add", studentList);
    this.setState({ atualData: blankData });
    toast.success("Aluno cadastrado com sucesso!", {
      autoClose: 2500,
      transition: Flip,
    });
  };

  render() {
    return (
      <>
        <HeaderComponent buttonText={"Listagem"} onButtonClick={this.props.actionClick}>
          {this.props.title}
        </HeaderComponent>
        <FormComponent formData={this.state.atualData} actionOnSubmitForm={this.onSubmitForm} />
        <ToastContainer />
      </>
    );
  }
}

export default RegisterPage;
