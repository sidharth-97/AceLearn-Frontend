import React, { useState, ChangeEvent, useRef, KeyboardEvent } from 'react';

interface OTPInputProps {
  onOTPChange: (otp: string) => void; // Callback to notify parent of OTP change
}

const OTPInput: React.FC<OTPInputProps> = ({ onOTPChange }) => {
  const [otp, setOTP] = useState(['', '', '', '']);
  const otpFields = Array.from({ length: 4 }, (_, index) => index);
  const otpInputRefs = otpFields.map(() => useRef<HTMLInputElement | null>(null));

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    const newOTP = [...otp];
    newOTP[index] = value;

    if (index < 3 && value !== '') {
      const nextInputRef = otpInputRefs[index + 1];
      if (nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
    setOTP(newOTP);
    onOTPChange(newOTP.join(''));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      const prevInputRef = otpInputRefs[index - 1];
      if (prevInputRef.current) {
        prevInputRef.current.focus();
      }
    }
  };
  const handleSubmit = () => {
  
}
  return (
    <div className="text-center">
    <h1 className="text-2xl font-bold mb-4">Enter OTP</h1>
    <div className="flex justify-center items-center">
      {otpFields.map((index) => (
        <input
          key={index}
          type="text"
          className="w-12 h-12 text-center text-2xl border border-gray-400 rounded-md mx-2"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={otpInputRefs[index]}
          maxLength={1}
        />
      ))}
    </div>
    <button
      className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
  );
};

export default OTPInput;
