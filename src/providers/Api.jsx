import React from "react";
import { get, post, del } from "../services/api";

export const APIContext = React.createContext({});

export class APIProvider extends React.Component {
  render() {
    return (
      <APIContext.Provider value={{ get, post, del }}>{this.props.children}</APIContext.Provider>
    );
  }
}
