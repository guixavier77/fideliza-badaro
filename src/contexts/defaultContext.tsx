
'use client'
import Award from '@/database/entities/award.entity';
import Store from '@/database/entities/store.entity';
import AwardDB from '@/database/wrappers/award';
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

  useEffect(() => {
    const onSubscribe = new StoreDB().on(setstores, orderBy('name', 'asc'));
    return () => {
      onSubscribe();
    };
  }, [])

  useEffect(() => {
    if (!storeSelected) return;
    const fetchStore = async () => {
      try {
        const storeData = await new StoreDB().get(storeSelected);
        setstore(storeData);
      } catch (error) {
        console.error('Erro ao buscar a loja:', error);
      }
    };

    fetchStore();
  }, [storeSelected])



  useEffect(() => {
    if (!storeSelected) return;
    const onSubscribe = new AwardDB(storeSelected).on((awards) => {
      const awardsDicionary: any = {}
      awards.forEach((award) => {
        console.log(award);
        awardsDicionary[award.id] = award;
      })
      setawardsDicionary(awardsDicionary);
    })
    return () => {
      onSubscribe();
    };
  }, [storeSelected])

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