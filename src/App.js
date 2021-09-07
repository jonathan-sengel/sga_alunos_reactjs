import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import EditPage from "./pages/EditPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import { APIProvider } from "./providers/Api";
import { UserProvider } from "./providers/User";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isHome: true, isRegister: false, isEditing: false, userData: null };
  }

  handleUserLogin = (user) => {
    this.setState({ userData: user });
  };

  render() {
    return (
      <APIProvider>
        <UserProvider userData={this.state.userData}>
          <Router>
            <Switch>
              <Route
                path="/"
                exact
                render={(routerProps) => {
                  return <LoginPage {...routerProps} userLogin={this.handleUserLogin} />;
                }}
              ></Route>
              <Route path="/home">
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

              {this.state.userData && (
                <Route path="/user">
                  <UserPage />
                </Route>
              )}
              <Route>404 - NOT FOUND</Route>
            </Switch>
          </Router>
        </UserProvider>
      </APIProvider>
    );
  }
}

export default App;
