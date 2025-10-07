"use client";
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetail from './_components/InterviewDetail';
import CandidateList from './_components/CandidateList';

function InterviewDetails() {

    const {interview_id} = useParams();
    const {user} = useUser();
    const [interviewDetail, setinterviewDetail] = useState();
    useEffect(()=>{
            user&&getinterviewdetail();
    },[user])

    const getinterviewdetail = async()=>{
              const res = await supabase.from('Interviews')
                    .select('jobPosition,jobDescription,type,questionList,duration,interview_id,created_at,interview-feedback(userEmail,userName,feedback,created_at)')
                    .eq('userEmail',user?.email)
                    .eq('interview_id',interview_id)
                    .order('id',{ascending:false})  

                    console.log(res);
                    setinterviewDetail(res?.data[0]); 
                    // setinteviewList(res.data );
    }

  return (
    <div className='mt-5'>
        <h2 className='font-bold text-2xl'>Interview Details</h2>
       <InterviewDetail  interviewDetail={interviewDetail}/>
       <CandidateList candidatelist={interviewDetail?.['interview-feedback']}/>
    </div>
  )
}

export default InterviewDetails