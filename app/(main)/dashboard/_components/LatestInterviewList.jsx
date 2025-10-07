"use client";
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard';

function LatestInterviewList() {
    const [inteviewlist, setinteviewlist] = useState([]);
    const {user} = useUser();

    useEffect(() => {
       user && getInterviewList();
    }, [user])

    const getInterviewList = async() => {
        console.log("Fetching interviews for user:", user?.email);
        
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('useremail', user?.email)
        .order('id', {ascending: false})
        .limit(6)

        if (error) {
            console.error("Error fetching interviews:", JSON.stringify(error, null, 2));
            console.error("Full error object:", error);
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
            console.error("Error details:", error.details);
            return;
        }

        console.log("Fetched Interviews:", Interviews);
        setinteviewlist(Interviews || []);
    }

    return (
        <div>
            <h2 className='my-5 font-bold text-2xl'>Previously Created Interviews</h2>
            {(!inteviewlist || inteviewlist.length === 0) &&
                <div className='p-5 flex flex-col gap-3 items-center mt-5'>
                    <Video className='h-10 w-10 text-primary' />
                    <h2>You don't have any interview created!!</h2>
                    <Button>+ Create New Interview</Button>
                </div>
            }
            {inteviewlist && inteviewlist.length > 0 &&
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {inteviewlist.map((interview, index) => (
                        <InterviewCard key={interview.interview_id || interview.id || index} interview={interview} />
                    ))}
                </div>
            }
        </div>
    )
}

export default LatestInterviewList