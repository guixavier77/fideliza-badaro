'use client'
import ButtonStyled from "@/components/button";
import InputStyled from "@/components/input";
import Logo from "@/components/logo";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';



export default function Login() {


  const handleLogin = () => {
    console.log('USE')
  }
  return (
    <main className="w-screen flex flex-col justify-evenly relative ">
      <button className="absolute top-0 left-0"><ArrowBackOutlinedIcon style={{ fontSize: 36, color: '#C90B0B' }} /> </button>
      <div className="mt-4">

        <Logo />
      </div>
      <div className="flex flex-col gap-5">
        <InputStyled
          label="Nome"
          type="text"
          placeholder="Exemplo"
          icon={<PersonOutlineOutlinedIcon style={{ color: '#C90B0B' }} />}
        />
        <InputStyled
          label="E-mail"
          type="text"
          placeholder="exemplo@gmail.com"
          icon={<MailOutlineIcon style={{ color: '#C90B0B' }} />}
        />

        <InputStyled
          label="Telefone"
          type="text"
          placeholder="(00) 00000-0000"
          icon={<LocalPhoneOutlinedIcon style={{ color: '#C90B0B' }} />}
        />

        <InputStyled
          label="Data de Nascimento"
          type="text"
          placeholder="DD/MM/YYYY"
          icon={<CalendarMonthOutlinedIcon style={{ color: '#C90B0B' }} />}
        />

        <InputStyled
          label="Senha"
          type="password"
          placeholder="***********"
          icon={<LockOutlinedIcon style={{ color: '#C90B0B' }} />}
        />

        <InputStyled
          label="Senha"
          type="password"
          placeholder="***********"
          icon={<LockOutlinedIcon style={{ color: '#C90B0B' }} />}
        />


      </div>


      <div className="flex flex-col gap-4 ">
        <ButtonStyled
          onClick={handleLogin}
          styles="w-full"
          bgColor='bg-red'
          title="Cadastrar"
        />

      </div>
    </main>
  )
}
