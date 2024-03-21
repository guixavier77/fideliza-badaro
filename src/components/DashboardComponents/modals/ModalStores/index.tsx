import ButtonStyled from '@/components/button';
import InputStyled from '@/components/input';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import masks from '@/utils/masks/masks';
import LocalPhoneOutlined from '@mui/icons-material/LocalPhoneOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import api from '@/services/api';

const ModalStores = ({ open, setIsClose, data }: any) => {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!open) return formik.resetForm();
    if (data && data.address) {
      const {
        name,
        cnpj,
        email,
        phone,
        address
      } = data;
      const {
        cep,
        uf,
        city,
        neighborhood,
        street,
        number,
        complement
      } = address;
      formik.setValues({
        name: name,
        cnpj: cnpj,
        email: email,
        phone: phone,
        cep: cep,
        uf: uf,
        city: city,
        neighborhood: neighborhood,
        complement: complement,
        street: street,
        number: number,
      });
    }
  }, [data, open])



  const formik = useFormik({
    initialValues: {
      name: '',
      cnpj: '',
      email: '',
      phone: '',

      cep: '',
      uf: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',

    },
    onSubmit: async (values) => {
      setloading(true);
      const data = {
        name: values.name,
        cnpj: values.cnpj,
        email: values.email,
        phone: values.phone,
        cep: values.cep,
        uf: values.uf,
        city: values.city,
        neighborhood: values.neighborhood,
        street: values.street,
        number: values.number,
      }
      api.post('stores', data).then().catch((e) => console.log(e)).finally(() => {
        setloading(false)
        setIsClose();
      });
    }
  })
  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 w-1/3 p-4'>
        <p className='font-semibold text-xl text-center uppercase pb-5'>Cadastro de loja</p>
        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <InputStyled
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Nome"
            type="text"
            placeholder="Loja"
            icon={<StoreOutlinedIcon style={{ color: '#C90B0B' }} />}
          />

          <InputStyled
            id="cnpj"
            onChange={formik.handleChange}
            value={masks.cnpjMask(formik.values.cnpj)}
            label="CNPJ"
            type="text"
            placeholder="Exemplo"
            icon={<ArticleOutlinedIcon style={{ color: '#C90B0B' }} />}
          />
          <InputStyled
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            disabled={data}
            label="E-mail"
            type="text"
            placeholder="exemplo@gmail.com"
            icon={<MailOutlineIcon style={{ color: '#C90B0B' }} />}
          />
          <InputStyled
            id="phone"
            value={masks.phoneMask(formik.values.phone)}
            onChange={formik.handleChange}
            label="Telefone"
            type="text"
            placeholder="(00) 00000-0000"
            icon={<LocalPhoneOutlined style={{ color: '#C90B0B' }} />}
          />

          <p className='font-semibold text-xl text-left uppercase'>Endereço</p>
          <div className='flex gap-4' >
            <InputStyled
              // stylesInput='w-3/4'
              id="cep"
              value={formik.values.cep}
              onChange={formik.handleChange}
              label="CEP"
              type="text"
              placeholder="0000-000"
              icon={<BusinessIcon style={{ color: '#C90B0B' }} />}
            />


            <InputStyled
              stylesInput='w-3/4'
              id="uf"
              value={formik.values.uf}
              onChange={formik.handleChange}
              label="Estado"
              type="text"
              placeholder="MG"
              icon={<BusinessIcon style={{ color: '#C90B0B' }} />}
            />
          </div>


          <InputStyled
            stylesInput='w-3/4'
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            label="Cidade"
            type="text"
            placeholder="-----"
            icon={<BusinessIcon style={{ color: '#C90B0B' }} />}
          />
          <InputStyled
            stylesInput='w-3/4'
            id="neighborhood"
            value={formik.values.neighborhood}
            onChange={formik.handleChange}
            label="Bairro"
            type="text"
            placeholder="-----"
            icon={<BusinessIcon style={{ color: '#C90B0B' }} />}
          />

          <div className='flex gap-4' >
            <InputStyled
              id="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              label="Rua"
              type="text"
              placeholder="0000-000"
              icon={<BusinessIcon style={{ color: '#C90B0B' }} />}
            />


            <InputStyled
              stylesInput='w-3/4'
              id="number"
              value={formik.values.number}
              onChange={formik.handleChange}
              label="Número"
              type="text"
              placeholder="----"
              icon={<BusinessIcon style={{ color: '#C90B0B' }} />}
            />
          </div>

          <div className='flex gap-5 pt-5'>
            <ButtonStyled
              type="button"
              onClick={setIsClose}
              styles="w-full"
              bgColor='bg-red'
              title="Cancelar"
            />


            {loading ?
              <ButtonStyled
                bgColor='bg-darkGray'
                textColor='text-white'
                type="submit"
                styles="w-full"
                title='Cadastrando...'
                icon={<CircularProgress style={{ width: 20, height: 20, color: '#FFFFFF' }} />}

              /> :
              <ButtonStyled
                type="submit"
                styles="w-full"
                title="Cadastrar"
              />

            }
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalStores