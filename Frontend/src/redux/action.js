import axios from "axios";
import { ADD_COMPANY_FAILURE, ADD_COMPANY_REQUEST, ADD_COMPANY_SUCCESS, COMPANIES_FAILURE, COMPANIES_REQUEST, COMPANIES_SUCCESS } from "./actionType";

export const companiesRequest = () => ({
    type: COMPANIES_REQUEST,
  });
  
  export const companiesSuccess = (companies) => ({
    type: COMPANIES_SUCCESS,
    payload: companies,
  });
  
  export const companiesFailure = (error) => ({
    type: COMPANIES_FAILURE,
    payload: error,
  });
  
  export const addCompanyRequest = () => ({
    type: ADD_COMPANY_REQUEST,
  });
  
  export const addCompanySuccess = (company) => ({
    type: ADD_COMPANY_SUCCESS,
    payload: company,
  });
  
  export const addCompanyFailure = (error) => ({
    type: ADD_COMPANY_FAILURE,
    payload: error,
  });
  
  // Async action creator to fetch companies
  export const getCompanies = ({ sortBy, sortOrder }) => {
    return async (dispatch) => {
      dispatch(companiesRequest());
      try {
        const response = await axios.get('http://localhost:8900/compan',{ params: { sortBy, sortOrder } });
        console.log("response: ", response.data.company);
        dispatch(companiesSuccess(response.data.companyData));
      } catch (error) {
        console.log("error: ", error);
        dispatch(companiesFailure(error.message));
      }
    };
  };
  
  // Async action creator to add a new company
  export const addCompany = (companyData) => {
    return async (dispatch) => {
      dispatch(addCompanyRequest());
      try {
        const response = await axios.post('http://localhost:8900/company/add', companyData);
        console.log("response: ", response);
        // dispatch(addCompanySuccess(response.data));
      } catch (error) {
        dispatch(addCompanyFailure(error.response.data.error));
      }
    };
  };