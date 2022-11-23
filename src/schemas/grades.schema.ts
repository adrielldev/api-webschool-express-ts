import * as yup from "yup";
import { SchemaOf } from "yup";
import { IGradesRequest } from "../interfaces/grades";

const gradesSchema: SchemaOf<IGradesRequest> = yup.object().shape({
  matter: yup.string().required(),
  grade: yup.number().required(),
  student: yup.string().required(),
});

export { gradesSchema };