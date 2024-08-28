
import Store from "@/interfaces/store.interface"
import User from "@/interfaces/user.interface"

export default interface DefaultContextInterface {
  user: User | null
  stores: Store[],
  store: Store | null,
  storeSelected: number | null,
  setstoreSelected: (e: number) => void,
  awardsDicionary: any


}