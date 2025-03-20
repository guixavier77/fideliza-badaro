'use client'
import { useState, useMemo } from 'react';
import PaginationDash from '@/components/DashComponents/PaginationDash';


let itemsPerPage = 7;
const ReewardsContent = ({ hidden }: any) => {;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([])
  const numberPages = useMemo(() => data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1, [data]);


  return (
    <div hidden={hidden} className='h-full w-full relative'>
      <div className='flex flex-col gap-4 mt-10'>
        {/* {usersFilter.map((user) =>
          <>
            <CardPromotion promotion={user} />
          </>
        )} */}
      </div>

      <div className='absolute bottom-20 mt-10 right-0'>
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