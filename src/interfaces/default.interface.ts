
import Store from "@/interfaces/store.interface"
import User from "@/interfaces/user.interface"
import Award from "./award.interface"
import Promotion from "./promotion.interface"
import FeedBackStatusInterface from "./feedbackStatus"

export default interface DefaultContextInterface {
  user: User | null
  setuser: (e: User | null) => void,
  stores: Store[],
  store: Store | null,
  storeSelected: number | null,
  setstoreSelected: (e: number) => void,
  onShowFeedBack: (data: FeedBackStatusInterface) => void


}