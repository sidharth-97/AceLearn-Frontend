import React from 'react';

type FormData = {
    subject: string;
    rate: string;
    bio: string;
  };

  interface Step3Props {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step3:React.FC<Step3Props> = ({ formData, setFormData }) => {

  const handleBioChange = (e:any) => {
    setFormData({ ...formData, bio: e.target.value });
  };

  return (
    <div className="Step3 p-4">
      <h1 className="text-xl font-semibold mb-2">Enter your bio</h1>
      <textarea
        value={formData.bio}
        onChange={handleBioChange}
        className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-500 h-40"
      />
    </div>
  );
};

export default Step3;
