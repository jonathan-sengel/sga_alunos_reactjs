import React from "react";
import PropTypes from "prop-types";
import { HeaderComponent, StudentItem, FilterComponent } from "../../components";
import { apiDelete, apiGet } from "../../services/api";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinearProgress, List } from "@material-ui/core";

class HomePage extends React.Component {
  static propTypes = {
    actionClick: PropTypes.func,
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

  handleDeleteStudent = async (event) => {
    const studentId = event.target.dataset.studentid;
    const temporaryStudentList = await apiDelete(`/api/delete/${studentId}`);
    console.log(temporaryStudentList);
    this.setState(
      {
        studentList: temporaryStudentList,
        filteredStudentList: temporaryStudentList,
      },
      () => {
        toast.success("Registro removido", {
          autoClose: 2500,
          transition: Flip,
        });
      }
    );
  };

  async componentDidMount() {
    const storedStudentList = await apiGet("/api/students");
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
            <HeaderComponent buttonText={"Cadastrar"} to="/register">
              Nossos Alunos
            </HeaderComponent>
            <FilterComponent value={filterText} handleOnFilterChange={this.handleOnFilterChange} />
            <List dense={true}>
              {studentList &&
                filteredStudentList.map((student, index) => {
                  return (
                    <StudentItem
                      key={index}
                      studentData={student}
                      index={index}
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
