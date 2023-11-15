import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminHome";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addSubjects, deleteSubject, findSubjects } from "../../api/adminapi";

const Subjects = () => {
  const [subject, setSubject] = useState("");
  const [classInfo, setClassInfo] = useState("");

  const { data: response, isLoading } = useQuery({
    queryFn: () => findSubjects(),
    queryKey: ["subjects"],
  });

  const queryClient = useQueryClient();

  const addSubjectMutation = useMutation(
    (subjectData) => addSubjects(subjectData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["subjects"]);
      },
    }
  );

  const deleteSubjectMutation = useMutation(
    (subjectData) => deleteSubject(subjectData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["subjects"]);
      },
    }
  );

  const handleAddSubject = () => {
    console.log("Adding subject:", subject);

    if (subject.trim()) {
      addSubjectMutation.mutate({ subject: subject });
      setSubject("");
    }
  };

  const handleAddClass = () => {
    console.log("add class");

    if (classInfo.trim()) {
      addSubjectMutation.mutate({ class: classInfo });
      setClassInfo("");
    }
  };

  const handleDeleteSubject = (subject: string) => {
    console.log(subject, "this is the au");

    deleteSubjectMutation.mutate({ subject: subject });
    setSubject("");
  };

  const handleDeleteClass = (classes: string) => {
    deleteSubjectMutation.mutate({ class: classes });
  };

  return (
    <div className="flex flex-row">
    <AdminSidebar />
  
    <div className="mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Subjects and Classes
      </h1>
  
      <div className="flex gap-14">
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Add Subject</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject Name"
              className="flex-grow px-4 py-2 mr-2 focus:outline-none"
            />
            <button
              onClick={handleAddSubject}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <ul>
            {response?.data.subject.map((subject, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-3"
              >
                <span className="text-lg">{subject}</span>
                <button
                  onClick={() => handleDeleteSubject(subject)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
  
        <div>
          <h2 className="text-xl font-bold mb-4">Add Class</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={classInfo}
              onChange={(e) => setClassInfo(e.target.value)}
              placeholder="Class Information"
              className="flex-grow px-4 py-2 mr-2 focus:outline-none"
            />
            <button
              onClick={handleAddClass}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <ul>
            {response?.data.class.map((classInfo, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-3"
              >
                <span className="text-lg">{classInfo}</span>
                <button
                  onClick={() => handleDeleteClass(classInfo)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Subjects;
