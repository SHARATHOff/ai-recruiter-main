"use client";
import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import Provider, { useUser } from '@/app/provider'
import CreateOptions from './_components/CreateOptions';
import LatestInterviewList from './_components/LatestInterviewList';

function Dashboard() {

  // const user = useUser();
  // console.log("User in Dashboard:", user);
  return (
    <Provider>

    
    <div>
      {/* <WelcomeContainer /> */}
      <h2 className='py-3 px-2 font-bold text-2xl'>DashBoard</h2>
      <CreateOptions />
      <LatestInterviewList />
    </div>  
    </Provider>
  )
}
    
export default Dashboard