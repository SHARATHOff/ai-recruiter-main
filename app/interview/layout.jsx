"use client";
import React, { useState } from 'react'
import InterviewHeader from './_components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function InterviewLayout({children}) {

    const [interviewInfo, setinterviewInfo] = useState();

  return (
    <InterviewDataContext.Provider value={{interviewInfo, setinterviewInfo}}>

    
    <div className=''>
      <InterviewHeader/>
      {children}
      </div>
      </InterviewDataContext.Provider>
  )
}

export default InterviewLayout