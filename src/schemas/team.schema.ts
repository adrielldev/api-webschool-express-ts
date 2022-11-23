import * as yup from "yup";
import { SchemaOf } from "yup";
import { ITeamsRequest } from "../interfaces/teams";

const teamSchema: SchemaOf<ITeamsRequest> = yup.object().shape({
  name: yup.string().required(),
});

export { teamSchema };
