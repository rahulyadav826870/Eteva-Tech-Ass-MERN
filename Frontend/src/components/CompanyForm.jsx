import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCompany } from '../redux/action';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    contactNumber: '',
    contactEmail: '',
    logo: "",
    state: '',
    city: '',
  });

  const [errors, setErrors] = useState({});
  const dispatch=useDispatch()


  const states = [
    'Maharashtra',
    'Karnataka',
    'Tamil Nadu',
  ];

  const citiesByState = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Karnataka: ['Bengaluru', 'Mysuru', 'Hubballi'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: citiesByState[selectedState][0] });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setFormData({ ...formData, city: selectedCity });
  };

  const contactNumberRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Perform form validation here, e.g. check for required fields, email format, etc.

    //  Company Name is required
    if (!formData.companyName.trim()) {
      validationErrors.companyName = 'Company Name is required';
    }

    if (!formData.description.trim()) {
        validationErrors.description = 'Company description is required';
      }

      if (!formData.contactNumber.trim()) {
        validationErrors.contactNumber = 'Contact number is required';
      } else if (!contactNumberRegex.test(formData.contactNumber)) {
        validationErrors.contactNumber = 'Invalid contact number';
      }

      if (!formData.contactEmail.trim()) {
        validationErrors.contactEmail = 'Email is required';
      } else if (!emailRegex.test(formData.contactEmail)) {
        validationErrors.contactEmail = 'Invalid email format';
      }

      if (!formData.state) {
        validationErrors.state = 'State is required';
      }
      if (!formData.logo) {
        validationErrors.state = 'Image is required';
      }
  
      if (!formData.city) {
        validationErrors.city = 'City is required';
      }
  
      if (!formData.logo) {
        validationErrors.logo = 'Logo is required';
      }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Call your API to submit the form data
      dispatch(addCompany(formData))
      console.log('Form submitted:', formData);
      // Reset the form and clear errors
      
    //   setFormData({
    //     companyName: '',
    //     description: '',
    //     contactNumber: '',
    //     contactEmail: '',
    //     logo: null,
    //     state: '',
    //     city: '',
    //   });
    //   setErrors({});
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <h1 className="mb-4">Add New Company</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.companyName ? 'is-invalid' : ''}`}
                id="companyName"
                placeholder='Name'
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
            </div>

            <div className="mb-3">
              <label  className="form-label">
                Company Description
              </label>
              <input
                type="text"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                id="description"
                placeholder='Decription'
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}
                id="contactNumber"
                placeholder='Number'
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                
              />
              {errors.contactNumber && <div className="invalid-feedback">{errors.contactNumber}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactEmail" className="form-label">
                Contact Email
              </label>
              <input
                type="text"
                className={`form-control ${errors.contactEmail ? 'is-invalid' : ''}`}
                id="contactEmail"
                name="contactEmail"
                placeholder='Email'
                value={formData.contactEmail}
                onChange={handleInputChange}
              />
              {errors.contactEmail && <div className="invalid-feedback">{errors.contactEmail}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="contactEmail" className="form-label">
                Image
              </label>
              <input
                type="text"
                className={`form-control ${errors.logo ? 'is-invalid' : ''}`}
                id="logo"
                name="logo"
                placeholder='Image Url'
                value={formData.logo}
                onChange={handleInputChange}
              />
              {errors.logo && <div className="invalid-feedback">{errors.logo}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select
                className={`form-select ${errors.state ? 'is-invalid' : ''}`}
                id="state"
                name="state"
                value={formData.state}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <div className="invalid-feedback">{errors.state}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <select
                className={`form-select ${errors.city ? 'is-invalid' : ''}`}
                id="city"
                name="city"
                value={formData.city}
                onChange={handleCityChange}
              >
                <option value="">Select City</option>
                {citiesByState[formData.state]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <div className="invalid-feedback">{errors.city}</div>}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
