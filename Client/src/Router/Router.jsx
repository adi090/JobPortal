import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';
import About from '../Pages/About';
import CreateJob from '../Pages/CreateJob';
import MyJobs from '../Pages/MyJobs';
import SalaryPage from '../Pages/SalaryPage';
import UpdateJob from '../Pages/UpdateJob';
import Login from '../components/AuthLogin';
import JobDetails from '../Pages/JobDetails';
import PrivateRoute from '../components/PrivateRoute'; 
// import Profile from '../Pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/login', element: <Login /> },
      { path: '/job/:id', element: <JobDetails /> },
      {
        path: '/post-job',
        element: (
          <PrivateRoute element={CreateJob} />
        ),
      },
      {
        path: '/my-jobs/',
        element: (
          <PrivateRoute element={MyJobs} />
        ),
      },
      {
        path: '/salary',
        element: (
          <PrivateRoute element={SalaryPage} />
        ),
      },
      {
        path: 'edit-job/:id',
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
      },  
      {
        path: '/job/:id',
        element: <JobDetails />,
        // loader: ({ params }) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
      }
      // {
      //  path:'/profile',
      //  element:<Profile />
      // }
    ],
  },
]);

export default router;
