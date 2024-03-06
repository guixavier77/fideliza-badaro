
import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
interface IInputStyled {
  id: string
  label?: string
  type: string
  icon: React.ReactElement
  placeholder?: string,
  value?: any
  onChange?: (value: any) => void,
  styles?: string,
  edit?: boolean
}
const InputStyled = ({ label, type, icon, placeholder, value, onChange, id, styles, edit }: IInputStyled) => {
  return (
    <div className='flex flex-col '>
      {label && <label className='mb-1 text-darkGray text-sm'>{label}</label>}
      <div className={`${styles} border border-gray border-solid outline-none rounded-xl p-2 flex items-center justify-between`}>
        <div className='flex items-center gap-4'>
          {icon}
          <input id={id} value={value} onChange={onChange} type={type} className="outline-none text-black font-semibold" placeholder={placeholder} />

        </div>
        {edit &&
          <button className='pr-2'>
            <EditOutlinedIcon />
          </button>}

      </div>

    </div>
  )
}

export default InputStyled