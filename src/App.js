import React, { useState } from 'react';
import * as Yup from 'yup'; // For validation (optional)

// Step 1 - Personal Information Component
const Step1 = ({ formData, setFormData, nextStep }) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please fill out both first name and last name');
    } else {
      setError('');
      nextStep();
    }
  };

  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

// Step 2 - Contact Information Component
const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [error, setError] = useState('');

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = () => {
    if (!formData.email) {
      setError('Email is required');
    } else if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
    } else {
      setError('');
      nextStep();
    }
  };

  return (
    <div>
      <h2>Step 2: Contact Information</h2>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={prevStep}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

// Step 3 - Submit Form
const Step3 = ({ formData, prevStep, submitForm }) => {
  return (
    <div>
      <h2>Step 3: Review and Submit</h2>
      <p>
        <strong>First Name:</strong> {formData.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {formData.lastName}
      </p>
      <p>
        <strong>Email:</strong> {formData.email}
      </p>
      <button onClick={prevStep}>Back</button>
      <button onClick={submitForm}>Submit</button>
    </div>
  );
};

// Multi-Step Form Container
const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const submitForm = () => {
    alert('Form Submitted Successfully!');
    console.log(formData);
  };

  switch (step) {
    case 1:
      return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />;
    case 2:
      return (
        <Step2
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return <Step3 formData={formData} prevStep={prevStep} submitForm={submitForm} />;
    default:
      return <div>Error in form navigation</div>;
  }
};

const App = () => {
  return (
    <div>
      <h1>Multi-Step Form with Validation</h1>
      <MultiStepForm />
    </div>
  );
};

export default App;
