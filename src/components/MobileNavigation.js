import React from 'react'
import { mobileNavigation } from '../constants/navigation'
import {NavLink} from 'react-router-dom'

const MobileNavigation = () => {
  return (
    <section className='lg:hidden bottom-0 bg-black h-12 bg-opacity-60  backdrop-blur-2xl z-40 fixed w-full'>
       <div className='flex items-center justify-between h-full text-neutral-300'>
        {
        mobileNavigation.map((nav ,index )=>{
            return(
                <NavLink   
                key={nav.label+"mobileNavigation"}
                to={nav.href}
                className ={({isActive})=>`px-3 flex h-full items-center flex-col justify-center ${isActive && "text-green"}`}
                >
                    <div className=' text-2xl'>    {nav.icon}    </div>
                    <p className='text-sm'>{nav.label}</p>

                </NavLink>
            )
        })

        }
         </div>
         </section>
  )
}

export default MobileNavigation