import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import request from "supertest";
import {
  mockedInformation,
  mockedSchool,
  mockedSchoolLogin,
  mockedStudent,
  mockedStudentLogin,
  mockedTeacherLogin,
  mockedTeam,
  mockedUpdatedInformation,
} from "../../mocks";

describe("Testando rotas de informations", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    await request(app).post("/schools").send(mockedSchool);
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /informations - Deve ser capaz de criar uma nova information", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const response = await request(app)
      .post("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedInformation);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("POST /informations - Não deve ser capaz de criar uma nova information sem autorização", async () => {
    const response = await request(app)
      .post("/informations")
      .send(mockedInformation);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /informations - Não deve ser capaz de criar uma nova information com type diferente de school", async () => {
    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .post("/informations")
      .set("Authorization", `Bearer ${studentLogin.body.token}`)
      .send(mockedInformation);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /informations - Não deve ser capaz de criar uma nova information com type diferente de teacher", async () => {
    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .post("/informations")
      .set("Authorization", `Bearer ${studentLogin.body.token}`)
      .send(mockedInformation);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /informations - Deve ser capaz de listar todas as informations", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const response = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("GET /informations - Não deve ser capaz de listar todas as informations sem autorização", async () => {
    const response = await request(app).get("/informations");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /informations - Não deve ser capaz de listar todas as informations com type diferent de school", async () => {
    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /informations - Não deve ser capaz de listar todas as informations com type diferent de teacher", async () => {
    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /informations/:id - Deve ser capaz de pegar uma information", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .get(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("GET /informations/:id - Não deve ser capaz de pegar uma information sem autorização", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app).get(
      `/informations/${informationList.body[0].id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /informations/:id - Não deve ser capaz de pegar uma information com type diferente de school", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .get(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("GET /informations/:id - Não deve ser capaz de pegar uma information com type diferente de teacher", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .get(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /informations/:id - Não deve ser capaz de editar uma information sem autorização", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .patch(`/informations/${informationList.body[0].id}`)
      .send(mockedUpdatedInformation);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /informations/:id - Não deve ser capaz de editar uma information com type diferente de school", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .patch(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`)
      .send(mockedUpdatedInformation);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /informations/:id - Não deve ser capaz de editar uma information com type diferente de teacher", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .patch(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`)
      .send(mockedUpdatedInformation);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /informations/:id - Não deve ser capaz de editar uma information com id invalido", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .patch(`/informations/ccfecddf-aed7-4e42-8186-44215669a53c`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedUpdatedInformation);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /informations/:id - Deve ser capaz de editar uma information", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .patch(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
  });

  test("DELETE /informations/:id - Não deve ser capaz de remover uma information sem autorização", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app).delete(
      `/informations/${informationList.body[0].id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /informations/:id - Não deve ser capaz de remover uma information com type diferente de school", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .delete(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /informations/:id - Não deve ser capaz de remover uma information com type diferente de teacher", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const studentLogin = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const response = await request(app)
      .delete(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${studentLogin.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /informations/:id - Não deve ser capaz de remover uma information com id invalido", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .delete(`/informations/ccfecddf-aed7-4e42-8186-44215669a53c`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /informations/:id - Deve ser capaz de remover uma information", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const informationList = await request(app)
      .get("/informations")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .delete(`/informations/${informationList.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
