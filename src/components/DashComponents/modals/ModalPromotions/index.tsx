import ButtonStyled from '@/components/GlobalComponents/button';
import InputStyled from '@/components/GlobalComponents/input';
import SelectStyled from '@/components/GlobalComponents/select';
import { DefaultContext } from '@/contexts/defaultContext';
import Award from '@/interfaces/award.interface';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect, useMemo, useState } from 'react';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import FlagIcon from '@mui/icons-material/Flag';
import api from '@/services/api';

const ModalPromotions = ({ open, setIsClose, promotionEdit }: any) => {
  const { storeSelected } = useContext(DefaultContext)
  const [awards, setawards] = useState<Award[]>();
  const [loading, setloading] = useState(false);



  const options = useMemo(() => awards?.map(item => ({ value: item.id, text: item.name })), [awards])

  useEffect(() => {
    if (!open) return formik.resetForm();
    if (!promotionEdit && options && options?.length > 0) {
      formik.setValues({
        name: '',
        points: '',
        active: true,
        awardId: options[0].value,
      })
    }
    if (promotionEdit) {
      const {
        name,
        points,
        awardId,
        active
      } = promotionEdit;
      formik.setValues({
        name: name,
        points: points,
        awardId: awardId,
        active
      });
    }
  }, [promotionEdit, open])

  const formik = useFormik({
    initialValues: {
      name: '',
      points: '',
      awardId: '',
      active: true,
    },
    onSubmit: async (values) => {
      setloading(true);
      const data = {
        name: values.name,
        points: values.points,
        awardId: values.awardId,
        storeId: storeSelected,
        promotionId: promotionEdit ? promotionEdit.id : null,
      }


      // if (promotionEdit) {
      //   api.put('promotions', data).then().catch((e) => console.log(e)).finally(() => {
      //     setloading(false)
      //     setIsClose();
      //   });
      // } else {
      //   api.post('promotions', data).then().catch((e) => console.log(e)).finally(() => {
      //     setloading(false)
      //     setIsClose();
      //   });

      // }
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
            value={formik.values.awardId}
            onChange={formik.handleChange}
            id="awardId"
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
                title={`${promotionEdit ? 'Atualizando...' : 'Cadastrando...'}`}
                icon={<CircularProgress style={{ width: 20, height: 20, color: '#FFFFFF' }} />}

              /> :
              <ButtonStyled
                type="submit"
                styles="w-full"
                title={`${promotionEdit ? 'Atualizar' : 'Cadastrar'}`}
              />

            }

          
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalPromotions