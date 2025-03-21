'use client'
import { useState, useMemo } from 'react'
import PaginationDash from '@/components/DashComponents/PaginationDash'
import TopDash from '@/components/DashComponents/topDash'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'

let itemsPerPage = 7
const ReewardsContent = ({ hidden }: any) => {
  const [currentPage, setCurrentPage] = useState(1)
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
