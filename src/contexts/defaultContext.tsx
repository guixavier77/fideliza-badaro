
'use client'
import Award from '@/interfaces/award.interface';
import Store from '@/interfaces/store.interface';
import DefaultContextInterface from '@/interfaces/default.interface';
import { orderBy } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {
  const { data: session } = useSession();
  let userSession: any = session;
  const [user, setuser] = useState<any>(null);
  const [stores, setstores] = useState<Store[]>([]);
  const [storeSelected, setstoreSelected] = useState<string>('');
  const [store, setstore] = useState<Store | null>(null);
  const [awardsDicionary, setawardsDicionary] = useState<Award>();

  useEffect(() => {
    const fetchData = async () => {
      if (userSession && userSession.token) {
        setuser({
          name: userSession?.token?.user?.name,
          phone: userSession?.token?.user?.phone,
          cpf: userSession?.token?.user?.cpf,
          role: userSession?.token?.user?.role as any,
          email: userSession?.token?.user?.email,
          birthDate: userSession?.token?.user?.birthDate,
          id: userSession?.token?.user?.id,

        });
        setstoreSelected(userSession?.token?.user?.storeId);
      }
    };
    fetchData();
  }, [userSession]);


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