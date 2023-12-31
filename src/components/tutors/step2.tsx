import React from 'react';

// type FormData = {
//     subject: string;
//     rate?: string;
//   bio: string;
//     fee?:string
//   };

  interface Step2Props {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Step2:React.FC<Step2Props> = ({ formData, setFormData }) => {


  return (
    <div className="Step2 p-4">
      <h1 className="text-xl font-semibold mb-2">Enter your hourly rate</h1>
      <input
        type="number"
        min={0}
        value={formData.fee}
        onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
        className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  );
};

export default Step2;
