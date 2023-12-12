import { useQuery } from "react-query";
import LiveClassCard from "../../components/common/LiveClassCard";
import Navbar from "../../components/common/navbar";
import { listLiveClass } from "../../api/studentapi";
import { useState } from "react";
import { findSubjects } from "../../api/adminapi";

const LiveClass = () => {
  const { data: classData } = useQuery({
    queryFn: () => listLiveClass(),
    queryKey: ["class"],
  });

  const { data: subjets } = useQuery({
    queryFn:()=>findSubjects()
  })

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const filteredData = classData?.data.filter((item: any) => {
    const toolName = item.topic.toLowerCase();
    const searchTermLowerCase = searchTerm.toLowerCase();
    const isToolNameMatch = toolName.includes(searchTermLowerCase);

    const isPricingTypeMatch = filterType === "All" || item.subject === filterType;

    return isToolNameMatch && isPricingTypeMatch;
  });

  return (
    <div>
      <Navbar />
      <div className=" h-36 bg-3447AE text-white mb-5">
        <div className="text-right">
          <h1 className=" text-3xl font-bold me-2 sm:me-32">
            Join <br />
           Our Live Classroom
          </h1>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <form className="flex flex-col md:flex-row gap-3 w-3/4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search for the topic you like"
              className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1">
              Search
            </button>
          </div>
          <select
            id="pricingType"
            name="pricingType"
            className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All</option>
            {
            (subjets?.data?.subject && subjets?.data?.subject.length) || 0
            &&  subjets?.data?.subject.map((item:any)=><option value={`${item}`}>{item}</option>)
            } 
          </select>
        </form>
      </div>

      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {filteredData?.map((item: any) => (
          <LiveClassCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default LiveClass;
