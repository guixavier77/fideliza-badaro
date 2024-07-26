import ButtonStyled from '@/components/GlobalComponents/button';
import InputStyled from '@/components/GlobalComponents/input';
import { DefaultContext } from '@/contexts/defaultContext';
import api from '@/services/api';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import { CircularProgress, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useCallback, useEffect, useState } from 'react';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import masks from '@/utils/masks/masks';
import Money from '@/utils/masks/money';
import Image from 'next/image';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import AwardDB from '@/database/wrappers/award';
import award from '@/database/wrappers/award';




const ModalAwards = ({ open, setIsClose, awardEdit }: any) => {
  const [loading, setloading] = useState(false);
  const { storeSelected } = useContext(DefaultContext);

  useEffect(() => {
    if (!open) return formik.resetForm();
    if (awardEdit) {
      const {
        name,
        price,
        image_url
      } = awardEdit;
      formik.setValues({
        name: name,
        price: price.toString(),
        image: null,
        image_url: image_url,

      });
    }
  }, [awardEdit, open])


  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: null,
      image_url: '',

    },
    onSubmit: async (values) => {
      setloading(true);
      const data: any = {
        name: values.name,
        price: Number(masks.unmask(values.price)),
        image_url: values.image_url,
        image: values.image,
        status: true,
      }

      if (awardEdit) {
        new AwardDB(storeSelected).update(awardEdit.id, data).then().catch((e) => console.log(e)).finally(() => {
          setloading(false)
          setIsClose();
        });
      } else {

        new AwardDB(storeSelected).create(data).then().catch((e) => console.log(e)).finally(() => {
          setloading(false)
          setIsClose();
        });
      }

    }
  })


  const handleImage = useCallback((e: any) => {
    const [file] = Array.from(e.target.files)

    formik.setValues({
      ...formik.values,
      image: file as any,
      image_url: URL.createObjectURL(file as any)
    })
  }, [formik.values])
  return (
    <Modal
      open={open}
      onClose={setIsClose}
      className="flex justify-center items-center"
    >
      <div className='bg-white rounded-20 w-1/3 p-4'>
        <p className='font-semibold text-xl text-center uppercase pb-5'>Cadastro de prêmio</p>
        <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
          <div id='image_url' className='flex justify-center'>
            <label >
              <figure >
                <input id='image_url' type="file" accept="image/*" multiple onChange={handleImage} className='hidden' />
                {formik.values.image_url && <Image src={formik.values.image_url} alt='Imagem do evento' width={150}
                  height={150} className='cursor-pointer  bg-white' />}

                {!formik.values.image_url &&
                  <div className='bg-white w-24 h-24 shadow-lg rounded-20 flex items-center justify-center cursor-pointer flex-col'>
                    <CameraAltOutlinedIcon style={{ fontSize: 48 }} />
                    <p className='font-light text-center'>Foto</p>
                  </div>
                }

              </figure>
            </label>
          </div>
          <InputStyled
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Nome"
            type="text"
            placeholder="Exemplo"
            icon={<PersonOutlineOutlined style={{ color: '#C90B0B' }} />}
          />

          <InputStyled
            id="price"
            onChange={formik.handleChange}
            value={masks.maskMoney(formik.values.price)}
            placeholder="R$ 0,00"
            label="Preço"
            type="text"
            icon={<AttachMoneyOutlinedIcon style={{ color: '#C90B0B' }} />}
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
                title={`${awardEdit ? 'Atualizando...' : 'Cadastrando...'}`}
                icon={<CircularProgress style={{ width: 20, height: 20, color: '#FFFFFF' }} />}

              /> :
              <ButtonStyled
                type="submit"
                styles="w-full"
                title={`${awardEdit ? 'Atualizar' : 'Cadastrar'}`}
              />

            }
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ModalAwards