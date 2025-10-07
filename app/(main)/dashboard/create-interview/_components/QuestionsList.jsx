import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Link, Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionlistContainer from './QuestionlistContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import {v4 as uuidv4} from 'uuid';

function QuestionsList({formData, onCreateLink}) {

  const [loading, setloading] = useState(true) 
  const [questionList, setquestionList] = useState();
  const {user} = useUser();
  const [saveLoading, setsaveLoading] = useState(false);

    useEffect(()=>{
        if(formData){
            GenerateQuestionList();
        }
    },[formData])

    const GenerateQuestionList=async()=> {

      setloading(true)
      try{

      
                      const result = await axios.post('/api/ai-model',{
                          ...formData
                      })  
                      console.log(result.data.content);
                      const content = result.data.content
                      // const FINAL_JSON = content.replace('"```json','').replace('```','')

                      const matched = content.match(/```json([\s\S]*?)```/);
                      const jsonString = matched ? matched[1].trim() : content;

                      try {
                        setquestionList(JSON.parse(jsonString));
                      } catch (e) {
                        toast('Parsing Error: Invalid response format');
                        console.error("Parsing failed:", e, jsonString);
                      }




                      // setquestionList(JSON.parse(FINAL_JSON))
                      setloading(false);
                    }
                    catch(e){
                       toast('Server Error try again');
                        setloading(false)
                    }
    }

   const onFinish =async()=>{
    setsaveLoading(true);
    const interview_id = uuidv4();

      const { data, error } = await supabase
  .from('Interviews')
  .insert([
    { 

      ...formData,
      questionList: JSON.stringify(questionList),
      userEmail:user?.email,
      interview_id: interview_id

     },
  ])
  .select()
// User Credits Increment 
    
const userUpdate = await supabase
  .from('Users')
  .update({ credits: Number(user?.credits)-1 })
  .eq('email', user?.email)
  .select()

  console.log(userUpdate);




  setsaveLoading(false);
  // console.log(data);
    onCreateLink(interview_id);


   }

  return (
    <div>
      {loading && <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
        
        <Loader2Icon className='animate-spin'/>
        <div>
          <h2 className='font-medium'>Generating Interview Questions</h2>
          <p className='text-primary'>Our AI is Crafting personalized questions based on your job position </p>
        </div>


         


        </div>
        }

         {
            questionList?.length>0 && <QuestionlistContainer questionList ={questionList} />
            // <div className='p-5 border border-gray-300 rounded-xl'>
            //   {
            //     questionList.map((item,index)=>(
            //       <div key={index} className='p-3 border border-gray-200 rounded-x1 mb-3'>
            //           <h2 className='font-medium'>{item.question}</h2>
            //           <h2 className='text-primary text-sm'>Type: {item?.type}</h2>
            //       </div>
            //     ))
            //   }

            // </div>
          }
          <div className='flex justify-end mt-10'>
            
            <Button onClick={()=>onFinish()} disabled={saveLoading}>
              
              {saveLoading && <Loader2 className='animate-spin'/>}


              Create Interview Link & Finish</Button>

          </div>
    </div>
  )
}

export default QuestionsList