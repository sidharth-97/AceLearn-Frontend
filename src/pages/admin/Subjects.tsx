import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminHome';
import { useMutation, useQueryClient } from 'react-query';
import { addSubjects } from '../../api/adminapi';

const Subjects = () => {
  const [subject, setSubject] = useState('');
  const [classInfo, setClassInfo] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);

  const queryClient = useQueryClient();

  const addSubjectMutation = useMutation((subjectData) => addSubjects(subjectData), {
    onSuccess: () => {
        queryClient.invalidateQueries(['subjects']);
    },
  });
console.log(subject,"subjeed");

    const handleAddSubject = () => {
        console.log('Adding subject:', subject);

      
    if (subject.trim()) {
      addSubjectMutation.mutate({subject:subject});
      setSubject('');
    }
  };

    const handleAddClass = () => {
      console.log("add class");
      
    if (classInfo.trim()) {
      addSubjectMutation.mutate({class:classInfo})
      setClassInfo('');
    }
  };

  const handleDeleteSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleDeleteClass = (index) => {
    const updatedClasses = [...classes];
    updatedClasses.splice(index, 1);
    setClasses(updatedClasses);
  };

  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="max-w-md mx-auto mt-8 p-6 w-1/2 h-screen bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Subjects and Classes</h1>

        {/* Add Subject Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Add Subject</h2>
          <div className="flex">
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
            {subjects.map((subject, index) => (
              <li key={index} className="flex justify-between items-center border-b py-3">
                <span className="text-lg">{subject}</span>
                <button
                  onClick={() => handleDeleteSubject(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Class Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Add Class</h2>
          <div className="flex">
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
            {classes.map((classInfo, index) => (
              <li key={index} className="flex justify-between items-center border-b py-3">
                <span className="text-lg">{classInfo}</span>
                <button
                  onClick={() => handleDeleteClass(index)}
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
  );
};

export default Subjects;
