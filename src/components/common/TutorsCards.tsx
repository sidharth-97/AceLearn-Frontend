import {useEffect,useState} from 'react'
import { getalltutors } from '../../api/tutorapi'
import { Link } from 'react-router-dom'
import { Tutor } from '../../model/tutorModel'
import Skeleton from 'react-loading-skeleton'

const TutorsCards = () => {
  const [tutorList, setTutorList] = useState([]) 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Tutordata = await getalltutors('?sort=rating');
        setTutorList(Tutordata?.data.AllTutor);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tutor data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  console.log(setTutorList);
  
  return (
    <div className="p-1 flex flex-wrap items-center justify-center">
      {
        loading?( Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-40 m-4">
            <Skeleton height={200} className='rounded-full'/>
            <Skeleton height={20} width={120} className="mt-2 rounded-full" />
            <Skeleton height={20} width={80} className="mt-1" />
          </div>
        ))):(    tutorList.map((tutor:Tutor, index) => (
      <Link to={`/tutor/tutorProfile/${tutor._id}`}>    <div key={index} className={""}>
        {/* <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: 0.1 }}>
          <rect x="159.52" y="175" width="152" height="152" rx="8" transform={`rotate(-45 159.52 175)`} fill="white" />
          <rect y="107.48" width="152" height="152" rx="8" transform={`rotate(-45 0 107.48)`} fill="white" />
        </svg> */}
        <div className="relative pt-10 px-10 flex items-center justify-center">
        
          <img className="relative w-40 rounded-full" src={tutor.image} alt="" />
        </div>
        <div className="relative text-white px-6 pb-6 mt-6">
          <span className="block opacity-75 -mb-1 text-black">{tutor.name}</span>
          <div className="flex justify-between">
            <span className="block font-semibold text-xl text-black">{tutor.subject[0]}</span>
            <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">Rs. {tutor.fee}/hr</span>
          </div>
        </div>
      </div>
      </Link>
  
    )))
      }
   
  </div>
  )
}

export default TutorsCards