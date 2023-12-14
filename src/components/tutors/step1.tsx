import React from "react";
import { useQuery } from "react-query";
import { findSubjects } from "../../api/adminapi";

type FormData = {
  subjects: string[];
  rate: string;
  bio: string;
};

interface Step1Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const Step1: React.FC<Step1Props> = ({ formData, setFormData }) => {
  const handleOptionChange = (event:any) => {
    const selectedSubject = event.currentTarget.value;

    if (!formData.subjects.includes(selectedSubject)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        subjects: [...prevFormData.subjects, selectedSubject],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        subjects: prevFormData.subjects.filter(
          (subject) => subject !== selectedSubject
        ),
      }));
    }
  };

  const { data: subjects } = useQuery({
    queryFn: () => findSubjects(),
    queryKey: ["Subjects"],
  });

  return (
    <div className="Step1 p-4">
      <h1 className="text-xl font-semibold mb-2">Select your subject</h1>
      <div className="flex items-center justify-center p-4">
        <div className="grid grid-cols-2 gap-2">
          {subjects?.data?.subject.map((item: string, index: string) => (
            <button
              type="button"
              onClick={(e) => handleOptionChange(e)}
              key={index}
              value={item}
              className={`p-2 text-sm border ${
                formData.subjects.includes(item)
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300"
              } rounded focus:outline-none focus:border-blue-500 hover:bg-blue-100`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-2">Selected options: {formData.subjects.join(", ")}</p>
    </div>
  );
};

export default Step1;
