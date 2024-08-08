import { React, useState, useEffect } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage=6;
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs/")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    // console.log(event.target.value)
  };

  //filter job by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  // radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  //button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };
  // calculate index range
  const calculatePageRange=()=>{
    const startIndex=(currentPage-1)*itemsPerPage;
    const endIndex=startIndex+itemsPerPage
    return {startIndex , endIndex}
  }
  // function for the next page
  const nextPage=()=>{
    if(currentPage <Math.ceil(filteredItems.length/itemsPerPage)){
      setCurrentPage(currentPage+1);
    }
  }
  // func for prev page
     const prevPage=()=>{
      if(currentPage>1){
        setCurrentPage(currentPage-1)
      }

     }
  //main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filteredItems;
    }
    //category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          (jobLocation && jobLocation.toLowerCase() === selected.toLowerCase()) ||
          (maxPrice && parseInt(maxPrice) <= parseInt(selected)) ||
          (postingDate && postingDate >= selected) ||
          (experienceLevel && experienceLevel.toLowerCase() === selected.toLowerCase()) ||
          (salaryType && salaryType.toLowerCase() === selected.toLowerCase()) ||
          (employmentType && employmentType.toLowerCase() === selected.toLowerCase())
      );
    }
    //slice the data based on current page
    const {startIndex,endIndex}=calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex,endIndex)
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };
  const result = filteredData(jobs, selectedCategory, query);
  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 py-12">
        {/* left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* jobs card */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {
            isLoading ?(<div class="relative flex w-64 animate-pulse gap-2 p-4">
            <div class="h-12 w-12 rounded-full bg-slate-400"></div>
            <div class="flex-1">
              <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
              <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
            </div>
            <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
          </div>): result.length >0 ? (<Jobs result={result}/>):<>
          <h3 className="text-lg font-bold mb-2">{result.length}Jobs</h3>
          <p>No data found</p></>
          }
          {/* pagination */}
          {
            result.length > 0 ? (
              <div className="flex justify-center mt-4 space-x-8">
                <button onClick={prevPage} disabled={currentPage===1} className="hover:underline">Previous</button>
                <span>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems /itemsPerPage)} className="hover:underline">Next</button>
              </div>

            ): ""
          }
        
        </div>
        {/* right side */}
        {/* <div className="bg-white p-4 rounded"><Newsletter/></div> */}
      </div>
    </div>
  );
}

export default Home;
