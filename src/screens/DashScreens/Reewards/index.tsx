'use client'
import { useState, useMemo } from 'react';
import PaginationDash from '@/components/DashComponents/PaginationDash';


let itemsPerPage = 7;
const ReewardsContent = ({ hidden }: any) => {;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([])
  const numberPages = useMemo(() => data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1, [data]);


  return (
    <div hidden={hidden} className='h-full relative w-full'>

      <div className='w-full flex justify-between gap-4' >
        <div className='bg-black rounded-40 w-full  shadow-xl'>
          <div className='flex items-center justify-between py-4 px-10'>
            

          </div>
        </div>
      </div>

      <div className='mt-10 flex flex-col gap-4'>
        {/* {usersFilter.map((user) =>
          <>
            <CardPromotion promotion={user} />
          </>
        )} */}
      </div>

      <div className='mt-10 absolute right-0 bottom-20'>
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