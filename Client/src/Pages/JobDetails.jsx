import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/all-jobs/${id}`)
      .then(res => res.json())
      .then(data => setJob(data))
      .catch(error => console.error('Error fetching job details:', error));
  }, [id]);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: 'url',
      inputLabel: 'URL address',
      inputPlaceholder: 'Enter the URL',
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <PageHeader title="Single Job Page" path="single job" />
      {job ? (
        <>
          <h2>Job ID: {id}</h2>
          <br></br>
          <h1 className='text-2xl'>Job Title:{job.jobTitle}</h1>
          <br></br>
        
          {/* Display other job details here */}
          <p className='text-xl'>Job Description:{job.description}</p>
          <br></br>
          <p>Location: {job.jobLocation}</p>
          <p>Posting Date: {job.postingDate}</p>
          <p>Salary:${job.maxPrice}K</p>
          {/* Add more job details as needed */}
        </>

      ) : (
        <p>Loading job details...</p>
      )}
        <button
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              marginTop: '20px',
              cursor: 'pointer'
            }}
            onClick={handleApply}
          >
            Apply Now
          </button>
    </div>
  );
}

export default JobDetails;
