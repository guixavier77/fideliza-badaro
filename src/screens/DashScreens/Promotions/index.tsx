'use client'
import { useCallback, useContext, useEffect, useState, useMemo } from 'react'
import { DefaultContext } from '@/contexts/defaultContext'
import Promotion from '@/interfaces/promotion.interface'
import { TABS_FILTER } from '@/utils/types/tabs'
import Add from '@mui/icons-material/Add'
import CardPromotion from '@/components/DashComponents/cards/cardPromotion'
import PaginationDash from '@/components/DashComponents/PaginationDash'
import ModalPromotions from '@/components/DashComponents/modals/ModalPromotions'
import useLoadPromotions from '@/hooks/useLoadPromotions'
import FilterDash from '@/components/DashComponents/filterDash'
import TopDash from '@/components/DashComponents/topDash'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
let itemsPerPage = 4
const PromotionsContent = ({ hidden }: any) => {
  const [tab, setTab] = useState('all')
  const { promotions, loading } = useLoadPromotions(hidden)
  const [openPromotion, setopenPromotion] = useState(false)
  const [promotionsFilter, setPromotionsFilter] = useState<Promotion[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const numberPages = useMemo(
    () =>
      promotionsFilter.length > 0
        ? Math.ceil(promotionsFilter.length / itemsPerPage)
        : 1,
    [promotionsFilter],
  )

  const promotionsFilterDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return promotionsFilter.slice(startIndex, endIndex)
  }, [currentPage, promotionsFilter])

  useEffect(() => {
    if (tab === 'all') {
      setPromotionsFilter(promotions)
    } else if (tab === 'active') {
      setPromotionsFilter(promotions.filter((user) => user.active))
    } else {
      setPromotionsFilter(promotions.filter((user) => !user.active))
    }
  }, [promotions, tab])

  const onPressItem = (item: any) => {
    setTab(item)
  }
  const handleOpenUsers = useCallback(() => {
    setopenPromotion(true)
  }, [])

  const handleClosePromotion = useCallback(() => {
    setopenPromotion(false)
  }, [])
  return (
    <div hidden={hidden} className="w-full relative">
      <TopDash
        title="Promoções"
        description="Crie e gerencie promoções para seus clientes, com opções de resgate de prêmios."
        icon={MonetizationOnOutlinedIcon}
      />
      <FilterDash
        onPressItem={onPressItem}
        handleOpenModal={handleOpenUsers}
        tab={tab}
      />

      {loading ? (
        <></>
      ) : (
        <div className="flex flex-row flex-wrap justify-center gap-4 mt-10">
          {promotionsFilterDisplay.map((promotion) => (
            <>
              <CardPromotion promotion={promotion} />
            </>
          ))}
        </div>
      )}

      <div className="absolute bottom-20 mt-10 right-0">
        <PaginationDash
          count={numberPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <ModalPromotions open={openPromotion} setIsClose={handleClosePromotion} />
    </div>
  )
}

export default PromotionsContent
