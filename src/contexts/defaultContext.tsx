
'use client'
import Award from '@/interfaces/award.interface';
import Store from '@/interfaces/store.interface';
import DefaultContextInterface from '@/interfaces/default.interface';
import { orderBy } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import User from '@/interfaces/user.interface';
import api from '@/services/api';
import { ROLE } from '@/utils/types/roles';
import useLoadData from '@/hooks/useLoadData';
export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {

  const [storeSelected, setstoreSelected] = useState<number | null>(null);
  const [user, setuser] = useState<User | null>(null);


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



  
  return (
    <DefaultContext.Provider value={{
      user,
      stores,
      awards,
      promotions,
      store,
      storeSelected,
      setstoreSelected,
    }}>
      {children}
    </DefaultContext.Provider>
  );
}