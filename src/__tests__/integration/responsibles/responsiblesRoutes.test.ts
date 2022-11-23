import {
  mockedResponsible,
  mockedResponsibleAuth,
  mockedSchool,
  mockedSchoolLogin,
  mockedStudent,
  mockedTeam,
  mockedTeam2,
} from "../../mocks";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";

describe("responsibles", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    await request(app).post("/schools").send(mockedSchool);

    const school = await request(app).post("/login").send(mockedSchoolLogin);

    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${school.body.token}`)
      .send(mockedTeam);
    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${school.body.token}`)
      .send(mockedTeam2);

    await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${school.body.token}`)
      .send(mockedStudent);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /responsibles - Must be able to create a responsible", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const response = await request(app)
      .post("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedResponsible);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Pai da Joana");
    expect(response.body.email).toEqual("responsaveljoana@mail.com");
    expect(response.status).toBe(201);
  });

  test("POST /responsibles - should not be able to create a responsible that already exists", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .post("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedResponsible);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
  test("POST /responsibles - should not be able to create a responsible without authentication", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .post("/responsibles")
      .send(mockedResponsibleAuth);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /responsibles - should be able to list responsibles", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /responsibles - should not be able to list responsibles without authentication", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const response = await request(app).get("/responsibles");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /responsibles/:id - should be able to list an especific responsible", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const responsibles = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .get(`/responsibles/${responsibles.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Pai da Joana");
    expect(response.body.email).toEqual("responsaveljoana@mail.com");
    expect(response.status).toBe(200);
  });

  test("GET /responsibles/:id - should not be able to list an especific responsible without authentication", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const responsibles = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app).get(
      `/responsibles/${responsibles.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /responsibles/:id - should not be able to list an especific responsible with invalid id", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    const response = await request(app)
      .get("/responsibles/2904129049120-890E890ASD")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("UPDATE /responsibles/:id - should be able to update an especific responsible", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const responsibles = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .patch(`/responsibles/${responsibles.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedResponsibleAuth);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Pai do Mario");
    expect(response.body.email).toEqual("responsavelmario@mail.com");
    expect(response.status).toBe(200);
  });

  test("UPDATE /responsibles/:id - should not be able to update an especific responsible without authentication", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const responsibles = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .patch(`/responsibles/${responsibles.body[0].id}`)
      .send(mockedResponsibleAuth);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
  test("UPDATE /responsibles/:id - should not be able to update an especific responsible with invalid id", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const responsibles = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .patch(`/responsibles/4120-40-12`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedResponsibleAuth);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /responsibles/:id - should not be able to delete an especific responsible without authentication", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const responsibles = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app).delete(
      `/responsibles/${responsibles.body[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /responsibles/:id - should not be able to delete an especific responsible with invalid id", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const responsibles = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .delete(`/responsibles/23523523523`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("DELETE /responsibles/:id - should be able to delete an especific responsible", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);
    const responsibles = await request(app)
      .get("/responsibles")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .delete(`/responsibles/${responsibles.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.status).toBe(204);
  });
});
