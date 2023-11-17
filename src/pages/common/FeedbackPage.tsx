import React, { useEffect } from 'react';
import FeedbackForm from '../../components/common/FeedbackForm';
import { useParams } from 'react-router-dom';
import { tutorPayment } from '../../api/tutorapi';

const FeedbackPage = () => {
    const params = useParams()
    
    useEffect(() => {
        if (localStorage.getItem("student")) {
               let videoCallData=JSON.parse(localStorage.getItem("videocall")) 
        const data = {
            id: params.id,
            tutor:videoCallData.tutor
        }
        const functn =async() =>{
             await tutorPayment(data)  
        }
        functn()
        localStorage.removeItem("videocall")
        }
    
     
    },[])

  return (

    <section>
        <div className="bg-9ED0F5 text-white py-20">
            <div className="container mx-auto flex flex-col md:flex-row my-6 md:my-24">
                <div className="flex flex-col w-full lg:w-1/3 p-8">
                    <p className="ml-6 text-yellow-300 text-3xl font-extrabold uppercase tracking-loose">TUTOR REVIEW</p>
                    <p className="text-3xl md:text-5xl my-4 leading-relaxed md:leading-snug">Leave us a feedback!</p>
                    <p className="text-sm md:text-base leading-snug text-black text-opacity-100">
                        Please provide your valuable feedback and something something ...
                    </p>
                </div>
                <div className="flex flex-col w-full lg:w-2/3 justify-center">
                    <div className="container w-full px-4">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-6/12 px-4">
                                <div
                                    className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white">
                                    <div className="flex-auto p-5 lg:p-10">
                                        <h4 className="text-2xl mb-4 text-black font-semibold">Have a suggestion?</h4>
                                       <FeedbackForm/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default FeedbackPage;
