import React from "react";
import Header from "../../components/Header";
import StudentItem from "../../components/StudentItem";
import PropTypes from "prop-types";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const listaAlunos = JSON.parse(localStorage.getItem("listaAlunos"));
    this.state = { listaDeAlunos: listaAlunos ? listaAlunos : [] };
  }
  static propTypes = {
    actionClick: PropTypes.func,
  };

  render() {
    const { listaDeAlunos } = this.state;
    return (
      <>
        <Header buttonText={"Cadastrar"} onButtonClick={this.props.actionClick}>
          Nossos Alunos
        </Header>
        <ul style={{ listStyle: "none", padding: "10px 20px" }}>
          {listaDeAlunos &&
            listaDeAlunos.map((aluno, index) => {
              return <StudentItem key={index} dadosAluno={aluno} />;
            })}
        </ul>
      </>
    );
  }
}

export default HomePage;
