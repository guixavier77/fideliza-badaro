
import Store from "@/interfaces/store.interface"
import User from "@/interfaces/user.interface"
import Award from "./award.interface"
import Promotion from "./promotion.interface"

export default interface DefaultContextInterface {
  user: User | null
  stores: Store[],
  awards: Award[]
  promotions: Promotion[],
  store: Store | null,
  storeSelected: number | null,
  setstoreSelected: (e: number) => void,


}