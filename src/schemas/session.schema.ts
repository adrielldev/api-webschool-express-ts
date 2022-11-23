import * as yup from "yup";
import { SchemaOf } from "yup";
import { ISessionRequest } from "../interfaces/sessions";

const sessionSchema: SchemaOf<ISessionRequest> = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

export { sessionSchema };
