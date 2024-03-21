import DefaultEntityType from "./default";

export default interface Store extends DefaultEntityType {
  id: string,
  cnpj: string,
  name: string,
  phone:  string,
  email: string,
  address: {
    cep: string,
    uf: string,
    city: string,
    neighborhood: string,
    street: string,
    number: string,
  },
  status: boolena,

}