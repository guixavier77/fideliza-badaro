
import React from 'react'

interface IInputStyled {
  label?: string
  type: string
  icon: React.ReactElement
  placeholder?: string
}
const InputStyled = ({ label, type, icon, placeholder }: IInputStyled) => {
  return (
    <div className='flex flex-col '>
      {label && <label className='mb-2 text-darkGray text-sm'>{label}</label>}
      <div className={`border border-gray border-solid outline-none rounded-xl p-2 flex items-center gap-4`}>
        {icon}
        <input type={type} className="outline-none text-black font-semibold" placeholder={placeholder} />
      </div>

    </div>
  )
}

export default InputStyled