import React from "react";

export const UserContext = React.createContext({});

export class UserProvider extends React.Component {
  render() {
    return (
      <UserContext.Provider value={this.props.userData}>{this.props.children}</UserContext.Provider>
    );
  }
}
