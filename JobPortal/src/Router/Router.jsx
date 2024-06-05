
import App from "../App";
import Home from "../Pages/Home";
import About from  "../Pages/About"
import { createBrowserRouter } from "react-router-dom";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../components/AuthLogin";
import JobDetails from "../Pages/JobDetails";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {path:"/" , element:<Home/>},
        {path:"/post-job" , element:<CreateJob/>},
         {path:"/my-jobs" , element:<MyJobs/>},
         {path:"/salary" , element:<SalaryPage/>},
         {path:"/login" , element:<Login/>},
         {path:"/job/:id" , element:<JobDetails/>},
         {path:"edit-job/:id" , element:<UpdateJob/>,
           loader:({params})=>fetch(`http://localhost:5000/all-jobs/${params.id}`)
          }
     
      ]
    },
  ]);
  export default router;