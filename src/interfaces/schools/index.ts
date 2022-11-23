export interface IAddressRequest {
  state: string;
  city: string;
  district: string;
  number: string;
  zipCode: string;
}

export interface ISchoolRequest {
  name: string;
  email: string;
  password: string;
  director: string;
  address: IAddressRequest;
}
