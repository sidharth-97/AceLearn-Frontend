import React,{useEffect, useState} from "react";
import image from "../../assets/WhatsApp Image 2023-10-13 at 1.41.45 PM.jpeg";
import { login } from "../../api/studentapi";
import {Tutorlogin} from "../../api/tutorapi"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useDispatch,useSelector} from 'react-redux'
import { loginStudent } from "../../slice/authSlice";
import {loginTutor} from "../../slice/authSlice"
import ColorToggleButton from "../UI/ToggleButton";
import { Link } from "react-router-dom";
import { GoogleLogin,CredentialResponse } from "@react-oauth/google";
import {jwtDecode} from 'jwt-decode';


interface login {
  type: string;
  placeholder: string;
  name: string;
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface propstype {
  user: string;
}

const Signin: React.FC<propstype> = ({ user }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { isStudent } = useSelector((state: any) => state.auth)
  const {isTutor}=useSelector((state:any)=>state.auth)

  useEffect(() => {
    if (isStudent) {
      navigate('/student/dashboard')
    } else if(isTutor) {
      navigate('/tutor/tutor-dashboard')
    }
  }, [])
  

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (!trimmedEmail || !trimmedPassword) {
      toast.error("Please fill all fields")
      return
    }
    const formData={
      email,password
    }
    if (user == 'student') {
      let response = await login(formData)
      console.log(response);
      
      if (response?.status == 200) {
        toast.success("Login successfull")
        dispatch(loginStudent(response.data))
        navigate('/')
      } else {
        toast.error("Invalid credentials")
      }
    } else {
      let response = await Tutorlogin(formData)
      if (response?.status == 200) {
        dispatch(loginTutor(response.data))
        toast.success("Login successfull")
        navigate('/tutor/tutordashboard')
      } else {
        
      } 
    }
  }
  
  
  const getGoogleUser = async (response: CredentialResponse) => {
    
    const decode: Object = jwtDecode(response.credential as string)
    const data = {
      email: decode.email,
      password: "123"
    }
    const result = await login(data)
    console.log(result);
  
    if (result?.status == 200) {
      toast.success("Login Successfull")
      navigate('/')
    } else {
      toast.error("Email already exists");
      console.log("here");
    
    }
  }

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px] flex flex-row">
      <div className="container mx-auto">
        <div className="w-full px-4">
          <div className="relative mx-auto max-w-[925px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px] flex flex-row">
            <div className="w-full lg:w-1/2">
              <div className="mb-10 text-center md:mb-16">
                {/* <h1 className="text-2xl font-bold">{user=="student"?"Student Login":"Tutor Login"}</h1> */}
                <ColorToggleButton/>
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox type="email" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <InputBox
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />

                <div className="mb-10">
                  <button
                    className="border-primary w-full cursor-pointer rounded-md border bg-3447AE py-3 px-5 text-base text-white transition hover:bg-opacity-90"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
              </form>
             {user=="student" && <><p className="mb-6 text-base text-[#adadad]">Connect With</p>
              <div className="mx-2 mb-12 flex justify-center">

           <GoogleLogin size="large" shape="pill" theme="outline" onSuccess={(response)=>{getGoogleUser(response)}
      } onError={()=>console.log("Error")
      }/>
                  </div></> }
              <a
                href="/#"
                className="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline"
              >
                Forget Password?
              </a>
              <p className="text-base text-[#adadad]">
                Not a member yet?
                <Link to={user=='student'?'/student/signup':'/tutor/signup'} className="text-primary hover:underline">Sign Up</Link>
              </p>
              <div>
                <span className="absolute top-1 right-1">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="1.39737"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 1.39737 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 1.39737 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 13.6943 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 13.6943 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 25.9911 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 25.9911 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="38.6026"
                      r="1.39737"
                      transform="rotate(-90 38.288 38.6026)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="1.99122"
                      r="1.39737"
                      transform="rotate(-90 38.288 1.99122)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 1.39737 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 13.6943 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 25.9911 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="26.3057"
                      r="1.39737"
                      transform="rotate(-90 38.288 26.3057)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.39737"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 1.39737 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="13.6943"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 13.6943 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="25.9911"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 25.9911 14.0086)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="38.288"
                      cy="14.0086"
                      r="1.39737"
                      transform="rotate(-90 38.288 14.0086)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
                <span className="absolute left-1 bottom-1">
                  <svg
                    width="29"
                    height="40"
                    viewBox="0 0 29 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="2.288"
                      cy="25.9912"
                      r="1.39737"
                      transform="rotate(-90 2.288 25.9912)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 14.5849 25.9911)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="25.9911"
                      r="1.39737"
                      transform="rotate(-90 26.7216 25.9911)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="13.6944"
                      r="1.39737"
                      transform="rotate(-90 2.288 13.6944)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 14.5849 13.6943)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="13.6943"
                      r="1.39737"
                      transform="rotate(-90 26.7216 13.6943)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="38.0087"
                      r="1.39737"
                      transform="rotate(-90 2.288 38.0087)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="2.288"
                      cy="1.39739"
                      r="1.39737"
                      transform="rotate(-90 2.288 1.39739)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 14.5849 38.0089)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="38.0089"
                      r="1.39737"
                      transform="rotate(-90 26.7216 38.0089)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="14.5849"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 14.5849 1.39761)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="26.7216"
                      cy="1.39761"
                      r="1.39737"
                      transform="rotate(-90 26.7216 1.39761)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="w-full lg:1/2" style={{ flex: 1 }}>
              {" "}
              {/* The container for the image */}
              <img
                src={image}
                alt=""
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

const InputBox: React.FC<login> = ({ type, placeholder, name,value,onChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
      />
    </div>
  );
};
