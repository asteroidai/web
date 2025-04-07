import * as React from 'react'
import { useState } from 'react';

type ValidationErrors = {
  [key: string]: string;
};

type FormView = 'form' | 'review';

// Simplified demo data
const DEMO_DATA = {
  firstName: 'John',
  lastName: 'Smith',
  dateOfBirth: '15-06-1985',
  email: 'john.smith@example.com',
  phoneNumber: '07700900123',
  hasInsurance: true,
  wantsNewsletter: false,
  agreeToTerms: true
};

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    hasInsurance: false,
    wantsNewsletter: false,
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [view, setView] = useState<FormView>('form');

  const validateField = (field: string, value: any): string => {
    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value) return 'This field is required';
        if (value.length < 2) return 'Must be at least 2 characters';
        break;
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        // Check format
        const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
        if (!dateRegex.test(value)) return 'Please use dd-mm-yyyy format';
        // Parse date (accounting for dd-mm-yyyy format)
        const [day, month, year] = value.split('-').map(Number);
        const dob = new Date(year, month - 1, day);
        // Check if date is valid
        if (isNaN(dob.getTime())) return 'Invalid date';
        const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        if (age < 18) return 'Must be at least 18 years old';
        break;
      case 'email':
        if (!value) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email address';
        break;
      case 'phoneNumber':
        if (!value) return 'Phone number is required';
        const phoneRegex = /^[\d\s+()-]{10,}$/;
        if (!phoneRegex.test(value)) return 'Invalid phone number';
        break;
      case 'agreeToTerms':
        if (!value) return 'You must agree to the terms';
        break;
    }
    return '';
  };

  const handleChange = (field: string, value: any) => {
    setTouched(prev => new Set(prev).add(field));

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: ValidationErrors = {};

    Object.keys(formData).forEach(field => {
      setTouched(prev => new Set(prev).add(field));
      const error = validateField(field, formData[field]);
      if (error) {
        isValid = false;
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setView('review');
    }
  };

  // Review component remains mostly the same but simplified
  const FormReview = ({
    formData,
    onBack
  }: {
    formData: any,
    onBack: () => void
  }) => {
    const [submitted, setSubmitted] = useState(false);
    const [submissionCode, setSubmissionCode] = useState('');

    const verifyData = () => {
      return JSON.stringify(formData) === JSON.stringify(DEMO_DATA);
    };

    const handleSubmit = () => {
      const isMatch = verifyData();
      setSubmissionCode(isMatch ? 'ASTEROID_1' : 'ASTEROID_0');
      setSubmitted(true);
    };

    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow mt-32">
        <h2 className="text-2xl font-bold mb-6">Review Your Information</h2>
        <dl className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-4">
              <dt className="font-medium">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</dt>
              <dd className="col-span-2">{(typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value) as string}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>

        {submitted && (
          <div className={`mt-4 p-4 rounded-md ${submissionCode === 'ASTEROID_1' ? 'bg-green-50' : 'bg-yellow-50'
            }`}>
            <p>Submission Code: {submissionCode}</p>
          </div>
        )}
      </div>
    );
  };

  if (view === 'review') {
    return <FormReview formData={formData} onBack={() => setView('form')} />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow mt-48 mb-48">
      <h1 className="text-2xl font-bold mb-6">Personal Information Form</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <p className="text-sm text-gray-500">Please fill out the form below to apply for a commercial property insurance policy.</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`mt-1 block w-full rounded-md border-2 ${errors.firstName && touched.has('firstName')
                ? 'border-red-300'
                : 'border-gray-300'
                }`}
            />
            {errors.firstName && touched.has('firstName') && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className={`mt-1 block w-full rounded-md border-2 ${errors.lastName && touched.has('lastName')
                ? 'border-red-300'
                : 'border-gray-300'
                }`}
            />
            {errors.lastName && touched.has('lastName') && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth (dd-mm-yyyy)</label>
          <input
            type="text"
            placeholder="dd-mm-yyyy"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className={`mt-1 block w-full rounded-md border-2 ${errors.dateOfBirth && touched.has('dateOfBirth')
              ? 'border-red-300'
              : 'border-gray-300'
              }`}
          />
          {errors.dateOfBirth && touched.has('dateOfBirth') && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`mt-1 block w-full rounded-md border-2 ${errors.email && touched.has('email')
              ? 'border-red-300'
              : 'border-gray-300'
              }`}
          />
          {errors.email && touched.has('email') && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            className={`mt-1 block w-full rounded-md border-2 ${errors.phoneNumber && touched.has('phoneNumber')
              ? 'border-red-300'
              : 'border-gray-300'
              }`}
          />
          {errors.phoneNumber && touched.has('phoneNumber') && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasInsurance"
              checked={formData.hasInsurance}
              onChange={(e) => handleChange('hasInsurance', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="hasInsurance" className="ml-2 text-sm text-gray-700">
              Do you currently have insurance?
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="wantsNewsletter"
              checked={formData.wantsNewsletter}
              onChange={(e) => handleChange('wantsNewsletter', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="wantsNewsletter" className="ml-2 text-sm text-gray-700">
              Would you like to receive our newsletter?
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
              I agree to the terms and conditions
            </label>
          </div>
          {errors.agreeToTerms && touched.has('agreeToTerms') && (
            <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-500 mb-3">By submitting this form, you agree to our Terms and Conditions:</p>

          <div className="space-y-2 text-xs text-gray-600 pl-4">
            <p>1. The information provided in this application must be true, accurate, and complete to the best of your knowledge.</p>
            <p>2. You authorize us to verify any information provided and to obtain additional information as necessary.</p>
            <p>3. Submission of this form does not guarantee insurance coverage or policy issuance.</p>
            <p>4. Your personal information will be processed in accordance with our Privacy Policy.</p>
            <p>5. We reserve the right to decline applications at our discretion.</p>
          </div>

          <p className="text-sm text-gray-500 mt-3">Please review all information carefully before proceeding.</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-48"
          >
            Review
          </button>
        </div>
      </form>

      {/* Hidden demo data button */}
      <div className="fixed bottom-4 right-4">
        <button
          type="button"
          onClick={() => setFormData(DEMO_DATA)}
          className="opacity-0"
        >
          <span>Terms and Conditions</span>
        </button>
      </div>
    </div>
  );
} 
