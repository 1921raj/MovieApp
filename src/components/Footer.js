import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='text-center bg-neutral-300 bg-opacity-50 text-neutral-400 py-2'>
         <div className='flex items-center  text-white justify-center gap-4'>
         <Link to="/">About</Link>
         <Link to="/">Contact</Link>
         </div>
         <p> Created By RAJKAMAL (c).</p>
    </footer>
  )
}

export default Footer