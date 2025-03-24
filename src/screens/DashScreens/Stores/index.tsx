'use client'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DefaultContext } from '@/contexts/defaultContext'
import Store from '@/interfaces/store.interface'
import Add from '@mui/icons-material/Add'
import PaginationDash from '@/components/DashComponents/PaginationDash'
import CardStore from '@/components/DashComponents/cards/cardStore'
import ModalStores from '@/components/DashComponents/modals/ModalStores'
import api from '@/services/api'
import FilterDash from '@/components/DashComponents/filterDash'
import TopDash from '@/components/DashComponents/topDash'
import StoreOutlined from '@mui/icons-material/StoreOutlined'

const TABS = [
  {
    name: 'Ativos',
    value: 'active',
  },
  {
    name: 'Inativos',
    value: 'inactive',
  },
  {
    name: 'Todos',
    value: 'all',
  },
]
let itemsPerPage = 7

const StoresContent = ({ hidden }: any) => {
  const { stores } = useContext(DefaultContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [tab, setTab] = useState('all')
  const [openUsers, setopenUsers] = useState(false)
  const [storesFilter, setStoresFilter] = useState<Store[]>([])
  const numberPages = useMemo(
    () =>
      storesFilter.length > 0
        ? Math.ceil(storesFilter.length / itemsPerPage)
        : 1,
    [storesFilter],
  )

  useEffect(() => {
    if (!stores) return
    if (tab === 'all') {
      setStoresFilter(stores)
    } else if (tab === 'active') {
      setStoresFilter(stores.filter((store) => store.active))
    } else {
      setStoresFilter(stores.filter((store) => !store.active))
    }
  }, [stores, tab])

  const onPressItem = (item: any) => {
    setTab(item)
  }
  const handleOpenUsers = useCallback(() => {
    setopenUsers(true)
  }, [])

  const handleCloseUsers = useCallback(() => {
    setopenUsers(false)
  }, [])
  return (
    <div hidden={hidden} className="w-full relative">
      <TopDash
        title="Lojas"
        description="Gerencie as lojas cadastradas no sistema."
        icon={StoreOutlined}
      />
      <FilterDash
        onPressItem={onPressItem}
        handleOpenModal={handleOpenUsers}
        tab={tab}
      />

      <div className="flex flex-col gap-4 mt-10">
        {storesFilter?.map((store: Store) => (
          <>
            <CardStore store={store} />
          </>
        ))}
      </div>

      <div className="absolute bottom-20 mt-10 right-0">
        <PaginationDash
          count={numberPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <ModalStores open={openUsers} setIsClose={handleCloseUsers} />
    </div>
  )
}

export default StoresContent
