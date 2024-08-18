import DefaultEntityType from "./default";

export default interface Promotion extends DefaultEntityType {
  id: string,
  name: string,
  active: boolean,
  points: number,
  awardId: string
}