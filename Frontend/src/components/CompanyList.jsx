import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from '../redux/action';

const CompanyList = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('_id');
  const [sortOrder, setSortOrder] = useState("asc");
  const companies = useSelector((state) => state.companies);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const handleSort = (columnName) => {
    if (columnName === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    dispatch(getCompanies({ sortBy, sortOrder }));
  }, [sortBy, sortOrder]);

  if (loading) {
    return <div className='text-center my-4  '>
 <div className="spinner-border text-success" role="status">
    <span className="visually-hidden ">Loading...</span>
  </div>
    </div>
  }

  if (error) {
    return <div className='text-center my-4 fs-4 fw-bold text-danger'>Error : {error}</div>;
  }

  return (
    <div className="container my-4 ">
          <h1 className="mb-4">Company List</h1>
          <table className="table table-striped table-bordered table-responsive">
            <thead>
              <tr>
                <th onClick={() => handleSort('companyName')}>
              Company Name {sortBy === 'companyName' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('description')}>
            Description {sortBy === 'description' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>

            <th onClick={() => handleSort('contactNumber')}>
            Contact Number {sortBy === 'contactNumber' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>


            <th onClick={() => handleSort('contactEmail')}>
            Contact Email {sortBy === 'contactEmail' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>


            <th onClick={() => handleSort('logo')}>
            Logo {sortBy === 'logo' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>


            <th onClick={() => handleSort('state')}>
            State {sortBy === 'state' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
               
            <th onClick={() => handleSort('city')}>
            City {sortBy === 'city' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td>{company.companyName}</td>
                  <td>{company.description}</td>
                  <td>{company.contactNumber}</td>
                  <td>{company.contactEmail}</td>
                  <td>{company.logo && (<img src={`${company.logo}`} alt={company.companyName} width="50" height="50" />
                    )}</td>
                  <td>{company.state}</td>
                  <td>{company.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
     
  );
};

export default CompanyList;
