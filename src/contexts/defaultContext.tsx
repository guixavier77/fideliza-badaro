
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
export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {

  const [stores, setstores] = useState<Store[]>([]);
  const [storeSelected, setstoreSelected] = useState<number | null>(null);
  const [store, setstore] = useState<Store | null>(null);
  const [awardsDicionary, setawardsDicionary] = useState<Award>();
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

  useEffect(() => {
    if(!storeSelected) return;
    api.get(`stores/${storeSelected}`)
      .then((res) => setstore(res?.data?.store))
      .catch(error => console.error('[ERROR API /stores]', error?.response?.data))
  },[storeSelected])

  useEffect(() => {
    if(!user || user.role !== ROLE.SUPERADMIN) return;
    api.get(`stores`)
    .then((res) => setstores(res?.data?.stores))
    .catch(error => console.error('[ERROR API /stores]', error?.response?.data))
  },[user])

  
  return (
    <DefaultContext.Provider value={{
      user,
      stores,
      store,
      storeSelected,
      setstoreSelected,
      awardsDicionary
    }}>
      {children}
    </DefaultContext.Provider>
  );
}