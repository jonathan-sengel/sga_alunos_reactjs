import React from "react";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import CheckBoxComponent from "./CheckBoxComponent";
import dataHelper from "../helpers";
import PropTypes from "prop-types";

import { Box, Button, LinearProgress, TextField } from "@material-ui/core";
import { apiGet } from "../services/api";

const CACHE = {};

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
    this.state = {
      studentData: this.props.formData,
      kinshipsList: [],
      gradesList: [],
      authorizedList: [],
      listIsLoading: true,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.props.actionOnSubmitForm) {
      this.props.actionOnSubmitForm(this.state.studentData);
      this.setState({ studentData: blankData });
      localStorage.removeItem("studentData");
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

  async componentDidMount() {
    if (!CACHE.kinshipsList) {
      CACHE["kinshipsList"] = await apiGet("/api/kinships");
      CACHE["gradesList"] = await apiGet("/api/grades");
      CACHE["authorizedList"] = await apiGet("/api/authorized");
    }
    this.setState({
      kinshipsList: CACHE.kinshipsList,
      gradesList: CACHE.gradesList,
      authorizedList: CACHE.authorizedList,
      listIsLoading: false,
    });
  }

  componentDidUpdate() {
    const studentData = { ...this.state.studentData };
    localStorage.setItem("studentData", JSON.stringify(studentData));
  }

  render() {
    const txtAreaDisplay = {
      display: this.state.studentData.foodRestriction ? "block" : "none",
    };
    return (
      <>
        {this.state.listIsLoading && <LinearProgress />}
        {!this.state.listIsLoading && (
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
                  placeholderText="Nome respons??vel"
                />
              </Box>
              <InputComponent
                type="tel"
                name="phone"
                id="phone"
                value={this.state.studentData.phone}
                actionOnChange={this.handleChange}
                placeholderText="Fone respons??vel"
                maxLength={14}
              />
            </Box>
            <Box display="flex" gridGap={20}>
              <Box display="flex" gridGap={20} minWidth="70%">
                <SelectComponent
                  selectName="kinship"
                  selectId="kinship"
                  value={this.state.studentData.kinship}
                  optionsList={this.state.kinshipsList}
                  actionOnChange={this.handleChange}
                  labelText="Parentescos"
                />
                <SelectComponent
                  selectName="authorized"
                  selectId="authorized"
                  value={this.state.studentData.authorized}
                  optionsList={this.state.authorizedList}
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
              labelDescription="Restri????o alimentar?"
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
                label="Descreva as restri????es"
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
              optionsList={this.state.gradesList}
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
                label="Descreva aqui as observa????es"
                onChange={this.handleChange}
              ></TextField>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              {this.props.buttonText}
            </Button>
          </form>
        )}
      </>
    );
  }
}

export default FormComponent;
