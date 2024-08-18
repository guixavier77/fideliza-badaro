'use client'
import ButtonStyled from "@/components/GlobalComponents/button";
import InputStyled from "@/components/GlobalComponents/input";
import Loading from "@/components/GlobalComponents/loading";

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { sendPasswordResetEmail } from "firebase/auth";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function AccountRecovery() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      setloading(true);

      // console.log(values);
      // try {
      //   sendPasswordResetEmail(auth, values.email)
      //     .then(() => console.log('kk'))
      //     .catch(() => console.log('kk'))
      //     .finally(() => setloading(false))



      // } catch (error) {
      //   console.error(error);
      // }


    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className="w-screen h-screen px-6 flex flex-col relative justify-center pt-5 ">
      {loading && <Loading text="Enviando e-mail..." />}
      {!loading && <>
        <button className="absolute top-5 left-5"><ArrowBackOutlinedIcon style={{ fontSize: 36, color: '#C90B0B' }} onClick={() => router.push('/login')} /> </button>
        <div className="flex flex-col justify-between h-4/6">
          <div className="py-5">

            <h1 className="text-center text-red font-bold text-2xl">Recuperação de senha</h1>
            <p className="text-center mt-4">Identifique-se para receber um e-mail <br />com as instruções e o link para criar uma nova senha.</p>
            <div className="pt-5 mt-5">
              <InputStyled
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}

                label="E-mail"
                type="text"
                placeholder="exemplo@gmail.com"
                icon={<MailOutlineIcon style={{ color: '#C90B0B' }} />}
              />

            </div>
          </div>
          <div>


            <div className="my-auto">
              <ButtonStyled
                type="submit"
                styles="w-full"
                title="Enviar"
              />

            </div>
          </div>

        </div>



      </>}
    </form >
  )
}
