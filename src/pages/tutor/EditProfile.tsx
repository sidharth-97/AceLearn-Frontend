import Navbar from '../../components/common/navbar'
import TutorSidebar from '../../components/tutors/TutorSidebar'
import EditProfileComponent from '../../components/tutors/EditProfileComponent'
import { useSelector } from 'react-redux'
import {useQuery} from 'react-query'
import { TutorDetails } from '../../api/tutorapi'
import MySkeleton from '../../components/UI/Skeleton'

const EditTutorProfile = () => {
  const { isTutor } = useSelector((state: any) => state.auth)
  console.log(isTutor._id);
  
    
    const { data:tutor, isLoading, isError } = useQuery({
        queryFn: () => TutorDetails(isTutor._id),
        queryKey:['tutor']
    })

  if (isError) {
    console.log("errorrrrrrrrrrrrrr");
  }

  console.log(tutor,"this is the tutor");
  
  return (
    <div className="text-black bg-9ED0F5">
   <Navbar/>
    <div className="flex flex-row">
      
      <TutorSidebar/>
        <div className="w-full">
          {
            isLoading?<MySkeleton/>: <EditProfileComponent data={tutor?.data} />
          }
        
      </div>
    </div>
  </div>
  )
}

export default EditTutorProfile