import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedSchool,
  mockedSchoolLogin,
  mockedTeacher,
  mockedTeacherLogin,
  mockedTeacherUpdate,
  mockedTeam,
  mockedTeam2,
} from "../../mocks";

describe("/teachers", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /teachers - Deve ser capaz de criar o cadastro do professor", async () => {
    await request(app).post("/schools").send(mockedSchool);
    const loginSchool = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${loginSchool.body.token}`)
      .send(mockedTeam);
    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${loginSchool.body.token}`)
      .send(mockedTeam2);

    const response = await request(app)
      .post("/teachers")
      .set("Authorization", `Bearer ${loginSchool.body.token}`)
      .send(mockedTeacher);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("shift");
    expect(response.body).toHaveProperty("matter");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toEqual("Fábio Junior");
    expect(response.body.email).toEqual("fabio@mail.com.br");
    expect(response.body.type).toEqual("teacher");
    expect(response.body.shift).toEqual("Matutino");
    expect(response.body.matter).toEqual("Back-End");
    expect(response.status).toBe(201);
  });

  test("POST /teachers -  Não deve ser capaz de cadastrar um professor já existente", async () => {
    const response = await request(app).post("/teachers").send(mockedTeacher);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET - Não deve ser capaz de listar com ID errado", async () => {
    await request(app).post("/teachers").send(mockedTeacher);

    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .get(`/teachers/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /teachers/:id -  Não deve ser capaz de listar sem autenticação de usuário", async () => {
    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const TeacherTobeListed = await request(app)
      .get("/teachers/:id")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app).get(
      `/teachers/${TeacherTobeListed.body.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /teachers -  Não deve ser capaz de listar sem ser do tipo escola", async () => {
    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .get("/teachers")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("GET /teachers -  Deve ser capaz de listar os professores", async () => {
    const schoolLoginResponse = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .get("/teachers")
      .set("Authorization", `Bearer ${schoolLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("Patch /teachers/:id -  Não deve ser capaz de alterar sem autenticação de usuário", async () => {
    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const TeacherTobeUpdate = await request(app)
      .get("/teachers/:id")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app).patch(
      `/teachers/${TeacherTobeUpdate.body.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /teachers - Deve ser capaz de alterar o cadastro do professor", async () => {
    const schoolLoginResponse = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const TeacherTobeUpdated = await request(app)
      .get("/teachers")
      .set("Authorization", `Bearer ${schoolLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/teachers/${TeacherTobeUpdated.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLoginResponse.body.token}`)
      .send(mockedTeacherUpdate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("shift");
    expect(response.body).toHaveProperty("matter");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.name).toEqual("Júnior Fábio");
    expect(response.body.email).toEqual("fabio@mail.com.br");
    expect(response.body.type).toEqual("teacher");
    expect(response.body.shift).toEqual("Matutino");
    expect(response.body.matter).toEqual("Back-End");
    expect(response.status).toBe(200);
  });

  test("PATCH /teachers/:id -  Não deve ser capaz de atualizar com ID errado", async () => {
    await request(app).post("/teachers").send(mockedTeacher);

    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .get(`/teachers/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /teachers/:id -  Não deve ser capaz de excluir sem autenticação de usuário", async () => {
    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const TeacherTobeDeleted = await request(app)
      .get("/teachers/:id")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/teachers/${TeacherTobeDeleted.body.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE -  Não deve ser capaz de deletar com ID errado", async () => {
    await request(app).post("/teachers").send(mockedTeacher);

    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const response = await request(app)
      .delete(`/teachers/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /teachers/:id -  Deve ser capaz de excluir um professor", async () => {
    const teacherLoginResponse = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const UserTobeDeleted = await request(app)
      .get("/teachers")
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/teachers/${UserTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
