/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function Biography({ imageUrl }) {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="aboutImage" />
      </div>
      <div className="banner">
      <p>Biography</p>
      <h3>Who We Are</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste dolor natus possimus quas cupiditate suscipit recusandae reiciendis harum! Quibusdam maxime nemo, consequatur pariatur magni voluptate animi sit delectus aperiam dolores eaque quos molestiae similique rerum libero deleniti sed facere ab totam assumenda dignissimos deserunt. Ex, temporibus vero. Odio, omnis velit.
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis provident facere similique vel deserunt delectus quia omnis, minus magnam, exercitationem recusandae asperiores impedit ipsa maxime veritatis iure voluptates consectetur, dolore animi. Quis, aut! Cum, consectetur.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, excepturi!</p>
      <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}
