import React from 'react'

interface IButtonStyled {
  styles: string,
  textColor?: string;
  bgColor?: string,
  title: string,
  onClick?: () => void
  type: "submit" | "button" | undefined
}
const ButtonStyled = ({styles,bgColor,textColor,title,onClick,type}: IButtonStyled) => {
  return (
    <button type={type} className={`${bgColor} ${styles} ${textColor} py-3 bg-black text-white rounded-xl font-semibold  `} onClick={onClick}>{title}</button>
  )
}

export default ButtonStyled