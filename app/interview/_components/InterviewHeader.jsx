import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>

        <Image src={'/logo.png'} width={80} height={80}  className='w-[80px]' alt='image'/>

    </div>
  )
}

export default InterviewHeader