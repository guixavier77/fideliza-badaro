
'use client'
import Award from '@/interfaces/award.interface';
import Store from '@/interfaces/store.interface';
import DefaultContextInterface from '@/interfaces/default.interface';
import { orderBy } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { createContext, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import User from '@/interfaces/user.interface';
import api from '@/services/api';
import { ROLE } from '@/utils/types/roles';
import useLoadData from '@/hooks/useLoadData';
import ModalFeedBackStatus from '@/components/GlobalComponents/modals/ModalFeedback';
import FeedBackStatusInterface from '@/interfaces/feedbackStatus';
export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {
  const [storeSelected, setstoreSelected] = useState<number | null>(null);
  const [user, setuser] = useState<User | null>(null);
  const [showModal, setshowModal] = useState<any>({
    open: false,
    title: '',
    description: '',
    status: '',
  })


  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setuser(decoded as any)
        setstoreSelected(decoded.storeId)
        console.log(decoded);
      } catch (error) {
        setuser(null)
        setstoreSelected(null);
      }
    }
  }, []);

  const {
    store,
    stores,
    awards,
    promotions
  
  } = useLoadData(user, storeSelected)


  const onShowFeedBack = useCallback(({ title, description, status }: FeedBackStatusInterface) => setshowModal({
    open: true,
    title, description, status
  }), [])

  
  return (
    <DefaultContext.Provider value={{
      user,
      stores,
      awards,
      promotions,
      store,
      storeSelected,
      setstoreSelected,

      onShowFeedBack
    }}>
      {children}

      <ModalFeedBackStatus 
        open={showModal.open}
        title={showModal.title}
        description={showModal.description}
        status={showModal.status}
        setIsClose={() => setshowModal({...showModal, open: false})}

      
      />
    </DefaultContext.Provider>
  );
}