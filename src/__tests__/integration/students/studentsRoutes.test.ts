import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedStudent, mockedStudentAuth, mockedSchool, mockedTeam } from "../../mocks";
import { mockedSchoolLogin } from "../../mocks";

describe("students", () => {
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
    const schoolLogin = await request(app).post("/login").send(mockedSchoolLogin);

    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /students -  Must be able to create a student", async () => {
    const schoolLogin = await request(app).post("/login").send(mockedSchoolLogin);

    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedStudent);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body.name).toEqual("Joana");
    expect(response.body.email).toEqual("joana@mail.com");
    expect(response.status).toBe(201);
  });

  test("POST /students -  should not be able to create a student that already exists", async () => {
    const schoolLogin = await request(app).post("/login").send(mockedSchoolLogin);
    const response = await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedStudent);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /students - should not be able to create a student without authentication", async () => {
    const response = await request(app).post("/students").send(mockedStudentAuth);

    expect(response.status).toBe(401);
  });

  test("Delete /students/:id - should not be able to Delete Student without authentication", async () => {
    const schollLoginResponse = await request(app).post("/login").send(mockedSchoolLogin);
    const StudentTobeDeleted = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);
    const response = await request(app).delete(`/students/${StudentTobeDeleted.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Delete /students/:id - should not be able to Delete Student with invalid id", async () => {
    const schollLoginResponse = await request(app).post("/login").send(mockedSchoolLogin);
    await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/students/302430-2`)
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("GET /students/:id - should be able to list specific student", async () => {
    const schoolLogin = await request(app).post("/login").send(mockedSchoolLogin);

    const student = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    const response = await request(app)
      .get(`/students/${student.body[0].id}`)
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("type");
    expect(response.body).toHaveProperty("shift");
    expect(response.body).toHaveProperty("team");
    expect(response.body).toHaveProperty("registration");
    expect(response.body).toHaveProperty("feedbacks");
  });

  test("GET /students/:id - should not be able to list specific student without authentication", async () => {
    const response = await request(app).get("/students/:id");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /students/:id - should not be able to list specific student with invalid id", async () => {
    const schoolLogin = await request(app).post("/login").send(mockedSchoolLogin);
    const response = await request(app)
      .get("/students/40291490asdk")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("Delete /students/:id - should not be able to Delete Student without authentication", async () => {
    const schollLoginResponse = await request(app).post("/login").send(mockedSchoolLogin);
    const StudentTobeDeleted = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);
    const response = await request(app).delete(`/students/${StudentTobeDeleted.body[0].id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Delete /students/:id - should not be able to Delete Student with invalid id", async () => {
    const schoolLoginResponse = await request(app).post("/login").send(mockedSchoolLogin);
    await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schoolLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/students/302430-2`)
      .set("Authorization", `Bearer ${schoolLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("PATCH /students/:id - should be able to update student", async () => {
    const schollLoginResponse = await request(app).post("/login").send(mockedSchoolLogin);

    const StudentTobeUpdated = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/students/${StudentTobeUpdated.body[0].id}`)
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`)
      .send(mockedStudentAuth);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).not.toHaveProperty("password");
    expect(response.status).toBe(200);
  });

  test("Update /students/:id - should not be able to Update Student with invalid id", async () => {
    const schollLoginResponse = await request(app).post("/login").send(mockedSchoolLogin);
    await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/students/302430-2`)
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("Update /students/:id - should not be able to Update Student without authentication", async () => {
    const schollLoginResponse = await request(app).post("/login").send(mockedSchoolLogin);
    const StudentTobeUpdated = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);
    const response = await request(app).patch(`/students/${StudentTobeUpdated.body[0].id}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("Delete /students/:id - should be able to Delete Student", async () => {
    const schollLoginResponse = await request(app).post("/login").send(mockedSchoolLogin);
    const StudentTobeDeleted = await request(app)
      .get("/students")
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/students/${StudentTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${schollLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
