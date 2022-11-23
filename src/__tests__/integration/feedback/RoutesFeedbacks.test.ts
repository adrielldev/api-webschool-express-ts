import { DataSource } from "typeorm";
import request from "supertest";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import {
  mockedFeedback,
  mockedFeedbackBranco,
  mockedFeedbackUpdated,
  mockedSchool,
  mockedSchoolLogin,
  mockedStudent,
  mockedStudentLogin,
  mockedTeacher,
  mockedTeacherLogin,
  mockedTeam,
  mockedTeam2,
} from "../../mocks";

describe("testando feedbacks", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

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

    await request(app)
      .post("/teachers")
      .set("Authorization", `Bearer ${loginSchool.body.token}`)
      .send(mockedTeacher);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /feedback - deve criar um feedback sendo um professor", async () => {
    const schoolLogin = await request(app)
      .post("/login")
      .send(mockedSchoolLogin);

    await request(app)
      .post("/teachers")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeacher);

    await request(app)
      .post("/teams")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedTeam);

    await request(app)
      .post("/students")
      .set("Authorization", `Bearer ${schoolLogin.body.token}`)
      .send(mockedStudent);

    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .post("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedback);

    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("feedback");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("id");
    expect(response.status).toBe(201);
  });

  test("POST /feedback - tentando criar um feedback em branco", async () => {
    await request(app).post("/teachers").send(mockedTeacher);
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const response = await request(app)
      .post("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedbackBranco);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /feedback - tentando criar um feedback sendo um aluno", async () => {
    await request(app).post("/student").send(mockedStudent);
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
    const response = await request(app)
      .post("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedback);

    expect(response.body.type).not.toBe("aluno");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });

  test("POST /feedback - tentando criar um feedback sem estar logado", async () => {
    const response = await request(app).post("/feedback").send(mockedFeedback);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("GET /feedback - pegando feedbacks", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    TeacherResponse.body;

    const response = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
    response.body;
    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test("GET /feedback - tentando pegar feedbacks sem estar logado", async () => {
    const response = await request(app).get("/feedback");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /feedback - tentando editar um feedback sendo um professor", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);
    const FeedbackTobe = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);

    const response = await request(app)
      .patch(`/feedback/${FeedbackTobe.body[0].id}`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedbackUpdated);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /feedback - tentando editar um feedback sendo um aluno", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedStudentLogin);

    const FeedbackTobeDeleted = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);

    const response = await request(app)
      .patch(`/feedback/${FeedbackTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedbackUpdated);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /feedback - tentando editar um feedback sem id", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .patch(`/feedback/nada`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`)
      .send(mockedFeedbackUpdated);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("PATCH /feedback - tentando editar um feedback sem estar logado", async () => {
    const response = await request(app)
      .patch(`/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .send(mockedFeedbackUpdated);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /feedback - tentando deleta um feedback sendo um aluno", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedStudentLogin);
    const FeedbackTobeDeleted = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);

    const response = await request(app)
      .delete(`/feedback/${FeedbackTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /feedback - tentando deleta um feedback sem id valido", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const response = await request(app)
      .delete(`/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /feedback - tentando deleta um feedback sem estar logado", async () => {
    const response = await request(app).delete(
      `/feedback/13970660-5dbe-423a-9a9d-5c23b37943cf`
    );
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /feedback - deletando um feedback sendo um professor", async () => {
    const TeacherResponse = await request(app)
      .post("/login")
      .send(mockedTeacherLogin);

    const FeedbackTobeDeleted = await request(app)
      .get("/feedback")
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);

    const response = await request(app)
      .delete(`/feedback/${FeedbackTobeDeleted.body[0].id}`)
      .set("Authorization", `Bearer ${TeacherResponse.body.token}`);
    expect(response.status).toBe(204);
  });
});
