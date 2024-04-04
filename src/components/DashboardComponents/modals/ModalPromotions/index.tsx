import ButtonStyled from '@/components/button';
import InputStyled from '@/components/input';
import SelectStyled from '@/components/select';
import { DefaultContext } from '@/contexts/defaultContext';
import Award from '@/database/entities/award.entity';
import AwardDB from '@/database/wrappers/award';

import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FlagIcon from '@mui/icons-material/Flag';
import api from '@/services/api';

const ModalPromotions = ({ open, setIsClose, data }: any) => {
  const { storeSelected } = useContext(DefaultContext)
  const [awards, setawards] = useState<Award[]>();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!storeSelected) return;
    const onSubscribe = new AwardDB(storeSelected).on(setawards);
    return () => {
      onSubscribe();
    };
  }, [storeSelected])

  const options = useMemo(() => awards?.map(item => ({ value: item.id, text: item.name })), [awards])

  useEffect(() => {
    if (!open) return formik.resetForm();
    if (data) {
      const {
        name,
        points,
        award,
        active
      } = data;
      formik.setValues({
        name: name,
        points: points,
        award: award,
        active
      });
    }
  }, [data, open])


  const formik = useFormik({
    initialValues: {
      name: '',
      points: '',
      award: '',
      active: true,
    },
    onSubmit: async (values) => {
      setloading(true);
      const data = {
        name: values.name,
        points: values.points,
        awardId: values.award,
        storeId: storeSelected,
      }

      console.log(data)
      api.post('promotions', data).then().catch((e) => console.log(e)).finally(() => {
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
        <p className='font-semibold text-xl text-center uppercase pb-5'>Cadastro de promoção</p>
        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <InputStyled
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Nome"
            type="text"
            placeholder="Exemplo"
            icon={<PersonOutlineOutlined style={{ color: '#C90B0B' }} />}
          />

          <SelectStyled
            label="Prêmios"
            icon={<CardGiftcardIcon style={{ color: '#C90B0B' }} />}
            value={formik.values.award}
            onChange={formik.handleChange}
            id="award"
            options={options}
          />

          <InputStyled
            id="points"
            onChange={formik.handleChange}
            value={formik.values.points}
            label="Pontos"
            type="number"
            stylesInput='w-full'
            placeholder="Ex: 5"
            icon={<FlagIcon style={{ color: '#C90B0B' }} />}
          />


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

export default ModalPromotions