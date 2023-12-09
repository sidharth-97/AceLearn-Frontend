import { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";

interface Transaction {
  title: string;
  details: string;
  amount: number;
  type: string;
  date: Date;
}
interface WalletHistoryProps {
  walletHistory?: Transaction[];
}

const WalletHistory: React.FC<WalletHistoryProps> = ({ walletHistory }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    // Add or remove 'overflow-hidden' class to body based on modal visibility
    if (modalVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup effect
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalVisible]);

  return (
    <div>
      <button
        data-modal-target="static-modal"
        data-modal-toggle="static-modal"
        className="px-4 py-2 text-sm font-medium text-blue-500 underline rounded-md"
        type="button"
        onClick={toggleModal}
      >
        Wallet History
      </button>

      {/* Main modal */}
      <div
        id="static-modal"
        data-modal-backdrop="static"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          modalVisible
            ? "fixed inset-0 overflow-hidden flex items-center justify-center"
            : "hidden"
        } z-50`}
      >
        <div
          className={`${
            modalVisible ? "fixed inset-0 bg-black opacity-50" : ""
          } transition-opacity duration-300`}
          onClick={hideModal}
        ></div>
        <div className="relative p-4 w-full max-w-2xl h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow h-full overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Wallet History
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                onClick={hideModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-4 md:p-5">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border-b p-2"></th>
                      <th className="border-b p-2">Title</th>
                      <th className="border-b p-2">Details</th>
                      <th className="border-b p-2">Amount</th>
                      <th className="border-b p-2">Date</th>
                      <th className="border-b p-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletHistory?.map((transaction: Transaction, index: number) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        {transaction.type == "Credit" ? (
                          <td
                            className="border-b p-2"
                            style={{ color: "green", fontSize: "24px" }}
                          >
                            <FaArrowAltCircleUp />
                          </td>
                        ) : (
                          <td
                            className="border-b p-2"
                            style={{ color: "red", fontSize: "24px" }}
                          >
                            <FaArrowCircleDown />
                          </td>
                        )}
                        <td className="border-b p-2">{transaction.title}</td>
                        <td className="border-b p-2">{transaction.details}</td>
                        <td className="border-b p-2">{transaction.amount}</td>
                        <td className="border-b p-2">
                          {transaction?.date?.toString()}
                        </td>
                        <td className="border-b p-2">{transaction.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="static-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={hideModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletHistory;
