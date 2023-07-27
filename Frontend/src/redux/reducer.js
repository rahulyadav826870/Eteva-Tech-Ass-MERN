import { ADD_COMPANY_FAILURE, ADD_COMPANY_REQUEST, ADD_COMPANY_SUCCESS, COMPANIES_FAILURE, COMPANIES_REQUEST, COMPANIES_SUCCESS } from "./actionType";

const initialState = {
    companies: [],
    loading: false,
    error: null,
    sortBy: '_id', 
  sortOrder: 'asc', 
  };
  
  export const reducer = (state = initialState, {type,payload}) => {
    switch (type) {
      case COMPANIES_REQUEST:
      case ADD_COMPANY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case COMPANIES_SUCCESS:
        return {
          ...state,
          companies: payload,
          loading: false,
          error: null,
          sortBy: payload.sortBy, // Update sortBy in state
        sortOrder: payload.sortOrder, // Update sortOrder in state
        };
      case ADD_COMPANY_SUCCESS:
        return {
          ...state,
          companies: [...state.companies, payload],
          loading: false,
          error: null,
        };
      case COMPANIES_FAILURE:
      case ADD_COMPANY_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      default:
        return state;
    }
  };