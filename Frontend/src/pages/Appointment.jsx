// eslint-disable-next-line no-unused-vars
import React from 'react'
import Appointmentform from '../Components/Appointmentform'
import Hero from '../Components/Hero'

export default function Appointment() {
  return (
    <>
      <Hero title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}/>
      <Appointmentform />
    </>
  )
}
