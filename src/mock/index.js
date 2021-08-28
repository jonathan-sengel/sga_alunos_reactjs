import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/alunos", () => {
      const studendListFromStorage = JSON.parse(localStorage.getItem("studentList"));
      return studendListFromStorage;
    });
  },
});
