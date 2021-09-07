import React from "react";
import { HeaderComponent, FormComponent } from "../components";
import PropTypes from "prop-types";

import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinearProgress } from "@material-ui/core";
import { APIContext } from "../providers/Api";

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

class EditPage extends React.Component {
  static contextType = APIContext;
  static propTypes = {
    title: PropTypes.string,
    actionClick: PropTypes.func,
    isEditing: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async componentDidMount() {
    const studentId = this.props.match.params.id;
    const userEditing = await this.context.get(`/api/student/${studentId}`);
    this.setState({ editingData: userEditing, isLoading: false });
  }

  onSubmitForm = async (data) => {
    await this.context.post(`/api/update`, data);
    this.setState({ atualData: blankData });
    toast.success("Aluno atualizado com sucesso!", {
      autoClose: 2500,
      transition: Flip,
    });
  };

  render() {
    return (
      <>
        <HeaderComponent buttonText={"Listagem"} to="/" onButtonClick={this.props.actionClick}>
          {this.props.title}
        </HeaderComponent>
        {this.state.isLoading && <LinearProgress />}
        {!this.state.isLoading && (
          <FormComponent
            formData={this.state.editingData}
            actionOnSubmitForm={this.onSubmitForm}
            buttonText="Salvar"
          />
        )}
        <ToastContainer />
      </>
    );
  }
}

export default EditPage;
