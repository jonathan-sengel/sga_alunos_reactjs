import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailsPage from "./pages/Details/DetailsPage";
import EditPage from "./pages/Edit/EditPage";
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/Register/RegisterPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHome: true, isRegister: false, isEditing: false };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/register">
            <RegisterPage title="Cadastrar Aluno" isEditing={false} />
          </Route>
          <Route
            path="/edit/:id"
            render={(routeProps) => {
              return <EditPage {...routeProps} title="Editando Aluno" isEditing={true} />;
            }}
          ></Route>
          <Route
            path="/details/:id"
            render={(routerProps) => {
              return <DetailsPage {...routerProps} />;
            }}
          ></Route>
          <Route>404 - NOT FOUND</Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
