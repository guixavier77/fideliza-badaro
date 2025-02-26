'use client'
import ButtonStyled from '@/components/GlobalComponents/button';
import Loading from '@/components/GlobalComponents/loading';
import Logo from '@/components/GlobalComponents/logo';
import { DefaultContext } from '@/contexts/defaultContext';
import { useRouter } from "next/navigation";
import React, { useContext, useState } from 'react';


const RedirectScreen = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const { user } = useContext(DefaultContext);

  return (
    <>
      {loading && <Loading text='Redirecionando...' />}

      {!loading &&
        <div className='flex flex-col justify-center items-center h-screen px-4'>

          <div className='mb-10'>
            <Logo />
          </div>
          <p className='text-red font-bold text-lg'>Olá, {user?.name}.</p>
          <p className='text-black font-semibold text-center'>Vimos que você possui privilégios especiais <br /> em nossa plataforma. Qual área você gostaria de explorar hoje?</p>

          <div className='d-flex flex-col w-full mt-10'>
            <ButtonStyled
              type="button"
              onClick={() => {
                setloading(true);
                router.push('/home')
              }}
              styles="w-full mb-4"
              title="App"
            />

            <ButtonStyled
              type="button"
              onClick={() => {
                setloading(true);
                router.push('/dashboard');
                sessionStorage.setItem('dashboard', 'true');
              }}
              styles="w-full "
              title="Dashboard"
            />

          </div>

        </div>
      }
    </>
  );
};

export default RedirectScreen;
