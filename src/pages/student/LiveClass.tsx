import { useQuery } from "react-query"
import LiveClassCard from "../../components/common/LiveClassCard"
import Navbar from "../../components/common/navbar"
import { listLiveClass } from "../../api/studentapi"



const LiveClass = () => {

    const { data: classData } = useQuery({
        queryFn: () => listLiveClass(),
        queryKey:["class"]
    })
console.log(classData);

  return (
      <div>
          <Navbar/>
          <h1>Live class</h1>
          <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
              {
                  classData?.data.map((item) => <LiveClassCard data={item} />)
              }
              
      </div>
      </div>
  )
}

export default LiveClass