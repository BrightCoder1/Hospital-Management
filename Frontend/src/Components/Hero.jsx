/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Hero({ title, imageUrl }) {
    return (
        <div className='hero container'>
            <div className="banner">
                <h1>{title}</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi consequatur veniam itaque deleniti eaque autem, quisquam voluptatum rerum quam voluptate, sed officia minus error possimus. Accusamus nisi modi doloremque ducimus ratione laudantium soluta fuga sunt suscipit labore nesciunt, est reprehenderit eligendi magnam quaerat nam? Mollitia est consequuntur excepturi molestiae aperiam?</p>
            </div>
            <div className="banner">
                <img src={imageUrl} alt="hero" className='animated-image' />
                <span>
                    <img src="/Vector.png" alt="vector" />
                </span>
            </div>
        </div>
    )
}
