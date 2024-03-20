import DefaultEntityType from "./default";

export default interface User extends DefaultEntityType {
  id: string,
  cpf: string,
  name: string,
  phone:  string,
  email: string,
  birthDate: string,
  role: 'admin' | 'customer',
  password: string,
  status: boolean,

}