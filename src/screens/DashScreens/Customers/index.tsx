'use client'
import React,{useMemo, useState} from 'react'
import PaginationDash from '@/components/DashComponents/PaginationDash';
let itemsPerPage = 7;
const CustomersContent = ({hidden}: any) => {
  const [data, setData] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1);

  const numberPages = useMemo(() => data.length > 0 ?  Math.ceil(data.length / itemsPerPage) : 1, [data]);

  const dataDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [currentPage, data]);



  return (
    <div hidden={hidden} className='h-full relative'>
      <div className='bg-black rounded-40 w-full  shadow-xl'>
        <div className='flex items-center justify-between py-4 px-10'>
          

        </div>
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

export default CustomersContent