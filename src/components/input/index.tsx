
import React from 'react'

interface IInputStyled {
  id: string
  label?: string
  type: string
  icon: React.ReactElement
  placeholder?: string,
  value?: any
  onChange?: (value: any) => void
}
const InputStyled = ({ label, type, icon, placeholder,value,onChange ,id}: IInputStyled) => {
  return (
    <div className='flex flex-col '>
      {label && <label className='mb-1 text-darkGray text-sm'>{label}</label>}
      <div className={`border border-gray border-solid outline-none rounded-xl p-2 flex items-center gap-4`}>
        {icon}
        <input id={id} value={value} onChange={onChange} type={type} className="outline-none text-black font-semibold" placeholder={placeholder} />
      </div>

    </div>
  )
}

export default InputStyled