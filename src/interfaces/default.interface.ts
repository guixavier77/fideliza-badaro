
import Store from "@/database/entities/store.entity"
import User from "@/database/entities/user.entity"

export default interface DefaultContextInterface {
  user: User | null,
  stores: Store[],
  storeSelected: string


}