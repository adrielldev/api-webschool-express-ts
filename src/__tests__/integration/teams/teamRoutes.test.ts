import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedTeam,
  mockedInvalidTeam,
  mockedSchoolLogin,
  mockedTeacherLogin,
  mockedStudentLogin,
  mockedSchool,
  mockedTeacher,
  mockedStudent,
  mockedUpdatedTeam,
  mockedTeam2,
} from "../../mocks";

describe("/teams - Rota responsável pelas funcionalidades das turmas", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during data source initialization", err);
      });

    await request(app).post("/schools").send(mockedSchool);
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam2);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /teams - Deve ser capaz de criar uma nova turma", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
  });

  test("POST /teams - Não deve ser capaz de criar uma nova turma sem token de autorização", async () => {
    const response = await request(app).post("/teams").send(mockedTeam);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /teams - Não deve ser capaz de criar uma nova turma com o type sendo igual a teacher", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    await request(app)
      .post("/teachers")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeacher);

    const teacherLogin = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${teacherLogin.body.token}`)
      .send(mockedTeam);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /teams - Não deve ser capaz de criar uma nova turma com o type sendo igual a aluno", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedStudent);
    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${studentLogin.body.token}`)
      .send(mockedTeam);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /teams - Não deve ser capaz de criar uma nova turma com um nome já esxistente", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam);
    const response = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /teams - Não deve ser capaz de criar uma nova turma caso os dados passados sejam inválidos", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedInvalidTeam);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("GET - /teams - Deve ser capaz de listar todas as turmas", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  test("GET - /teams - Não deve ser capaz de listar todas as turmas sem token de autorização", async () => {
    const response = await request(app).get("/teams");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET - /teams - Não deve ser capaz de listar todas as turmas com o type sendo igual a teacher", async () => {
    const teacherLogin = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const response = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${teacherLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET - /teams - Não deve ser capaz de listar todas as turmas com o type sendo igual a student", async () => {
    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
    const response = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET - /teams/:id - Deve ser capaz de buscar os dados de uma turma", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const teams = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);
    const response = await request(app)
      .get(`/teams/${teams.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
  });

  test("GET - /teams/:id - Não deve ser possivel buscar os dados de uma turma sem o token de autorização", async () => {
    const response = await request(app).get(
      `/teams/ccfecddf-aed7-4e42-8186-44215669a53c`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET - /teams/:id - Não deve ser capaz de buscar os dados de uma turma com o type sendo igual a teacher", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const teams = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const teacherLogin = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const response = await request(app)
      .get(`/teams/${teams.body[0].id}`)
      .set("Authorization", `Bearer ${teacherLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET - /teams/:id - Não deve ser capaz de buscar os dados de uma turma com o type sendo igual a student", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const users = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
    const response = await request(app)
      .get(`/teams/${users.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET - /teams/:id - Não deve ser capaz de buscar os dados de uma turma caso o id informado seja inválido", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .get(`/teams/ccfecddf-aed7-4e42-8186-44215669a53c`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH - /teams/:id - Não deve ser capaz de atualizar os dados da turma sem token de autorização", async () => {
    const response = await request(app).patch(
      `/teams/ccfecddf-aed7-4e42-8186-44215669a53c`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH - /teams/:id - Não deve ser capaz de atualizar os dados da turma caso o id informado seja inválido", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .patch(`/teams/ccfecddf-aed7-4e42-8186-44215669a53c`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH - /teams/:id - Não deve ser capaz de atualizar os dados da turma caso o type seja igual a teacher", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const users = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const teacherLogin = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const response = await request(app)
      .patch(`/teams/${users.body[0].id}`)
      .set("Authorization", `Bearer ${teacherLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH - /teams/:id - Não deve ser capaz de atualizar os dados da turma caso o type seja igual a student", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const users = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
    const response = await request(app)
      .patch(`/teams/${users.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH - /teams/:id - Deve ser capaz de atualizar os dados da turma", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const users = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .patch(`/teams/${users.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedUpdatedTeam);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
  });

  test("DELETE - /teams/:id - Não deve ser capaz de remover uma turma sem o token de autorização", async () => {
    const response = await request(app).delete(
      `/teams/ccfecddf-aed7-4e42-8186-44215669a53c`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE - /teams/:id - Não deve ser capaz de remover uma turma com o type sendo igual a teacher", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const users = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const teacherLogin = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const response = await request(app)
      .delete(`/teams/${users.body[0].id}`)
      .set("Authorization", `Bearer ${teacherLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE - /teams/:id - Não deve ser capaz de remover uma turma com o type sendo igual a student", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const users = await request(app)
      .get("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
    const response = await request(app)
      .delete(`/teams/${users.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE - /teams/:id - Não deve ser capaz de remover uma turma caso o id informado seja inválido", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .delete(`/teams/ccfecddf-aed7-4e42-8186-44215669a53c`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE - /teams/:id - Deve ser capaz de remover uma turma", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const team = await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send({ name: "M10" });

    const response = await request(app)
      .delete(`/teams/${team.body.id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
