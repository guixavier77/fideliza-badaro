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
    <div hidden={hidden} className='h-full w-full relative'>
     
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

export default CustomersContent