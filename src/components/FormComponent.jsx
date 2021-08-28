import React from "react";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import CheckBoxComponent from "./CheckBoxComponent";
import dataHelper from "../helpers";
import PropTypes from "prop-types";

import { Box, Button, TextField } from "@material-ui/core";

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

class FormComponent extends React.Component {
  static propTypes = {
    formData: PropTypes.object,
    actionOnSubmitForm: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { studentData: this.props.formData };
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.actionOnSubmitForm) {
      this.props.actionOnSubmitForm(this.state.studentData);
      this.setState({ studentData: blankData });
      localStorage.removeItem("formData");
    }
  };

  handleChange = (event) => {
    let inputValue = event.target.value;
    const inputName = event.target.name;
    if (event.target.type === "checkbox") {
      this.setState({
        studentData: {
          ...this.state.studentData,
          [inputName]: event.target.checked,
        },
      });
      return;
    }
    if (event.target.type === "tel") {
      inputValue = dataHelper.phoneMask(inputValue);
    }
    this.setState({
      studentData: {
        ...this.state.studentData,
        [inputName]: inputValue,
      },
    });
  };

  componentDidUpdate() {
    const studentData = { ...this.state.studentData };
    localStorage.setItem("formData", JSON.stringify(studentData));
  }

  render() {
    const txtAreaDisplay = {
      display: this.state.studentData.foodRestriction ? "block" : "none",
    };
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <Box display="flex" gridGap={20}>
          <Box minWidth="70%">
            <InputComponent
              type="text"
              name="name"
              id="name"
              value={this.state.studentData.name}
              actionOnChange={this.handleChange}
              placeholderText="Nome aluno"
            />
          </Box>
          <InputComponent
            type="date"
            name="birthDate"
            id="birthDate"
            value={this.state.studentData.birthDate}
            actionOnChange={this.handleChange}
            placeholderText="Data nascimento"
          />
        </Box>
        <Box display="flex" gridGap={20}>
          <Box minWidth="70%">
            <InputComponent
              type="text"
              name="nameResponsible"
              id="nameResponsible"
              value={this.state.studentData.nameResponsible}
              actionOnChange={this.handleChange}
              placeholderText="Nome responsável"
            />
          </Box>
          <InputComponent
            type="tel"
            name="phone"
            id="phone"
            value={this.state.studentData.phone}
            actionOnChange={this.handleChange}
            placeholderText="Fone responsável"
            maxLength={14}
          />
        </Box>
        <Box display="flex" gridGap={20}>
          <Box display="flex" gridGap={20} minWidth="70%">
            <SelectComponent
              selectName="kinship"
              selectId="kinship"
              value={this.state.studentData.kinship}
              optionsList={dataHelper.kinships}
              actionOnChange={this.handleChange}
              labelText="Parentescos"
            />
            <SelectComponent
              selectName="authorized"
              selectId="authorized"
              value={this.state.studentData.authorized}
              optionsList={dataHelper.authorized}
              actionOnChange={this.handleChange}
              labelText="Autorizados"
            />
          </Box>
          <InputComponent
            type="tel"
            name="emergencyPhone"
            id="emergencyPhone"
            value={this.state.studentData.emergencyPhone}
            placeholderText="Fone emergencia"
            labelText="fone emergencia"
            actionOnChange={this.handleChange}
            maxLength={14}
          />
        </Box>
        <CheckBoxComponent
          checkName="foodRestriction"
          checkId="foodRestriction"
          checked={this.state.studentData.foodRestriction}
          labelDescription="Restrição alimentar?"
          actionOnChange={this.handleChange}
        >
          <TextField
            variant="outlined"
            minRows={2}
            multiline
            style={txtAreaDisplay}
            fullWidth
            name="foodRestrictionInfo"
            value={this.state.studentData.foodRestrictionInfo}
            label="Descreva as restrições"
            onChange={this.handleChange}
          ></TextField>
        </CheckBoxComponent>
        <CheckBoxComponent
          checkName="imageAuthorization"
          checkId="imageAuthorization"
          checked={this.state.studentData.imageAuthorization}
          actionOnChange={this.handleChange}
          labelDescription="Permite uso de Imagem?"
        />
        <SelectComponent
          selectName="grade"
          selectId="grade"
          value={this.state.studentData.grade}
          optionsList={dataHelper.grades}
          actionOnChange={this.handleChange}
          labelText="Turmas"
        />
        <Box display="flex" marginY={2} width="100%">
          <TextField
            variant="outlined"
            minRows={2}
            multiline
            name="observation"
            id="observation"
            fullWidth
            value={this.state.studentData.observation}
            label="Descreva aqui as observações"
            onChange={this.handleChange}
          ></TextField>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </form>
    );
  }
}

export default FormComponent;
