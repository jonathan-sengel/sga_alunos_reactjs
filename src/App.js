import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import { APIProvider } from "./providers/Api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHome: true, isRegister: false, isEditing: false };
  }

  render() {
    return (
      <APIProvider>
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
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/user">
              <UserPage />
            </Route>
            <Route>404 - NOT FOUND</Route>
          </Switch>
        </Router>
      </APIProvider>
    );
  }
}

export default App;
