import { createServer } from "miragejs";
import dataHelper from "../helpers";
import { get } from "../services/api";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/students", () => {
      const studendListFromStorage = JSON.parse(localStorage.getItem("studentList"));
      return studendListFromStorage;
    });

    this.get("/student/:id", (schema, request) => {
      const studentList = JSON.parse(localStorage.getItem("studentList"));
      const result = studentList.filter((student) => student.studentId === request.params.id);
      return result[0];
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

    this.post("/update", (schema, request) => {
      const editingStudent = request.requestBody;
      const studentList = JSON.parse(localStorage.getItem("studentList"));
      const studentIndex = studentList.findIndex(
        (student) => editingStudent.studentId === student.studentId
      );
      studentList[studentIndex] = editingStudent;
      localStorage.setItem("studentList", JSON.stringify(studentList));
      return studentList;
    });

    this.delete("/delete/:id", async (schema, request) => {
      const id = request.params.id;

      const temporaryStudentList = await get("/api/students");
      const indexOfStudentOnArray = temporaryStudentList.findIndex(
        (student) => student.studentId === id
      );
      temporaryStudentList.splice(indexOfStudentOnArray, 1);
      localStorage.setItem("studentList", JSON.stringify(temporaryStudentList));
      return temporaryStudentList;
    });

    this.get("/users/:email/:pass", (schema, request) => {
      const { email, pass } = request.params;
      const userData = dataHelper.users.filter(
        (user) => user.email === email && user.password === pass
      );
      return userData[0];
    });
  },
});
