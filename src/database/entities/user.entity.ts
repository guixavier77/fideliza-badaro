import DefaultEntityType from "./default";

export default interface User extends DefaultEntityType {
  id: string,
  name: string,
  email: string,
  estabId: string,
  role: 'admin' | 'customer' 
}