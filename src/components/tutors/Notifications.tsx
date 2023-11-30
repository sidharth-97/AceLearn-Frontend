import { useQuery } from 'react-query'
import { tutorNotifications } from '../../api/tutorapi'
import { useSelector } from 'react-redux'
import { CiCalendarDate } from 'react-icons/ci'

const Notifications = () => {
  const { isTutor } =useSelector((state) => state.auth)
  const { data } = useQuery({
    queryFn:()=>tutorNotifications(isTutor._id)
  })
  return (
    <div className="flex justify-center items-center">
    {" "}
      <div className="bg-white border border-gray-300 p-4 mb-4 shadow-md rounded-md">
        {
          data?.data.length ? data?.data.map((notify) => (
           <div className="flex items-center mt-2">
          <div>
              {notify.type == "wallet" ? <div className="bg-yellow-300 p-4 rounded-full mr-4">
                {/* Wallet icon or any other wallet-related content */}
                💰
              </div> : <div className="mr-4"> <CiCalendarDate style={{ fontSize: "3rem" }} /></div>}

            </div>
        <div className="flex flex-col items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-600">
              {notify.title}
            </h3>
          </div>
          <p className="text-gray-700 mt-2">
            {
              notify.content
            }
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(Date.now()).toLocaleDateString()}
          </p>{" "}
          <div className="border-b w-full py-2 "></div>
        </div>
        <div>
          {" "}
          <button className="ms-3 text-gray-500">&#10006;</button>
        </div>
      </div> 
          )):"No new notifications"
        }
      
    </div>
  </div>
  )
}

export default Notifications