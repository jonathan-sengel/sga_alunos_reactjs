import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import SelectComponent from "../SelectComponent/SelectComponent";
import CheckBoxComponent from "../Checkbox/CheckBoxComponent";
import dataHelper from "../../helpers";
import PropTypes from "prop-types";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button } from "@material-ui/core";

class FormComponent extends React.Component {
  static propTypes = {
    editingStudent: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const savedFormData = JSON.parse(localStorage.getItem("formData"));
    this.state = this.props.editingStudent
      ? this.props.editingStudent
      : savedFormData
      ? savedFormData
      : {
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
  }

  onSubmit = (event) => {
    event.preventDefault();
    let studentList = [];
    if (localStorage.getItem("studentList")) {
      studentList = JSON.parse(localStorage.getItem("studentList"));
    }

    if (this.props.editingStudent) {
      const studentIndexOnArray = studentList.findIndex(
        (student) => student.studentId === this.props.editingStudent.studentId
      );
      studentList[studentIndexOnArray] = this.state;
    } else {
      studentList.push({ ...this.state, studentId: dataHelper.generateId(10) });
    }

    localStorage.setItem("studentList", JSON.stringify(studentList));
    localStorage.removeItem("formData");
    this.setState({
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
    });
    toast.success("Aluno cadastrado com sucesso!", {
      autoClose: 2500,
      transition: Flip,
    });
  };

  handleChange = (event) => {
    let inputValue = event.target.value;
    const inputName = event.target.name;
    if (event.target.type === "checkbox") {
      this.setState({
        [inputName]: event.target.checked,
      });
      return;
    }
    if (event.target.type === "tel") {
      inputValue = dataHelper.phoneMask(inputValue);
    }
    this.setState({
      [inputName]: inputValue,
    });
  };

  componentDidUpdate() {
    const studentData = { ...this.state };
    localStorage.setItem("formData", JSON.stringify(studentData));
  }

  render() {
    const txtAreaDisplay = {
      display: this.state.foodRestriction ? "block" : "none",
      width: "100%",
      padding: "14px",
    };

    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <Box display="flex" gridGap={20}>
          <Box minWidth="70%">
            <InputComponent
              type="text"
              name="name"
              id="name"
              value={this.state.name}
              actionOnChange={this.handleChange}
              placeholderText="nome aluno"
              labelText="nome aluno"
            />
          </Box>
          <InputComponent
            type="date"
            name="birthDate"
            id="birthDate"
            value={this.state.birthDate}
            actionOnChange={this.handleChange}
            placeholderText="Data nascimento"
            labelText="Data nascimento"
          />
        </Box>
        <Box display="flex" gridGap={20}>
          <Box minWidth="70%">
            <InputComponent
              type="text"
              name="nameResponsible"
              id="nameResponsible"
              value={this.state.nameResponsible}
              actionOnChange={this.handleChange}
              placeholderText="nome responsável"
              labelText="nome responsável"
            />
          </Box>
          <InputComponent
            type="tel"
            name="phone"
            id="phone"
            value={this.state.phone}
            actionOnChange={this.handleChange}
            placeholderText="fone responsável"
            labelText="fone responsável"
            maxLength={14}
          />
        </Box>
        <Box display="flex" gridGap={20}>
          <Box display="flex" gridGap={20} minWidth="70%">
            <SelectComponent
              selectName="kinship"
              selectId="kinship"
              value={this.state.kinship}
              optionsList={dataHelper.kinships}
              actionOnChange={this.handleChange}
              labelText="parentescos"
            />
            <SelectComponent
              selectName="authorized"
              selectId="authorized"
              value={this.state.authorized}
              optionsList={dataHelper.authorized}
              actionOnChange={this.handleChange}
              labelText="authorized"
            />
          </Box>
          <InputComponent
            type="tel"
            name="emergencyPhone"
            id="emergencyPhone"
            value={this.state.emergencyPhone}
            placeholderText="Fone emergencia"
            labelText="fone emergencia"
            actionOnChange={this.handleChange}
            maxLength={14}
          />
        </Box>
        <CheckBoxComponent
          checkName="foodRestriction"
          checkId="foodRestriction"
          checked={this.state.foodRestriction}
          labelDescription="Restrição alimentar?"
          actionOnChange={this.handleChange}
        >
          <textarea
            cols="30"
            rows="3"
            style={txtAreaDisplay}
            name="foodRestrictionInfo"
            value={this.state.foodRestrictionInfo}
            placeholder="informe as restrições"
            onChange={this.handleChange}
          ></textarea>
        </CheckBoxComponent>
        <CheckBoxComponent
          checkName="imageAuthorization"
          checkId="imageAuthorization"
          checked={this.state.imageAuthorization}
          actionOnChange={this.handleChange}
          labelDescription="Permite uso de Imagem?"
        />
        <SelectComponent
          selectName="grade"
          selectId="grade"
          value={this.state.grade}
          optionsList={dataHelper.grades}
          actionOnChange={this.handleChange}
          labelText="grade"
        />

        <Box display="flex" marginY={2} width="100%">
          <textarea
            name="observation"
            id="observation"
            cols="30"
            rows="4"
            style={{ width: "100%" }}
            value={this.state.observation}
            placeholder="observações, caso tenha"
            onChange={this.handleChange}
          ></textarea>
        </Box>
        <Button variant="contained" color="primary">
          Cadastrar
        </Button>
        <ToastContainer />
      </form>
    );
  }
}

export default FormComponent;
