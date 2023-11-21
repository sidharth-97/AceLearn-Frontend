import React, { useState,useEffect } from 'react';
import image1 from '../../assets/WhatsApp Image 2023-10-13 at 1.41.45 PM.jpeg';
import image2 from '../../assets/online-lecturing-distance-learning-opportunities-self-education-internet-courses-e-learning-technologies_335657-3279.svg'
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import OTPInput from '../common/OTPInput';
import { signup, signupFinal } from '../../api/tutorapi';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const TutorOnBoard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState(['Step1', 'Step2', 'Step3','Step4']);
  const [otp, setOTP] = useState("")
  
  const navigate=useNavigate()

  function handleOTPChange(otp: string): void {
    setOTP(otp);
  }

  const [formData, setFormData] = useState({
    subject: '',
    rate: '',
    bio: '',
  });
  const totalSteps = title.length;

  const pageDisplay = () => {
    if (step === 0) {
      return <Step1 formData={formData} setFormData={setFormData} />;
    } else if (step === 1) {
      return <Step2 formData={formData} setFormData={setFormData} />;
    } else if(step==2) {
      return <Step3 formData={formData} setFormData={setFormData} />;
    } else {
      return <OTPInput onOTPChange={handleOTPChange}/>
    }
  };

  const handleNext = async() => {
    if (step === totalSteps - 1) {
      const result = await signupFinal({ ...formData, otp: otp })
      if (result?.status == 200) {
        navigate('/tutor/tutordashboard')
        toast.success("Signup successfull")
      }
    } else {
      setStep((current) => current + 1);
    }
  };

  useEffect(() => {
    const isSignupStepCompleted = localStorage.getItem('signupStepCompleted');

    if (!isSignupStepCompleted) {
    navigate('/tutor/signup')
    }
    return () => {
      // localStorage.removeItem('signupStepCompleted')
    }
  }, []);

  const progress = totalSteps > 0 ? (step / (totalSteps - 1)) * 100 : 100; 

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px] flex flex-row">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-[925px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px] flex flex-row">
          <div className="w-full lg:w-1/2">
            {totalSteps > 0 && (
              <div className="mb-10 text-center md:mb-16">
                <div className="relative w-full">
                  <div className="progressbar bg-blue-200 h-3 rounded-md">
                    <div
                      className="progress bg-blue-500 h-3 rounded-md"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="step-indicators flex justify-between mt-2">
                    {title.map((stepTitle, index) => (
                      <div
                        key={index}
                        className={`step-number ${
                          step === index ? 'text-blue-500' : 'text-gray-300'
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <form>
              {pageDisplay()}
              <div className="footer mt-4">
                <button
                  type='button'
                  disabled={step === 0}
                  onClick={() => {
                    setStep((current) => current - 1);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
                >
                  Prev
                </button>
                <button
                  type='button'
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {step === title.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </form>
          </div>
          <div className="w-full lg:w-1/2" style={{ flex: 1 }}>
            <img
              src={step === 0 ? image1 : step === 1 ? image2 : image1}
              alt=""
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorOnBoard;
