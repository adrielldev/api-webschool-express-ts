import * as yup from "yup";
import { SchemaOf } from "yup";
import { IActivitieRequest } from "../interfaces/activities/iindex";

const activitiesSchema: SchemaOf<IActivitieRequest> = yup.object().shape({
  title: yup.string().required(),
  url: yup.string().required(),
  student: yup.string().required(),
});

export { activitiesSchema };