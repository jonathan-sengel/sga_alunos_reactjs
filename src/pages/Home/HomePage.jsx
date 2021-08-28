import React from "react";
import PropTypes from "prop-types";
import { HeaderComponent, StudentItem, FilterComponent } from "../../components";
import { apiGet } from "../../services/api";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, LinearProgress, List } from "@material-ui/core";

class HomePage extends React.Component {
  static propTypes = {
    actionClick: PropTypes.func,
    actionOnEditing: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      studentList: [],
      filteredStudentList: [],
      isLoading: true,
    };
  }

  handleOnFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase();
    const filteredList = this.state.studentList.filter((student) =>
      student.name.toLowerCase().includes(filterText)
    );
    this.setState({
      filterText: filterText,
      filteredStudentList: filteredList,
    });
  };

  handleEditStudent = (event) => {
    localStorage.removeItem("formData");
    const studentId = event.target.dataset.studentid;
    const studentData = this.state.studentList.filter((student) => student.studentId === studentId);
    this.props.actionOnEditing(...studentData);
  };

  handleDeleteStudent = (event) => {
    const studentId = event.target.dataset.studentid;
    const temporaryStudentList = [...this.state.studentList];
    const indexOfStudentOnArray = temporaryStudentList.findIndex(
      (student) => student.studentId === studentId
    );
    temporaryStudentList.splice(indexOfStudentOnArray, 1);
    this.setState(
      {
        studentList: temporaryStudentList,
        filteredStudentList: temporaryStudentList,
      },
      () => {
        localStorage.setItem(
          "studentList",
          JSON.stringify(this.state.studentList),
          toast.success("Registro removido", {
            autoClose: 2500,
            transition: Flip,
          })
        );
      }
    );
  };

  async componentDidMount() {
    const storedStudentList = await apiGet("/api/alunos");
    this.setState({
      studentList: storedStudentList,
      filteredStudentList: storedStudentList,
      isLoading: false,
    });
  }

  render() {
    const { filterText, studentList, filteredStudentList, isLoading } = this.state;
    return (
      <>
        {isLoading && <LinearProgress />}
        {!isLoading && (
          <>
            <HeaderComponent buttonText={"Cadastrar"} onButtonClick={this.props.actionClick}>
              Nossos Alunos
            </HeaderComponent>
            <FilterComponent value={filterText} handleOnFilterChange={this.handleOnFilterChange} />
            <List dense={false}>
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
            </List>
            <ToastContainer />
          </>
        )}
      </>
    );
  }
}

export default HomePage;
