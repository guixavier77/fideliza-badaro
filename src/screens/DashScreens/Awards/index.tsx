'use client'
import ModalAwards from '@/components/AppComponents/modals/ModalAwards';
import PaginationDash from '@/components/DashComponents/PaginationDash';
import CardAwards from '@/components/DashComponents/cards/cardAwards';
import { DefaultContext } from '@/contexts/defaultContext';
import Award from '@/interfaces/award.interface';
import { TABS_FILTER } from '@/utils/types/tabs';
import Add from '@mui/icons-material/Add';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';


let itemsPerPage = 7;

const AwardsContent = ({ hidden }: any) => {
    const { storeSelected } = useContext(DefaultContext)
    const [tab, setTab] = useState('all');
    const [openModal, setopenModal] = useState(false);
    const [data, setdata] = useState<Award[]>([]);
    const [dataFilter, setdatafilter] = useState<Award[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const numberPages = useMemo(() => data.length > 0 ? Math.ceil(data.length / itemsPerPage) : 1, [data]);

    const dataToDisplay = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [currentPage, data]);

    useEffect(() => {
        if (tab === 'all') {
        setdatafilter(data);
        } else if (tab === 'active') {
        setdatafilter(data?.filter(data => data.status));
        } else {
        setdatafilter(data?.filter(data => !data.status));

        }
    }, [data, tab])


    const onPressItem = (item: any) => {
        setTab(item);
    }
    const handleOpenModal = useCallback(() => {
        setopenModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setopenModal(false);
    }, []);
    return (
        <div hidden={hidden} className='h-full relative'>
        <div className='w-full flex justify-between gap-4' >
            <div className='bg-black rounded-40 w-full  shadow-xl'>
            <div className='flex items-center justify-between py-4 px-10'>
                {TABS_FILTER.map((item) => (
                <button onClick={() => onPressItem(item.value)} className={`${tab === item.value ? 'bg-red  rounded-40 ' : ''} px-6 p-2 text-white text-2xl font-bold `}>{item.name}</button>
                ))}

            </div>
            </div>
            <button onClick={handleOpenModal} className='bg-black px-3 rounded-20  text-white shadow-xl'>
            <Add style={{ fontSize: 52, color: '#C90B0B' }} />
            </button>
        </div>

        <div className='mt-10 flex flex-col gap-4'>
            {dataToDisplay?.map((data: Award) =>
            <>
                <CardAwards award={data} />
            </>
            )}
        </div>

        <div className='mt-10 absolute right-0 bottom-20'>
            <PaginationDash 
            count={numberPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            
            
            />
        </div>

        <ModalAwards
            open={openModal}
            setIsClose={handleCloseModal}
        />

        </div>
  )
}

export default AwardsContent