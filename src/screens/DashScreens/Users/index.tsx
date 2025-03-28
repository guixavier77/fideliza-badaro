'use client'
import PaginationDash from '@/components/DashComponents/PaginationDash'
import CardUser from '@/components/DashComponents/cards/cardUser'
import FilterDash from '@/components/DashComponents/filterDash'
import ModalUsers from '@/components/DashComponents/modals/ModalUsers'
import { DefaultContext } from '@/contexts/defaultContext'
import useLoadUsers from '@/hooks/useLoadUsers'
import User from '@/interfaces/user.interface'
import { colors } from '@/utils/colors/colors'
import Add from '@mui/icons-material/Add'
import { CircularProgress } from '@mui/material'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import TopDash from '@/components/DashComponents/topDash'
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
const UsersContent = ({ hidden }: any) => {
  const { storeSelected } = useContext(DefaultContext)
  const [tab, setTab] = useState('all')
  const [openUsers, setopenUsers] = useState(false)
  const [usersFilter, setUsersFilter] = useState<User[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const { users, loading } = useLoadUsers(hidden, storeSelected)

  const usersToDisplay: User[] = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return usersFilter.slice(startIndex, endIndex)
  }, [currentPage, users])

  const numberPages = useMemo(
    () =>
      usersFilter.length > 1 ? Math.ceil(usersFilter.length / itemsPerPage) : 1,
    [usersFilter],
  )

  useEffect(() => {
    if (tab === 'all') {
      setUsersFilter(users)
    } else if (tab === 'active') {
      setUsersFilter(users.filter((user) => user.active))
    } else {
      setUsersFilter(users.filter((user) => !user.active))
    }
  }, [storeSelected, users, tab])

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
        title="Usuários"
        description="Gerencie os usuários cadastrados no sistema."
        icon={PersonOutlineOutlinedIcon}
      />

      <FilterDash
        onPressItem={onPressItem}
        handleOpenModal={handleOpenUsers}
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
            {usersToDisplay?.map((user) => (
              <>
                <CardUser user={user} />
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

      <ModalUsers open={openUsers} setIsClose={handleCloseUsers} />
    </div>
  )
}

export default UsersContent
