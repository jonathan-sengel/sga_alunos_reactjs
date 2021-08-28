import { createServer } from "miragejs";
import dataHelper from "../helpers";
import { apiGet } from "../services/api";

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

    this.post("/add", (schema, request) => {
      localStorage.setItem("studentList", JSON.stringify(request.requestBody));
      localStorage.removeItem("formData");
      return "Cadastrado";
    });

    this.delete("/delete/:id", async (schema, request) => {
      const id = request.params.id;

      const temporaryStudentList = await apiGet("/api/students");
      const indexOfStudentOnArray = temporaryStudentList.findIndex(
        (student) => student.studentId === id
      );
      temporaryStudentList.splice(indexOfStudentOnArray, 1);
      localStorage.setItem("studentList", JSON.stringify(temporaryStudentList));
      return temporaryStudentList;
    });
  },
});
