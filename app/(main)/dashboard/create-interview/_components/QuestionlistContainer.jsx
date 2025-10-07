import React from 'react'

function QuestionlistContainer({questionList}) {
  return (
    <div>

         <div className='p-5 border border-gray-300 rounded-xl'>
              {
                questionList.map((item,index)=>(
                  <div key={index} className='p-3 border border-gray-200 rounded-x1 mb-3'>
                      <h2 className='font-medium'>{item.question}</h2>
                      <h2 className='text-primary text-sm'>Type: {item?.type}</h2>
                  </div>
                ))
              }

            </div>
        
    </div>
  )
}

export default QuestionlistContainer