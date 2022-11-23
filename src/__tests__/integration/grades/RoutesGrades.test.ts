import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
    mockedActivitie,
    mockedActivitieWithoutEmail,
    mockedTeacher,
    mockedTeacherLogin, mockedSchool, mockedSchoolLogin, mockedStudent, mockedActivitieUpdate, mockedTeam, mockedTeam2, mockedGrade, mockedStudentLogin, mockedUpdatedGrade
} from "../../mocks";

    describe("/grades", () => {
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

    test("POST /grades - Deve ser capaz de lançar a atividade", async () => {
        const schoolResponse = await request(app).post("/schools").send(mockedSchool);
        const loginSchool = await request(app).post("/login").send(mockedSchoolLogin);
        
        const responseTeams = await request(app)
            .post("/teams")
            .set("Authorization", `Bearer ${loginSchool.body.token}`)
            .send(mockedTeam);
        const responseTeams2 = await request(app)
        .post("/teams")
        .set("Authorization", `Bearer ${loginSchool.body.token}`)
        .send(mockedTeam2);

        const teacherResponse = await request(app)
            .post("/teachers")
            .set("Authorization", `Bearer ${loginSchool.body.token}`)
            .send(mockedTeacher);

        const studentResponse = await request(app)
            .post("/students")
            .set("Authorization", `Bearer ${loginSchool.body.token}`)
            .send(mockedStudent);

        const loginTeacher = await request(app).post("/login").send(mockedTeacherLogin)
        const response = await request(app).post("/grades").set("Authorization", `Bearer ${loginTeacher.body.token}`).send(mockedGrade)

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("matter");
        expect(response.body).toHaveProperty("grade");
        expect(response.body).toHaveProperty("student");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.matter).toEqual("Node.js");
        expect(response.body.student[0].email).toEqual("joana@mail.com");
        expect(response.status).toBe(201);
    });

    test("POST /grades - Não deve ser capaz de lançar atividade sem autenticação", async ()=> {
        const response = await request(app).post("/grades").send(mockedActivitie)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400)
    })

    test("POST /grades - Não deve ser capaz de lançar atividade usuários que não sejam professores ou escola", async ()=> {
        const loginStudent = await request(app).post("/login").send(mockedStudentLogin);
        const response = await request(app).post("/grades").set("Authorization", `Bearer ${loginStudent.body.token}`).send(mockedGrade)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(403)
    })

    test("GET /grades/:id - Não deve ser capaz de listar com ID errado", async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
    
        const response = await request(app)
            .get(`/grades/13970660-5dbe-423a-9a9d-5c23b37943cf`)
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });

    test("GET /grades/:id - Não deve ser capaz de listar atividade sem autenticação", async ()=> {
        const response = await request(app).get(`/grades/13970660-5dbe-423a-9a9d-5c23b37943cf`)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401)
    })

    test("GET /grades/:id -  Deve ser capaz de listar as atividades por ID", async () => {
        const loginTeacher = await request(app).post("/login").send(mockedTeacherLogin)
        const responseGrade = await request(app).post("/grades").set("Authorization", `Bearer ${loginTeacher.body.token}`).send(mockedGrade)
        const response = await request(app)
            .get(`/grades/${responseGrade.body.id}`)
            .set("Authorization", `Bearer ${loginTeacher.body.token}`);
    
        expect(response.status).toBe(200);
    });

    test("Patch /grades/:id -  Não deve ser capaz de alterar sem autenticação de usuário", async () => {
        const response = await request(app).patch(`/grades/13970660-5dbe-423a-9a9d-5c23b37943cf`)
    
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("PATCH /grades/:id - Deve ser capaz de alterar o cadastro da nota", async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
    
        const gradeTobeUpdated = await request(app)
            .post("/grades")
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`).send(mockedGrade);
    
        const response = await request(app)
            .patch(`/grades/${gradeTobeUpdated.body.id}`)
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`)
            .send(mockedUpdatedGrade);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("matter");
        expect(response.body).toHaveProperty("grade");
        expect(response.body).toHaveProperty("student");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.grade).toEqual(99.90);
        expect(response.body.student[0].email).toEqual("joana@mail.com");
        expect(response.status).toBe(200);
    });

    test("DELETE /grades/:id -  Não deve ser capaz de excluir sem autenticação de usuário", async () => {
        const response = await request(app).delete(`/grades/13970660-5dbe-423a-9a9d-5c23b37943cf`);
    
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("DELETE /grades/:id - Não deve ser capaz de deletar com ID errado", async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
    
        const response = await request(app)
            .get(`/grades/13970660-5dbe-423a-9a9d-5c23b37943cf`)
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /grades/:id -  Deve ser capaz de excluir uma atividade", async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        const grade = await request(app).post("/grades").set("Authorization", `Bearer ${teacherLoginResponse.body.token}`).send(mockedGrade) 

        const response = await request(app)
            .delete(`/grades/${grade.body.id}`)
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

        expect(response.status).toBe(204);
    });
})