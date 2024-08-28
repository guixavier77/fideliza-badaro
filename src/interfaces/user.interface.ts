import DefaultEntityType from "./default";

export default interface User extends DefaultEntityType {
  id: string,
  cpf: string,
  name: string,
  phone:  string,
  email: string,
  birthDate: string,
  role: 'admin' | 'customer' | 'operator',
  password: string,
  status: boolean,
  storeId: number | null

}