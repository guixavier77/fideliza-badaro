import DefaultEntityType from "./default";

export default interface WalletCustomer {
  points: number;
  maxPoints: number;
  userName: string;
  promotionName: string;
  storeName: string
  active: boolean

}