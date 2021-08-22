import React from "react";
import InputComponent from "../InputComponent/InputComponent";
import SelectComponent from "../SelectComponent/SelectComponent";
import CheckBoxComponent from "../Checkbox/CheckBoxComponent";
import dados from "../../helpers";
import PropTypes from "prop-types";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class FormComponent extends React.Component {
  static propTypes = {
    editingStudent: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const dadosSalvos = JSON.parse(localStorage.getItem("dadosForm"));
    this.state = this.props.editingStudent
      ? this.props.editingStudent
      : dadosSalvos
      ? dadosSalvos
      : {
          autorizacaoImagem: false,
          autorizados: "",
          dataNasc: "",
          infoRestriAlimentar: "",
          nome: "",
          nomeResponsavel: "",
          observacoes: "",
          parentesco: "",
          restricaoAlimentar: false,
          telefone: "",
          telefoneEmergencia: "",
          turma: "",
        };
  }

  onSubmit = (event) => {
    event.preventDefault();
    let listaDeAlunos = [];
    if (localStorage.getItem("listaAlunos")) {
      listaDeAlunos = JSON.parse(localStorage.getItem("listaAlunos"));
    }
    listaDeAlunos.push({ idEstudante: dados.generateId(6), ...this.state });
    localStorage.setItem("listaAlunos", JSON.stringify(listaDeAlunos));
    localStorage.removeItem("dadosForm");
    this.setState({
      autorizacaoImagem: false,
      autorizados: "",
      dataNasc: "",
      infoRestriAlimentar: "",
      nome: "",
      nomeResponsavel: "",
      observacoes: "",
      parentesco: "",
      restricaoAlimentar: false,
      telefone: "",
      telefoneEmergencia: "",
      turma: "",
    });
    toast.success("Aluno cadastrado com sucesso!", {
      autoClose: 3000,
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
      inputValue = dados.phoneMask(inputValue);
    }
    this.setState({
      [inputName]: inputValue,
    });
  };

  componentDidUpdate() {
    const dadosAluno = { ...this.state };
    localStorage.setItem("dadosForm", JSON.stringify(dadosAluno));
  }

  render() {
    const txtAreaDisplay = {
      display: this.state.restricaoAlimentar ? "block" : "none",
    };

    return (
      <form
        onSubmit={this.onSubmit}
        style={{ display: "flex", flexDirection: "column", color: "#E5E5E5" }}
      >
        <div className="divContainer">
          <InputComponent
            type="text"
            name="nome"
            id="nome"
            value={this.state.nome}
            actionOnChange={this.handleChange}
            placeholderText="Nome aluno"
            labelText="Nome aluno"
          />
          <InputComponent
            type="date"
            name="dataNasc"
            id="dataNasc"
            value={this.state.dataNasc}
            actionOnChange={this.handleChange}
            placeholderText="Data nascimento"
            labelText="Data nascimento"
          />
          <InputComponent
            type="text"
            name="nomeResponsavel"
            id="nomeResponsavel"
            value={this.state.nomeResponsavel}
            actionOnChange={this.handleChange}
            placeholderText="Nome responsável"
            labelText="Nome responsável"
          />
          <InputComponent
            type="tel"
            name="telefone"
            id="telefone"
            value={this.state.telefone}
            actionOnChange={this.handleChange}
            placeholderText="Fone responsável"
            labelText="Fone responsável"
            maxLength={14}
          />
        </div>
        <div className="divContainer">
          <SelectComponent
            selectName="parentesco"
            selectId="parentesco"
            value={this.state.parentesco}
            optionsList={dados.parentescos}
            actionOnChange={this.handleChange}
            labelText="Parentesco"
          />
          <InputComponent
            type="tel"
            name="telefoneEmergencia"
            id="telefoneEmergencia"
            value={this.state.telefoneEmergencia}
            placeholderText="Fone emergencia"
            labelText="Fone emergencia"
            actionOnChange={this.handleChange}
            maxLength={14}
          />
        </div>
        <div className="divContainer">
          <CheckBoxComponent
            checkName="restricaoAlimentar"
            checkId="restricaoAlimentar"
            checked={this.state.restricaoAlimentar}
            labelDescription="Restrição alimentar?"
            textareaPlaceHolder="Informe as restrições"
            actionOnChange={this.handleChange}
          >
            <textarea
              style={txtAreaDisplay}
              name="infoRestriAlimentar"
              value={this.state.infoRestriAlimentar}
              placeholder="informe as restrições"
              onChange={this.handleChange}
            ></textarea>
          </CheckBoxComponent>
          <CheckBoxComponent
            checkName="autorizacaoImagem"
            checkId="autorizacaoImagem"
            checked={this.state.autorizacaoImagem}
            actionOnChange={this.handleChange}
            labelDescription="Permite uso de Imagem?"
          />
        </div>
        <div className="divContainer flexColumn">
          <div style={{ display: "flex", gap: "5px" }}>
            <SelectComponent
              selectName="turma"
              selectId="turma"
              value={this.state.turma}
              optionsList={dados.turmas}
              actionOnChange={this.handleChange}
              labelText="Turma"
            />
            <SelectComponent
              selectName="autorizados"
              selectId="autorizados"
              value={this.state.autorizados}
              optionsList={dados.autorizados}
              actionOnChange={this.handleChange}
              labelText="Autorizados"
            />
          </div>
          <textarea
            name="observacoes"
            id="observacoes"
            cols="30"
            rows="4"
            value={this.state.observacoes}
            placeholder="observações, caso tenha"
            onChange={this.handleChange}
          ></textarea>
          <button style={{ padding: "5px" }}>Cadastrar</button>
          <ToastContainer />
        </div>
      </form>
    );
  }
}

export default FormComponent;
