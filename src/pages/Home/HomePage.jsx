import React from "react";
import Header from "../../components/Header";
import StudentItem from "../../components/StudentItem";
import FilterComponent from "../../components/Filter/FilterComponent";
import PropTypes from "prop-types";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const storedStudentList = JSON.parse(localStorage.getItem("listaAlunos"));
    this.state = {
      filterText: "",
      studentList: storedStudentList ? storedStudentList : [],
      filteredStudentList: storedStudentList ? storedStudentList : [],
    };
  }
  static propTypes = {
    actionClick: PropTypes.func,
    actionOnEditing: PropTypes.func,
  };

  handleOnFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filteredList = this.state.studentList.filter((student) =>
      student.nome.toLowerCase().includes(filterText)
    );
    this.setState({
      filterText: filterText,
      filteredStudentList: filteredList,
    });
  };

  handleEditStudent = (event) => {
    const studentId = event.target.dataset.studentid;
    const studentData = this.state.studentList.filter(
      (student) => student.idEstudante === studentId
    );
    this.props.actionOnEditing(...studentData);
  };

  handleDeleteStudent = (event) => {
    const studentId = event.target.dataset.studentid;
    const temporaryStudentList = [...this.state.studentList];
    const indexOfStudentOnArray = temporaryStudentList.findIndex(
      (student) => student.idEstudante === studentId
    );
    temporaryStudentList.splice(indexOfStudentOnArray, 1);
    this.setState(
      {
        studentList: temporaryStudentList,
        filteredStudentList: temporaryStudentList,
      },
      () => {
        localStorage.setItem(
          "listaAlunos",
          JSON.stringify(this.state.studentList),
          toast.success("Registro removido", {
            autoClose: 3000,
            transition: Flip,
          })
        );
      }
    );
  };

  render() {
    const { filterText, studentList, filteredStudentList } = this.state;
    return (
      <>
        <Header buttonText={"Cadastrar"} onButtonClick={this.props.actionClick}>
          Nossos Alunos
        </Header>
        <FilterComponent value={filterText} handleOnFilterChange={this.handleOnFilterChange} />
        <ul style={{ listStyle: "none", padding: "10px 20px" }}>
          {studentList &&
            filteredStudentList.map((student, index) => {
              return (
                <StudentItem
                  key={index}
                  studentData={student}
                  index={index}
                  actionOnEditClick={this.handleEditStudent}
                  actionOnDeleteClick={this.handleDeleteStudent}
                />
              );
            })}
        </ul>
        <ToastContainer />
      </>
    );
  }
}

export default HomePage;
