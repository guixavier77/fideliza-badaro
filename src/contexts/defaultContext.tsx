
'use client'
import ModalFeedBackStatus from '@/components/GlobalComponents/modals/ModalFeedback';
import useLoadStores from '@/hooks/useLoadStores';
import DefaultContextInterface from '@/interfaces/default.interface';
import FeedBackStatusInterface from '@/interfaces/feedbackStatus';
import User from '@/interfaces/user.interface';
import { ROLE } from '@/utils/types/roles';
import { TABS } from '@/utils/types/tabs';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useTab } from './tabContext';
export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {
  const router = useRouter();

  const [storeSelected, setstoreSelected] = useState<number | null>(null);
  const [user, setuser] = useState<User | null>(null);
  const [showModal, setshowModal] = useState<any>({
    open: false,
    title: '',
    description: '',
    status: '',
  })

  const {setTabSelected} = useTab();
  

  const redirect = useCallback((user: User) => {
    if(!user) return;
    const redirected = sessionStorage.getItem('dashboard') === 'true';
    if(user.role === ROLE.SUPERADMIN) router.push('/dashboard')
    if(user.role === ROLE.ADMIN && !redirected) router.push('/redirectScreen')
    if(user.role === ROLE.CUSTOMER || user.role === ROLE.OPERATOR) router.push('/home')
  },[user])

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setuser(decoded as any)
        if(decoded.role !== ROLE.SUPERADMIN) setstoreSelected(Number(decoded.storeId))
        console.log(decoded);
        //setTabSelected(decoded.role === ROLE.CUSTOMER ? TABS.HOME : TABS.HOMEADMIN);
        redirect(decoded);
      } catch (error) {
        setuser(null)
        setstoreSelected(null);
      }
    }
  }, []);


  const {
    store,
    stores,
  } = useLoadStores(user, storeSelected)


  const onShowFeedBack = useCallback(({ title, description, status }: FeedBackStatusInterface) => setshowModal({
    open: true,
    title, description, status
  }), [])

  
  return (
    <DefaultContext.Provider value={{
      user,
      stores,
      store,
      storeSelected,
      setstoreSelected,
      setuser,
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