import React from "react";
import PropTypes from "prop-types";

class StudentItem extends React.Component {
  static propTypes = {
    studentData: PropTypes.object,
    actionOnEditClick: PropTypes.func,
    actionOnDeleteClick: PropTypes.func,
  };

  render() {
    const divInfo = {
      display: "flex",
      flexDirection: "column",
      margin: "10px 0",
      gap: "2px",
      flexBasis: "90%",
    };
    const divContainer = {
      display: "flex",
      alignItems: "center",
      padding: "10px",
      margin: "10px 0",
      backgroundColor: "#E5E5E5",
      borderRadius: "8px",
    };

    const divActions = {
      alignSelf: "flex-end",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      gap: "5px",
      paddingBottom: "10px",
    };

    const { idEstudante, nome, dataNasc, turma, telefone, nomeResponsavel } =
      this.props.studentData;
    const { actionOnEditClick, actionOnDeleteClick } = this.props;
    return (
      <div style={divContainer}>
        <div style={divInfo}>
          <div>Nome: {nome}</div>
          <div>Nascimento: {dataNasc}</div>
          <div>Turma: {turma}</div>
          <div>Telefone: {telefone}</div>
          <div>Avisar: {nomeResponsavel}</div>
        </div>
        <div style={divActions}>
          <button
            style={{ padding: "5px" }}
            data-studentid={idEstudante}
            onClick={actionOnEditClick}
          >
            Edit
          </button>
          <button
            style={{ padding: "5px" }}
            data-studentid={idEstudante}
            onClick={actionOnDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default StudentItem;
