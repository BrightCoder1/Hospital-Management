// eslint-disable-next-line no-unused-vars
import React from 'react'
import Hero from '../Components/Hero'
import Biography from '../Components/Biography'

export default function AboutUs() {
    return (
        <>
            <Hero title={"Learn More About Us || Medical Institue"} imageUrl={"/about.png"} />
            <Biography imageUrl={"/whoweare.png"} />
        </>
    )
}
