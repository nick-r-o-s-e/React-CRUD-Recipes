import React from 'react'

interface Props {
    setFormState:Function
}

function AddingCard({setFormState}:Props) {
  return (
    <div className='adding-card' onClick={()=>{setFormState(true)}}>
        <i className='fa-solid fa-circle-plus'></i>
    </div>
  )
}

export default AddingCard