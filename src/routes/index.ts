import { Express } from "express";

import feedbackRoutes from "./feedback.routes";
import schoolRoutes from "./school.routes";
import sessionRoutes from "./session.routes";
import teamsRoutes from "./team.routes";
import teacherRoutes from "./teachers.routes";
import studentRoutes from "./students.routes";
import informationRoutes from "./information.routes";
import activitiesRouters from "./activities.routes";
import responsibleRoutes from "./responsibles.routes";
import gradesRouters from "./grades.routes";

const AppRoutes = (app: Express) => {
  app.use("/schools", schoolRoutes());
  app.use("/login", sessionRoutes());
  app.use("/feedback", feedbackRoutes());
  app.use("/teams", teamsRoutes());
  app.use("/teachers", teacherRoutes());
  app.use("/students", studentRoutes());
  app.use("/informations", informationRoutes());
  app.use("/activities", activitiesRouters());
  app.use("/responsibles", responsibleRoutes());
  app.use("/grades", gradesRouters())
};

export default AppRoutes;
