'use client'
import { useState, useMemo } from 'react'
import PaginationDash from '@/components/DashComponents/PaginationDash'
import TopDash from '@/components/DashComponents/topDash'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import { TABS_FILTER } from '@/utils/types/tabs'

const tabs = [
  {
    name: 'Resolvidas',
    value: 'active',
  },
  {
    name: 'Pendentes',
    value: 'inactive',
  },
  {
    name: 'Todas',
    value: 'all'
  }
]

let itemsPerPage = 7
const ReewardsContent = ({ hidden }: any) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [tab, setTab] = useState<any>("all");
  const [data, setData] = useState<any[]>([])
  const numberPages = useMemo(
    () => (data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1),
    [data],
  )

  return (
    <div hidden={hidden} className="h-full w-full relative">
      <TopDash
        title="Solicitações"
        description="Acompanhe as solicitações de resgate dos prêmios das promoções."
        icon={EmojiEventsOutlinedIcon}
      />

    <div className="flex justify-center w-full gap-4">
      <div className="flex bg-black justify-center rounded-xl shadow-lg w-full">
        <div className="flex justify-between w-full items-center px-10 py-2">
          {tabs.map((item) => (
            <button
              onClick={() => setTab(item.value)}
              className={`${tab === item.value ? 'bg-red  rounded-xl ' : ''} px-6 `}
            >
              <p className="text-white text-xl font-normal">{item.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>

      <div className="flex flex-col gap-4 mt-10">
        {/* {usersFilter.map((user) =>
          <>
            <CardPromotion promotion={user} />
          </>
        )} */}
      </div>

      <div className="absolute bottom-20 mt-10 right-0">
        <PaginationDash
          count={numberPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default ReewardsContent
