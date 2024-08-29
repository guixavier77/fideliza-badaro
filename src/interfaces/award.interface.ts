import DefaultEntityType from "./default";

export default interface Award extends DefaultEntityType {
  id: string,
  name: string,
  active: boolean,
  price: number,

  image?: Blob,
  image_url: string,
  image_ref: string,


}