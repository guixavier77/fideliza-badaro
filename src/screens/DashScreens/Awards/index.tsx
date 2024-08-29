'use client'
import ModalAwards from '@/components/DashComponents/modals/ModalAwards';
import PaginationDash from '@/components/DashComponents/PaginationDash';
import CardAwards from '@/components/DashComponents/cards/cardAwards';
import { DefaultContext } from '@/contexts/defaultContext';
import Award from '@/interfaces/award.interface';
import api from '@/services/api';
import { colors } from '@/utils/colors/colors';
import { TABS_FILTER } from '@/utils/types/tabs';
import Add from '@mui/icons-material/Add';
import { CircularProgress } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';


let itemsPerPage = 7;

const AwardsContent = ({ hidden }: any) => {
    const { awards } = useContext(DefaultContext)
    const [tab, setTab] = useState('all');
    const [openModal, setopenModal] = useState(false);
    const [awardsFilter, setAwardsfilter] = useState<Award[]>();
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const numberPages = useMemo(() => awards.length > 0 ? Math.ceil(awards.length / itemsPerPage) : 1, [awards]);
    useEffect(() => {
        if (tab === 'all') {
        setAwardsfilter(awards);
        } else if (tab === 'active') {
        setAwardsfilter(awards?.filter(data => data.active));
        } else {
        setAwardsfilter(awards?.filter(data => !data.active));
        }
    }, [awards, tab])




    const dataToDisplay = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return awardsFilter?.slice(startIndex, endIndex);
    }, [currentPage, awardsFilter]);



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
        {loading ? 
        <>
          <div className='h-3/4 w-full flex justify-center items-center'>
            <CircularProgress style={{width: 80, height: 80, color: colors.red }} />
          </div> 
        </>
        : 
        <>
        <div className='mt-10 flex flex-col gap-4'>
            {dataToDisplay?.map((data: Award) =>
            <>
                <CardAwards award={data} />
            </>
            )}
        </div>

        </>}


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