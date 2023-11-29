import React, { useState } from 'react'
import { forgetPasswordFinal, forgetPasswordStep2 } from '../../api/studentapi'

const ForgetPassFinal = ({email}) => {
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  
  const handlePassword = async (e) => {
    e.preventDefault()
    const data = {
        email,password
    }
    const response = await forgetPasswordFinal(data)
    console.log(response);
    
}

  return (
      <div>
             <div>
            <form onSubmit={handlePassword}>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  name="password_confirmation"
                  className="block w-full mt-1 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <button type="submit">Change Password</button>
            </form>
          </div>
    </div>
  )
}

export default ForgetPassFinal