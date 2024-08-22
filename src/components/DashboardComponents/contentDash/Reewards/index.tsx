import { TABS_FILTER } from '@/utils/types/tabs';
import { useState } from 'react';

const ReewardsContent = ({ hidden }: any) => {
  const [tab, setTab] = useState('all');


  const onPressItem = (item: any) => {
    setTab(item);
  }

  return (
    <div hidden={hidden}>
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

    </div>
  )
}

export default ReewardsContent