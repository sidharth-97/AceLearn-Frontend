import React, { useState } from 'react';

const NotificationModal = () => {
  const [isOpenm, setIsOpenm] = useState(false);

  const toggleModal = () => {
    setIsOpenm(!isOpenm);
  };
  console.log(isOpenm,"----------------");
  

  const modalContainerStyles = {
    height: '100vh',
    width: '15%',
    maxWidth: '100%',
    backgroundColor: 'white',
    borderLeft: '1px solid #e2e8f0',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    transform: isOpenm ? 'translateX(0)' : 'translateX(100%)',
  };

  // Add a style for the transition
  const transitionStyle = isOpenm ? 'transform 500ms ease-in-out' : 'transform 500ms ease-in-out';

  return (
    <div>
      <button
        type="button"
        className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring focus:border-blue-300"
        onClick={toggleModal}
      >
        Toggle Notification Modal
      </button>

      {isOpenm && (
        <div className="fixed inset-0 z-50 flex items-center justify-end overflow-x-hidden overflow-y-auto">
          <div style={{ ...modalContainerStyles, transition: transitionStyle }}>
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200">
              <h3 className="text-2xl font-semibold">Notification Modal</h3>
              <button
                type="button"
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                onClick={toggleModal}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            <div className="relative p-6 flex-auto overflow-y-auto">
              <div className="py-2">
                {/* Notification items */}
                <a href="#" className="flex items-center px-4 py-3 -mx-2 border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700">
                  {/* Notification content */}
                </a>
                {/* Add more notification items as needed */}
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200">
              <button
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-500 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
                onClick={toggleModal}
              >
                Close
              </button>
              <button
                type="button"
                className="py-2 px-3 ml-2 text-sm font-semibold text-white rounded-lg border border-transparent bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
