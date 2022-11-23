import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedInvalidLogin,
  mockedSchool,
  mockedSchoolLogin,
  mockedStudent,
  mockedStudentLogin,
  mockedTeacher,
  mockedTeacherLogin,
  mockedTeam,
  mockedTeam2,
} from "../../mocks";

describe("/login - Rota responsável por iniciar a sessão do usuário na aplicação", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during data source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login - ESCOLA - Deve retornar um token de acesso caso o usuário tenha sucesso ao iniciar a sessão", async () => {
    await request(app).post("/schools").send(mockedSchool);
    const response = await request(app).post("/login").send(mockedSchoolLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - ESCOLA - Deve retornar uma mensagem de erro caso os dados informados sejam inválidos", async () => {
    const response = await request(app).post("/login").send(mockedInvalidLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /login - PROFESSOR - Deve retornar um token de acesso caso o usuário tenha sucesso ao iniciar a sessão", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam);
    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam2);

    await request(app)
      .post("/teachers")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeacher);
    const response = await request(app).post("/login").send(mockedTeacherLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - PROFESSOR - Deve retornar uma mensagem de erro caso os dados informados sejam inválidos", async () => {
    const response = await request(app).post("/login").send(mockedInvalidLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /login - ALUNO - Deve retornar um token de acesso caso o usuário tenha sucesso ao iniciar a sessão", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam);
    await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedStudent);

    const response = await request(app).post("/login").send(mockedStudentLogin);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  test("POST /login - ALUNO - Deve retornar uma mensagem de erro caso os dados informados sejam inválidos", async () => {
    const response = await request(app).post("/login").send(mockedInvalidLogin);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
