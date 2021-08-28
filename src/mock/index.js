import { createServer } from "miragejs";
import dataHelper from "../helpers";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/students", () => {
      const studendListFromStorage = JSON.parse(localStorage.getItem("studentList"));
      return studendListFromStorage;
    });

    this.get("/kinships", () => {
      return dataHelper.kinships;
    });
    this.get("/grades", () => {
      return dataHelper.grades;
    });
    this.get("/authorized", () => {
      return dataHelper.authorized;
    });
  },
});
