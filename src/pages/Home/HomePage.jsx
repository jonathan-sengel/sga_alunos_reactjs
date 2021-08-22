import React from "react";
import Header from "../../components/Header";
import StudentItem from "../../components/StudentItem";
import FilterComponent from "../../components/Filter/FilterComponent";
import PropTypes from "prop-types";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const listaAlunos = JSON.parse(localStorage.getItem("listaAlunos"));
    this.state = {
      listaDeAlunos: listaAlunos ? listaAlunos : [],
      listaDeAlunosFiltrados: listaAlunos ? listaAlunos : [],
    };
  }
  static propTypes = {
    actionClick: PropTypes.func,
  };

  handleOnChange = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = this.state.listaDeAlunos.filter((aluno) =>
      aluno.nome.toLowerCase().includes(value)
    );
    this.setState({
      listaDeAlunosFiltrados: filtered,
    });
  };

  render() {
    const { listaDeAlunos, listaDeAlunosFiltrados } = this.state;
    return (
      <>
        <Header buttonText={"Cadastrar"} onButtonClick={this.props.actionClick}>
          Nossos Alunos
        </Header>
        <FilterComponent handleOnChange={this.handleOnChange} />
        <ul style={{ listStyle: "none", padding: "10px 20px" }}>
          {listaDeAlunos &&
            listaDeAlunosFiltrados.map((aluno, index) => {
              return (
                <StudentItem key={index} dadosAluno={aluno} index={index} />
              );
            })}
        </ul>
      </>
    );
  }
}

export default HomePage;
