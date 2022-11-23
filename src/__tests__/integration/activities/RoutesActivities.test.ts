import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
    mockedActivitie,
    mockedActivitieWithoutEmail,
    mockedTeacher,
    mockedTeacherLogin, mockedSchool, mockedSchoolLogin, mockedStudent, mockedActivitieUpdate, mockedTeam, mockedTeam2
} from "../../mocks";

    describe("/activities", () => {
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

    test("POST /activities - Deve ser capaz de lançar a atividade", async () => {
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
        const response = await request(app).post("/activities").set("Authorization", `Bearer ${loginTeacher.body.token}`).send(mockedActivitie)

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("url");
        expect(response.body).toHaveProperty("student");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.title).toEqual("Criando banco de dados");
        expect(response.body.student[0].email).toEqual("joana@mail.com");
        expect(response.status).toBe(201);
    });

    test("POST /Activities - Não deve ser capaz de lançar atividade sem autenticação", async ()=> {
        const response = await request(app).post("/activities").send(mockedActivitie)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401)
    })

    test("GET /Activities/:id - Não deve ser capaz de listar com ID errado", async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
    
        const response = await request(app)
            .get(`/activities/13970660-5dbe-423a-9a9d-5c23b37943cf`)
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });

    test("GET /Activities/:id - Não deve ser capaz de listar atividade sem autenticação", async ()=> {
        const response = await request(app).get(`/activities/13970660-5dbe-423a-9a9d-5c23b37943cf`)

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401)
    })

    test("GET /activities/:id -  Deve ser capaz de listar as atividades por ID", async () => {
        const loginTeacher = await request(app).post("/login").send(mockedTeacherLogin)
        const responseActivitie = await request(app).post("/activities").set("Authorization", `Bearer ${loginTeacher.body.token}`).send(mockedActivitie)
        const response = await request(app)
            .get(`/activities/${responseActivitie.body.id}`)
            .set("Authorization", `Bearer ${loginTeacher.body.token}`);
    
        expect(response.status).toBe(200);
    });

    test("Patch /activities/:id -  Não deve ser capaz de alterar sem autenticação de usuário", async () => {
        const response = await request(app).patch(`/activities/13970660-5dbe-423a-9a9d-5c23b37943cf`)
    
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("PATCH /activities/:id - Deve ser capaz de alterar o cadastro da atividade", async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
    
        const activitieTobeUpdated = await request(app)
            .post("/activities")
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`).send(mockedActivitie);
    
        const response = await request(app)
            .patch(`/activities/${activitieTobeUpdated.body.id}`)
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`)
            .send(mockedActivitieUpdate);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("url");
        expect(response.body).toHaveProperty("student");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.title).toEqual("Introdução ao Express");
        expect(response.body.student[0].email).toEqual("joana@mail.com");
        expect(response.status).toBe(200);
    });

    test("DELETE /activities/:id -  Não deve ser capaz de excluir sem autenticação de usuário", async () => {
        const response = await request(app).delete(`/activities/13970660-5dbe-423a-9a9d-5c23b37943cf`);
    
        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });

    test("DELETE /activities/:id - Não deve ser capaz de deletar com ID errado", async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
    
        const response = await request(app)
            .get(`/activities/13970660-5dbe-423a-9a9d-5c23b37943cf`)
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);
        
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message");
    });

    test("DELETE /activities/:id -  Deve ser capaz de excluir uma atividade", async () => {
        const teacherLoginResponse = await request(app).post("/login").send(mockedTeacherLogin);
        const activitie = await request(app).post("/activities").set("Authorization", `Bearer ${teacherLoginResponse.body.token}`).send(mockedActivitie) 

        const response = await request(app)
            .delete(`/activities/${activitie.body.id}`)
            .set("Authorization", `Bearer ${teacherLoginResponse.body.token}`);

        expect(response.status).toBe(204);
    });
})