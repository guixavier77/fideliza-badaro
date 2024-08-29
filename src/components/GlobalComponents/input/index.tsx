
import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
interface IInputStyled {
  disabled?: boolean,
  id: string
  label?: string
  type: string
  icon: React.ReactElement
  placeholder?: string,
  value?: any
  onChange?: (value: any) => void,
  styles?: string,
  stylesInput?: string,
  edit?: boolean,
  error?: string
  onBlur?: any
  isTouched?: boolean
}
const InputStyled = ({disabled, label, type, icon, placeholder, value, onChange, id, styles, stylesInput,edit,error ,onBlur, isTouched}: IInputStyled) => {
  return (
    <div className='flex flex-col '>
      {label && <label className='mb-1 text-darkGray text-sm'>{label}</label>}
      <div className={`${styles ? styles : ''} bg-none border border-gray border-solid outline-none rounded-xl p-2 flex items-center justify-between ${disabled ? 'bg-gray' : ''}`}>
        <div className='flex items-center gap-4 w-full'>
          {icon}
          <input 
            disabled={disabled} 
            id={id} 
            value={value} 
            onChange={onChange} 
            type={type} 
            className={`${disabled ? 'text-darkGray bg-gray' : ''} ${stylesInput ? stylesInput : ''} outline-none text-black font-semibold`}
            placeholder={placeholder} 
            onBlur={onBlur}
            
          />

        </div>
        {edit &&
          <button className='pr-2'>
            <EditOutlinedIcon />
          </button>}

      </div>
      {error && isTouched &&
        <p className='font-extralight text-red text-base pt-1 pl-12'>{error}</p>
      }
    </div>
  )
}

export default InputStyled