import ButtonStyled from '@/components/GlobalComponents/button';
import InputStyled from '@/components/GlobalComponents/input';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useCallback, useContext, useEffect, useState } from 'react';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import masks from '@/utils/masks/masks';
import LocalPhoneOutlined from '@mui/icons-material/LocalPhoneOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import api from '@/services/api';
import apiViaCep from '@/services/apiViaCep';
import CustomizedSteppers from '../../StepBar';
import { DefaultContext } from '@/contexts/defaultContext';
import PreFeedBack from '@/utils/feedbackStatus';


const validate = (values: any) => {
  let errors: any = {};
  if (!values.name) {
    errors.name = 'Este campo é necessário';
  }
  if (!values.cnpj) {
    errors.cnpj = 'Este campo é necessário.';
  } else if (values.cnpj.length < 18) {
    errors.cnpj = 'O CNPJ precisa ter 14 dígitos.';
  }

  if (!values.email) {
    errors.email = 'Este campo é necessário.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email inválido.';
  }

  if (!values.phone) {
    errors.phone = 'Este campo é necessário';
  }

  if (!values.cep) {
    errors.cep = 'Este campo é necessário';
  }

  if(!values.uf){
    errors.uf = 'Este campo é necessário';
  }

  if(!values.city){
    errors.city = 'Este campo é necessário';
  }

  
  if(!values.neighborhood){
    errors.neighborhood = 'Este campo é necessário';
  }

  if(!values.street){
    errors.street = 'Este campo é necessário';
  }


  return errors;
}


const ModalStores = ({ open, setIsClose, data }: any) => {
  const {onShowFeedBack} = useContext(DefaultContext)
  const [loading, setloading] = useState(false);
  const [viewTwo, setViewTwo] = useState(false);


  const onSuccess = () => {
    onShowFeedBack(PreFeedBack.success('Loja cadastrada com sucesso!'))
    setIsClose();
  }

  const onError = (e: any) => {
    onShowFeedBack(PreFeedBack.error('Falhou ao cadastrar a loja.'))
    console.log(e);

  }
  useEffect(() => {

    if (!open){ 
      setViewTwo(false);
      return formik.resetForm()
    };
    if (data) {
      const {
        name,
        cnpj,
        email,
        phone,
        address_cep,
        address_uf,
        address_city,
        address_neighborhood,
        address_street, 
        address_number
        
      } = data;
      
      formik.setValues({
        name: name,
        cnpj: cnpj,
        email: email,
        phone: phone,


        cep: address_cep,
        uf: address_uf,
        city: address_city,
        neighborhood: address_neighborhood,
        street: address_street,
        number: address_number,
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

    },
    validate,
    onSubmit: async (values) => {
      setloading(true);
      const data = {
        name: values.name,
        cnpj: masks.unmask(values.cnpj),
        email: values.email,
        phone: values.phone,
        address_cep: masks.unmask(values.cep),
        address_uf: values.uf,
        address_city: values.city,
        address_neighborhood: values.neighborhood,
        address_street: values.street,
        address_number: values.number,
      }
      console.log(data, '[POST] /stores')
      api.post('stores', data)
        .then(onSuccess)
        .catch((e) => onError(e))
        .finally(() => setloading(false));
    }
  })


  const steps = ['Dados da loja', 'Endereço da loja'];

  const getCepData = useCallback(async (cep: string) => {
    const unmaskCep = masks.unmask(cep);
    const response = await apiViaCep.get(`${unmaskCep}/json`);
    if (response) {
      formik.setValues({
        ...formik.values,
        cep: response?.data?.cep,
        uf: response?.data?.uf,
        city: response?.data?.localidade,
        neighborhood: response?.data?.bairro,
        street: response?.data?.logradouro,
      })
    }
   
  }, [formik.values])

  useEffect(() => {
    if (formik.values.cep.length === 10 && !data) getCepData(formik.values.cep)
  }, [data, formik.values.cep, getCepData])

  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 w-1/3 p-4'>
        <p className='font-semibold text-xl text-center uppercase pb-5'>Cadastro de loja</p>
        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <CustomizedSteppers 
            steps={steps}
            activeTab={!viewTwo ? 0 : 1}
          />
          {!viewTwo &&
            <div  className='flex flex-col gap-4'>
              <InputStyled
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                label="Nome"
                type="text"
                placeholder="Nome da Loja"
                icon={<StoreOutlinedIcon style={{ color: '#C90B0B' }} />}
                error={formik.errors.name}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.name}
              />

              <InputStyled
                id="cnpj"
                onChange={formik.handleChange}
                value={masks.cnpjMask(formik.values.cnpj)}
                label="CNPJ"
                type="text"
                placeholder="00.000.000/0000-00"
                icon={<ArticleOutlinedIcon style={{ color: '#C90B0B' }} />}
                error={formik.errors.cnpj}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.cnpj}
                maxLength={18}


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
                error={formik.errors.email}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.email}

              />
              <InputStyled
                id="phone"
                value={masks.phoneMask(formik.values.phone)}
                onChange={formik.handleChange}
                label="Telefone"
                type="text"
                placeholder="(00) 00000-0000"
                icon={<LocalPhoneOutlined style={{ color: '#C90B0B' }} />}
                error={formik.errors.phone}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.phone}
                maxLength={15}

              />
              <div className='flex gap-5 pt-5'>
                <ButtonStyled
                  type="button"
                  onClick={setIsClose}
                  styles="w-full"
                  bgColor='bg-red'
                  title="Cancelar"
                />
              
                <ButtonStyled
                  type="button"
                  onClick={() => setViewTwo(true)}
                  styles="w-full"
                  bgColor='bg-black'
                  title="Próximo"
                />
            </div>




            </div>
          }

          {viewTwo &&
            <div  className='flex flex-col gap-4'>
              <div className='flex gap-4' >
                <InputStyled
                  // stylesInput='w-3/4'
                  
                  id="cep"
                  value={masks.cepMask(formik.values.cep)}
                  onChange={formik.handleChange}
                  label="CEP"
                  type="text"
                  placeholder="0000-000"
                  icon={<BusinessIcon style={{ color: '#C90B0B' }} />}
                  error={formik.errors.cep}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.cep}
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
                  error={formik.errors.uf}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.uf}
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

                error={formik.errors.city}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.city}
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

                error={formik.errors.neighborhood}
                onBlur={formik.handleBlur}
                isTouched={formik.touched.neighborhood}
              />

              <div className='flex gap-4' >
                <InputStyled
                  id="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  label="Rua"
                  type="text"
                  placeholder="Rua"
                  icon={<BusinessIcon style={{ color: '#C90B0B' }} />}

                  error={formik.errors.street}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.street}
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

                  error={formik.errors.number}
                  onBlur={formik.handleBlur}
                  isTouched={formik.touched.number}
                />
              </div>

              <div className='flex gap-5 pt-5'>
                <ButtonStyled
                  type="button"
                  onClick={() => setViewTwo(false)}
                  styles="w-full"
                  bgColor='bg-red'
                  title="Voltar"
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
            </div>
          }
        </form>
      </div>
    </Modal>
  )
}

export default ModalStores