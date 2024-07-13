import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'

function WhatsApp() {
  return (
    <a
      href="https://api.Whatsapp.com/send?phone=55"
      target="_blank"
      className="btn btn-dark border-0 border-spacing-20 fixed bottom-4 right-5  "
    >
      {' '}
      <BsWhatsapp className="text-5xl ml-1 justify-center text-green-600 right-5 rounded-full adow-light-green shadow-lg bottom-5 flex " />
    </a>
  )
}
export default WhatsApp
