import { MigrationInterface, QueryRunner } from "typeorm";

export class addNewEntities1663158078287 implements MigrationInterface {
    name = 'addNewEntities1663158078287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying(2) NOT NULL, "city" character varying(50) NOT NULL, "district" character varying(256) NOT NULL, "number" character varying(128) NOT NULL, "zipCode" character varying(8) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schools" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(150) NOT NULL, "type" character varying NOT NULL DEFAULT 'school', "director" character varying(56) NOT NULL, "addressId" uuid, CONSTRAINT "UQ_74a5374cf6d1c970dd47f888bf6" UNIQUE ("email"), CONSTRAINT "REL_55332608bccd7ac09cdab11855" UNIQUE ("addressId"), CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "schoolId" uuid, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(150) NOT NULL, "type" character varying NOT NULL DEFAULT 'teacher', "shift" character varying(25) NOT NULL, "matter" character varying(50) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feedbacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "feedback" character varying(200) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "teacherId" uuid, "studentId" uuid, CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "responsibles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'responsible', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_c3086650c39c8b98146aeb37e1f" UNIQUE ("email"), CONSTRAINT "PK_3bfd9b63cf33352711d7c82bab3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(150) NOT NULL, "type" character varying NOT NULL DEFAULT 'student', "registration" character varying(50) NOT NULL, "shift" character varying(25) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "teamId" uuid, "responsiblesId" uuid, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "UQ_13e880a37642d39be55a6bb49ff" UNIQUE ("registration"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "url" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "matter" character varying NOT NULL, "grade" numeric(4,2) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "informations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_3e27903b20087cf4d880bb91ac3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers_teams_teams" ("teachersId" uuid NOT NULL, "teamsId" uuid NOT NULL, CONSTRAINT "PK_e9e64542edbcaa79c47bb003b7e" PRIMARY KEY ("teachersId", "teamsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d5130f5639bdec788b4a5c7b93" ON "teachers_teams_teams" ("teachersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7fde41bc5a9592f5b759f46c34" ON "teachers_teams_teams" ("teamsId") `);
        await queryRunner.query(`CREATE TABLE "activities_student_students" ("activitiesId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_6c13b9fdc1f65e72e8a2e368632" PRIMARY KEY ("activitiesId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af2c48f5e1aaccdf4f9f54f748" ON "activities_student_students" ("activitiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f2011c995e383760562216665" ON "activities_student_students" ("studentsId") `);
        await queryRunner.query(`CREATE TABLE "grades_student_students" ("gradesId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_4ded15511649e0047f1e356065b" PRIMARY KEY ("gradesId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4f02cbf37c2c9808a3256163c6" ON "grades_student_students" ("gradesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2397bea6200c4cab4327759f3b" ON "grades_student_students" ("studentsId") `);
        await queryRunner.query(`ALTER TABLE "schools" ADD CONSTRAINT "FK_55332608bccd7ac09cdab118556" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_1ba3c771ceea80af631b284a47b" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_165a973a9ecf1c3eb34a2524c48" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_68fabd60b33f830d0f0c4d2bf25" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_1772a9f1f75e1172c19b0390e71" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_59c56fc1da9907309c52f839a07" FOREIGN KEY ("responsiblesId") REFERENCES "responsibles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers_teams_teams" ADD CONSTRAINT "FK_d5130f5639bdec788b4a5c7b93c" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_teams_teams" ADD CONSTRAINT "FK_7fde41bc5a9592f5b759f46c34d" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities_student_students" ADD CONSTRAINT "FK_af2c48f5e1aaccdf4f9f54f748d" FOREIGN KEY ("activitiesId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activities_student_students" ADD CONSTRAINT "FK_0f2011c995e3837605622166656" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "grades_student_students" ADD CONSTRAINT "FK_4f02cbf37c2c9808a3256163c67" FOREIGN KEY ("gradesId") REFERENCES "grades"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "grades_student_students" ADD CONSTRAINT "FK_2397bea6200c4cab4327759f3be" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grades_student_students" DROP CONSTRAINT "FK_2397bea6200c4cab4327759f3be"`);
        await queryRunner.query(`ALTER TABLE "grades_student_students" DROP CONSTRAINT "FK_4f02cbf37c2c9808a3256163c67"`);
        await queryRunner.query(`ALTER TABLE "activities_student_students" DROP CONSTRAINT "FK_0f2011c995e3837605622166656"`);
        await queryRunner.query(`ALTER TABLE "activities_student_students" DROP CONSTRAINT "FK_af2c48f5e1aaccdf4f9f54f748d"`);
        await queryRunner.query(`ALTER TABLE "teachers_teams_teams" DROP CONSTRAINT "FK_7fde41bc5a9592f5b759f46c34d"`);
        await queryRunner.query(`ALTER TABLE "teachers_teams_teams" DROP CONSTRAINT "FK_d5130f5639bdec788b4a5c7b93c"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_59c56fc1da9907309c52f839a07"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_1772a9f1f75e1172c19b0390e71"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_68fabd60b33f830d0f0c4d2bf25"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_165a973a9ecf1c3eb34a2524c48"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_1ba3c771ceea80af631b284a47b"`);
        await queryRunner.query(`ALTER TABLE "schools" DROP CONSTRAINT "FK_55332608bccd7ac09cdab118556"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2397bea6200c4cab4327759f3b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f02cbf37c2c9808a3256163c6"`);
        await queryRunner.query(`DROP TABLE "grades_student_students"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f2011c995e383760562216665"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af2c48f5e1aaccdf4f9f54f748"`);
        await queryRunner.query(`DROP TABLE "activities_student_students"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7fde41bc5a9592f5b759f46c34"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5130f5639bdec788b4a5c7b93"`);
        await queryRunner.query(`DROP TABLE "teachers_teams_teams"`);
        await queryRunner.query(`DROP TABLE "informations"`);
        await queryRunner.query(`DROP TABLE "grades"`);
        await queryRunner.query(`DROP TABLE "activities"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "responsibles"`);
        await queryRunner.query(`DROP TABLE "feedbacks"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "schools"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
