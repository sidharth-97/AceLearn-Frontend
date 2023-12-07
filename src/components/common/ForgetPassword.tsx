import { useState } from "react";
import OTPInput from "./OTPInput";
import { forgetPasswordStep1, forgetPasswordStep2 } from "../../api/studentapi";
import { TforgetPasswordStep1,TforgetPasswordStep2 } from "../../api/tutorapi";
import ForgetPassFinal from "./ForgetPassFinal";
import Navbar from "./navbar";

const ForgetPassword:React.FC<{tutor:boolean}>= ({tutor}) => {
  const [email, setEmail] = useState("");
  const [next, setNext] = useState(false);
  const [otp, setOTP] = useState("");
  const [final,setFinal]=useState(false)

    const handleEmail = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const obj = {
        email,
        username:email
      }
      if (tutor) {
        const response = await TforgetPasswordStep1(obj)
        console.log(response);
        
      } else {
        const response = await forgetPasswordStep1(obj)
        console.log(response);
        
      }
      
        setNext(true)
  };
  function handleOTPChange(otp: string): void {
    setOTP(otp);
  }

  const submitOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (tutor) {
      const response = await TforgetPasswordStep2({ otp: otp })
      if(response?.status==200) setFinal(true)
    } else {
      const response = await forgetPasswordStep2({otp: otp })
      if(response?.status==200) setFinal(true)
    }
    
}

  return (
    <div>
      <Navbar/>
     <main
        id="content"
        role="main"
        className="w-full max-w-md mx-auto p-6"
      >
        <div className="mt-7 bg-white  rounded-xl shadow-lg ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Remember your password?
                <a
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  Login here
                </a>
              </p>
            </div>
            {!final ? (
              !next ? (
                <div className="mt-5">
                  <form onSubmit={handleEmail}>
                    <div className="grid gap-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-bold ml-1 mb-2 "
                        >
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                            required
                            aria-describedby="email-error"
                          />
                        </div>
                        <p
                          className="hidden text-xs text-red-600 mt-2"
                          id="email-error"
                        >
                          Please include a valid email address so we can get
                          back to you
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
                      >
                        Reset password
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="w-full">
                  <form onSubmit={submitOtp}>
                    <OTPInput onOTPChange={handleOTPChange} />
                    <button className="bg-black text-white rounded-md p-2 mt-3 ms-5" type="submit">Submit</button>
                  </form>
                </div>
              )
            ) : (
                <ForgetPassFinal email={email} tutor={tutor} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgetPassword;
