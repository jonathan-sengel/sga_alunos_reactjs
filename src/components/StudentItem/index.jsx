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

    const { studentId, name, birthDate, grade, phone, nameResponsible } = this.props.studentData;
    const { actionOnEditClick, actionOnDeleteClick } = this.props;
    return (
      <div style={divContainer}>
        <div style={divInfo}>
          <div>Nome: {name}</div>
          <div>Nascimento: {birthDate}</div>
          <div>Turma: {grade}</div>
          <div>Telefone: {phone}</div>
          <div>Avisar: {nameResponsible}</div>
        </div>
        <div style={divActions}>
          <button style={{ padding: "5px" }} data-studentid={studentId} onClick={actionOnEditClick}>
            Edit
          </button>
          <button
            style={{ padding: "5px" }}
            data-studentid={studentId}
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
