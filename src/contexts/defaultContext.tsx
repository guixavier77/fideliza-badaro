
'use client'
import User from '@/database/entities/user.entity';
import StoreDB from '@/database/wrappers/store';
import DefaultContextInterface from '@/interfaces/default.interface';
import { orderBy } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {
  const { data: session } = useSession();
  let userSession: any = session;
  const [user, setuser] = useState<any>(null);
  const [stores, setstores] = useState<any>(null);
  const [storeSelected, setstoreSelected] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      if (userSession && userSession.token) {
        setuser({
          name: userSession?.token?.name,
          phone: userSession?.token?.phone,
          cpf: userSession?.token?.cpf,
          role: userSession?.token?.role as any,
          email: userSession?.token?.email,
          birthDate: userSession?.token?.birthDate,
          id: userSession?.token?.id,

        });
        setstoreSelected(userSession?.token?.storeId);
      }
    };
    fetchData();
  }, [userSession]);

  useEffect(() => {
    const onSubscribe = new StoreDB().on(setstores, orderBy('name', 'asc'));
    return () => {
      onSubscribe();
    };
  }, [])



  return (
    <DefaultContext.Provider value={{
      user,
      stores,
      storeSelected,
    }}>
      {children}
    </DefaultContext.Provider>
  );
}