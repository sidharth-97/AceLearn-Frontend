import React from 'react';

type FormData = {
    subject: string;
    rate: string;
    bio: string;
  };

  interface Step1Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
  
const Step1:React.FC<Step1Props> = ({ formData, setFormData }) => {


  const handleOptionChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, subject: event.target.value });
  };

  return (
      <div className="Step1 p-4">
          <h1 className="text-xl font-semibold mb-2">Select your subject</h1>
      <select
        value={formData.subject}
        onChange={handleOptionChange}
        className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="Maths">Maths</option>
        <option value="Physics">Physics</option>
        <option value="Web development">Web development</option>
      </select>
      <p className="mt-2">Selected option: {formData.subject}</p>
    </div>
  );
};

export default Step1;
