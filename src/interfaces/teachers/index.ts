export interface ITeachersRequest {
  name: string;
  email: string;
  password: string;
  shift: string;
  matter: string;
  teams: Array<string>;
}

export interface ITeacherResponse {
  name: string;
  email: string;
  id: string;
  type: string;
  shift: string;
  matter: string;
}
