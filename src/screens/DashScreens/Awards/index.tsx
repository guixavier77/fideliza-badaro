'use client'
import ModalAwards from '@/components/DashComponents/modals/ModalAwards'
import PaginationDash from '@/components/DashComponents/PaginationDash'
import CardAwards from '@/components/DashComponents/cards/cardAwards'
import { DefaultContext } from '@/contexts/defaultContext'
import Award from '@/interfaces/award.interface'
import api from '@/services/api'
import { colors } from '@/utils/colors/colors'
import { TABS_FILTER } from '@/utils/types/tabs'
import Add from '@mui/icons-material/Add'
import { CircularProgress } from '@mui/material'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useLoadAwards from '@/hooks/useLoadAwards'
import FilterDash from '@/components/DashComponents/filterDash'

let itemsPerPage = 7

const AwardsContent = ({ hidden }: any) => {
  const { storeSelected } = useContext(DefaultContext)
  const [tab, setTab] = useState('all')
  const [openModal, setopenModal] = useState(false)
  const [awardsFilter, setAwardsfilter] = useState<Award[]>()
  const [currentPage, setCurrentPage] = useState(1)
  const { awards, loading } = useLoadAwards(hidden, storeSelected)
  const numberPages = useMemo(
    () => (awards.length > 0 ? Math.ceil(awards.length / itemsPerPage) : 1),
    [awards],
  )
  useEffect(() => {
    if (tab === 'all') {
      setAwardsfilter(awards)
    } else if (tab === 'active') {
      setAwardsfilter(awards?.filter((data) => data.active))
    } else {
      setAwardsfilter(awards?.filter((data) => !data.active))
    }
  }, [awards, tab])

  const dataToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return awardsFilter?.slice(startIndex, endIndex)
  }, [currentPage, awardsFilter])

  const onPressItem = (item: any) => {
    setTab(item)
  }
  const handleOpenModal = useCallback(() => {
    setopenModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setopenModal(false)
  }, [])
  return (
    <div hidden={hidden} className="w-full relative">
      <FilterDash
        onPressItem={onPressItem}
        handleOpenModal={handleOpenModal}
        tab={tab}
      />
      {loading ? (
        <>
          <div className="flex h-3/4 justify-center w-full items-center">
            <CircularProgress
              style={{ width: 80, height: 80, color: colors.red }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-10">
            {dataToDisplay?.map((data: Award) => (
              <>
                <CardAwards award={data} />
              </>
            ))}
          </div>
        </>
      )}

      <div className="absolute bottom-20 mt-10 right-0">
        <PaginationDash
          count={numberPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <ModalAwards open={openModal} setIsClose={handleCloseModal} />
    </div>
  )
}

export default AwardsContent
