
'use client'
import User from '@/database/entities/user.entity';
import DefaultContextInterface from '@/interfaces/default.interface';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
export const DefaultContext = createContext<DefaultContextInterface>({} as any)

export default function DefaultProvider({ children }: any) {
  const { data: session } = useSession();
  let userSession: any = session;

  console.log(userSession);
  const [user, setuser] = useState<any>(null);

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
      }
    };
    fetchData();
  }, [userSession]);

  return (
    <DefaultContext.Provider value={{
      user,
    }}>
      {children}
    </DefaultContext.Provider>
  );
}