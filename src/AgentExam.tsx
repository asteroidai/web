import * as React from 'react'
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FormSection = 'contact' | 'business' | 'premises' | 'security' | 'coverage';

type ValidationErrors = {
  [key: string]: {
    [key: string]: string;
  };
};

type FormView = 'form' | 'review';

// Add this constant at the top of the file after the types
const DEMO_DATA = {
  contact: {
    title: 'Prof',
    firstName: 'Vladimir',
    lastName: 'McDougal',
    dateOfBirth: '1975-06-15',
    phoneNumber: '07823456789',
    jointInsured: true,
    jointInsuredPersonName: 'Zelda Winterbottom',
    numberOfYearsAsLandlord: 12,
  },
  business: {
    name: 'Quantum Property Dynamics Ltd',
    type: 'Private Limited Company (LTD)',
    trade: 'Luxury Space Station Rentals',
    address: {
      addressLine1: '42 Nebula Gardens',
      addressLine2: 'Cosmic Quarter',
      addressLine3: 'Starlight District',
      city: 'Newcastle',
      postcode: 'NE1 4XD',
    },
    ernTaxCode: '789/XZ98765',
    websiteUrl: 'www.quantum-properties-multiverse.com',
    description: 'Specializing in avant-garde property management',
    exemptFromERNCode: false,
    yearsOfExperience: 15,
    descriptionOfExperience: 'Pioneering zero-gravity living spaces since 2008',
  },
  premises: {
    identity: {
      type: 'Commercial',
      listed: 'Grade II*',
      address: {
        addressLine1: '789 Moonbeam Boulevard',
        addressLine2: 'Crystal Wing',
        addressLine3: 'Aurora Complex',
        city: 'Brighton',
        postcode: 'BN1 6ZZ',
      },
      numberOfFlatsInBlock: 23,
      numberOfFlatsToBeInsured: 17,
    },
    construction: {
      roofType: 'Slate',
      wallType: 'Brick Built',
      floorType: 'Concrete',
      stairType: 'Metal',
      hasFlatRoof: true,
      haveColdStores: true,
      rebuildingCost: 2750000,
      roofLastRelaid: '2021-03-15',
      numberOfStoreys: 5,
      anyCompositePanels: 'No panels',
      warehouseFloorArea: 'Not Applicable',
      yearOfConstruction: '1998-08-21',
      constructionDetails: 'Features bio-luminescent facade lighting and self-cleaning windows',
      percentageOfFlatRoof: 35,
      flatRoofLastInspected: '2023-11-30',
      isBuildingPurposeBuilt: true,
      isUndergoingBuildingWorks: false,
    },
  },
  security: {
    cctv: true,
    cctvType: 'Recorded and monitored by a professional monitoring company',
    cctvCoverage: 'Both',
    selfContained: true,
    doorSecurityType: 'Mortise Deadlock - 5 Or More Levers BS3621',
    fittedWithSmokeAlarms: true,
    intruderAlarm: true,
    intruderAlarmType: 'Professional',
    requireTerrorismCover: false,
  },
  fireSafety: {
    heating: 'Geothermal',
    fireAlarm: true,
    smokingPolicy: 'Designated zones only',
    sprinklerSystem: true,
    fireExtinguishers: true,
    fireDetectorsCoverage: 'Full building with thermal imaging',
    flammableLiquidStored: true,
    flammableLiquids: ['Eco-friendly cleaning solutions'],
  },
  coverage: {
    terrorism: true,
    subsidence: true,
    accidentalDamage: true,
    sumInsuredLossOfRent: 175000,
    periodOfIndemnityInMonths: 24,
    propertyOwnersLiabilityAmount: 2500000,
  },
  materialDamage: {
    stocksSumInsured: 85000,
    buildingSumInsured: 3500000,
    tenantsImprovementsSumInsured: 250000,
    electronicOfficeEquipmentSumInsured: 75000,
    portableEquipment: {
      location: 'UK',
      toolsSumInsured: 25000,
      smartPhoneSumInsured: 3500,
      miscellaneousToInsure: 'Holographic display units and quantum security devices',
      otherPortableComputerEquipmentSumInsured: 15000,
    },
  },
};

export default function Form() {
  const [currentSection, setCurrentSection] = useState<FormSection>('contact');
  const [formData, setFormData] = useState({
    // Contact Information
    contact: {
      title: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phoneNumber: '',
      jointInsured: false,
      jointInsuredPersonName: '',
      numberOfYearsAsLandlord: 0,
    },
    // Business Information
    business: {
      name: '',
      type: '',
      trade: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        postcode: '',
      },
      ernTaxCode: '',
      websiteUrl: '',
      description: '',
      exemptFromERNCode: false,
      yearsOfExperience: 0,
      descriptionOfExperience: '',
    },
    // Premises Information
    premises: {
      identity: {
        type: '',
        listed: 'Not listed',
        address: {
          addressLine1: '',
          addressLine2: '',
          addressLine3: '',
          city: '',
          postcode: '',
        },
        numberOfFlatsInBlock: 0,
        numberOfFlatsToBeInsured: 0,
      },
      construction: {
        roofType: '',
        wallType: '',
        floorType: '',
        stairType: '',
        hasFlatRoof: false,
        haveColdStores: false,
        rebuildingCost: 0,
        roofLastRelaid: '',
        numberOfStoreys: 0,
        anyCompositePanels: 'No panels',
        warehouseFloorArea: 'Not Applicable',
        yearOfConstruction: '',
        constructionDetails: '',
        percentageOfFlatRoof: 0,
        flatRoofLastInspected: '',
        isBuildingPurposeBuilt: false,
        isUndergoingBuildingWorks: false,
      },
    },
    // Security Information
    security: {
      cctv: false,
      cctvType: '',
      cctvCoverage: '',
      selfContained: false,
      doorSecurityType: '',
      fittedWithSmokeAlarms: false,
      intruderAlarm: false,
      intruderAlarmType: '',
      requireTerrorismCover: false,
    },
    // Fire Safety
    fireSafety: {
      heating: '',
      fireAlarm: false,
      smokingPolicy: '',
      sprinklerSystem: false,
      fireExtinguishers: false,
      fireDetectorsCoverage: '',
      flammableLiquidStored: false,
      flammableLiquids: [],
    },
    // Coverage Options
    coverage: {
      terrorism: false,
      subsidence: true,
      accidentalDamage: true,
      sumInsuredLossOfRent: 0,
      periodOfIndemnityInMonths: 0,
      propertyOwnersLiabilityAmount: 0,
    },
    // Material Damage
    materialDamage: {
      stocksSumInsured: 0,
      buildingSumInsured: 0,
      tenantsImprovementsSumInsured: 0,
      electronicOfficeEquipmentSumInsured: 0,
      portableEquipment: {
        location: 'UK',
        toolsSumInsured: 0,
        smartPhoneSumInsured: 0,
        miscellaneousToInsure: '',
        otherPortableComputerEquipmentSumInsured: 0,
      },
    },
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const [view, setView] = useState<FormView>('form');

  const validateField = (section: string, field: string, value: any): string => {
    // Common validation rules
    if (field.toLowerCase().includes('email')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Invalid email address';
    }

    if (field.toLowerCase().includes('phone')) {
      const phoneRegex = /^[\d\s+()-]{10,}$/;
      if (!phoneRegex.test(value)) return 'Invalid phone number';
    }

    // Section specific validation
    switch (section) {
      case 'contact':
        switch (field) {
          case 'title':
            if (!value) return 'Title is required';
            break;
          case 'firstName':
            if (!value) return 'First name is required';
            if (value.length < 2) return 'First name must be at least 2 characters';
            break;
          case 'lastName':
            if (!value) return 'Last name is required';
            if (value.length < 2) return 'Last name must be at least 2 characters';
            break;
          case 'dateOfBirth':
            if (!value) return 'Date of birth is required';
            const dob = new Date(value);
            const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
            if (age < 18) return 'Must be at least 18 years old';
            break;
          case 'numberOfYearsAsLandlord':
            if (value < 0) return 'Cannot be negative';
            break;
        }
        break;

      case 'business':
        switch (field) {
          case 'name':
            if (!value) return 'Business name is required';
            if (value.length < 2) return 'Business name must be at least 2 characters';
            break;
          case 'type':
            if (!value) return 'Business type is required';
            break;
          case 'trade':
            if (!value) return 'Trade is required';
            break;
          case 'address.addressLine1':
            if (!value) return 'Address line 1 is required';
            break;
          case 'address.city':
            if (!value) return 'City is required';
            break;
          case 'address.postcode':
            const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
            if (!value) return 'Postcode is required';
            if (!postcodeRegex.test(value)) return 'Invalid UK postcode format';
            break;
          case 'yearsOfExperience':
            if (value < 0) return 'Years of experience cannot be negative';
            break;
          case 'ernTaxCode':
            if (!value && !formData.business.exemptFromERNCode) return 'ERN Tax Code is required unless exempt';
            if (value && !/^\d{3}\/[A-Z]{1,2}\d{5}$/.test(value)) return 'Invalid ERN Tax Code format (e.g., 123/AB12345)';
            break;
          case 'websiteUrl':
            if (value && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
              return 'Invalid website URL';
            }
            break;
        }
        break;

      case 'premises':
        // Identity validation
        if (field.startsWith('identity')) {
          const identityField = field.split('.').pop();
          switch (identityField) {
            case 'type':
              if (!value) return 'Property type is required';
              break;
            case 'addressLine1':
              if (!value) return 'Address line 1 is required';
              break;
            case 'city':
              if (!value) return 'City is required';
              break;
            case 'postcode':
              const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
              if (!value) return 'Postcode is required';
              if (!postcodeRegex.test(value)) return 'Invalid UK postcode format';
              break;
            case 'numberOfFlatsInBlock':
              if (value < 0) return 'Cannot be negative';
              break;
            case 'numberOfFlatsToBeInsured':
              if (value < 0) return 'Cannot be negative';
              if (value > formData.premises.identity.numberOfFlatsInBlock) {
                return 'Cannot exceed total number of flats in block';
              }
              break;
          }
        }

        // Construction validation
        if (field.startsWith('construction')) {
          const constructionField = field.split('.').pop();
          switch (constructionField) {
            case 'roofType':
              if (!value) return 'Roof type is required';
              break;
            case 'wallType':
              if (!value) return 'Wall type is required';
              break;
            case 'floorType':
              if (!value) return 'Floor type is required';
              break;
            case 'stairType':
              if (!value) return 'Stair type is required';
              break;
            case 'rebuildingCost':
              if (!value) return 'Rebuilding cost is required';
              if (value <= 0) return 'Rebuilding cost must be greater than 0';
              break;
            case 'numberOfStoreys':
              if (!value) return 'Number of storeys is required';
              if (value < 1) return 'Must have at least 1 storey';
              break;
            case 'yearOfConstruction':
              if (!value) return 'Year of construction is required';
              const constructionYear = new Date(value).getFullYear();
              const currentYear = new Date().getFullYear();
              if (constructionYear > currentYear) return 'Cannot be in the future';
              break;
            case 'percentageOfFlatRoof':
              if (formData.premises.construction.hasFlatRoof) {
                if (!value) return 'Percentage of flat roof is required';
                if (value < 0 || value > 100) return 'Percentage must be between 0 and 100';
              }
              break;
            case 'flatRoofLastInspected':
              if (formData.premises.construction.hasFlatRoof) {
                if (!value) return 'Flat roof inspection date is required';
                const inspectionDate = new Date(value);
                const threeYearsAgo = new Date();
                threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
                if (inspectionDate < threeYearsAgo) {
                  return 'Flat roof must have been inspected within the last 3 years';
                }
              }
              break;
          }
        }
        break;

      case 'security':
        switch (field) {
          case 'cctvType':
            if (formData.security.cctv && !value) {
              return 'CCTV type is required when CCTV is installed';
            }
            break;
          case 'cctvCoverage':
            if (formData.security.cctv && !value) {
              return 'CCTV coverage is required when CCTV is installed';
            }
            break;
          case 'doorSecurityType':
            if (!value) return 'Door security type is required';
            break;
          case 'intruderAlarmType':
            if (formData.security.intruderAlarm && !value) {
              return 'Intruder alarm type is required when intruder alarm is installed';
            }
            break;
        }
        break;

      case 'coverage':
        switch (field) {
          case 'sumInsuredLossOfRent':
          case 'propertyOwnersLiabilityAmount':
            if (value < 0) return 'Cannot be negative';
            break;
          case 'periodOfIndemnityInMonths':
            if (value < 0 || value > 36) return 'Must be between 0 and 36 months';
            break;
        }
        break;
    }
    return '';
  };

  const handleChange = (section: string, field: string, value: any) => {
    // Mark field as touched
    setTouched(prev => new Set(prev).add(`${section}.${field}`));

    // Update form data
    setFormData(prev => {
      const newData = { ...prev };

      // Handle nested fields (like address.city)
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        newData[section] = {
          ...prev[section],
          [parent]: {
            ...prev[section][parent],
            [child]: value
          }
        };
      } else {
        // Handle non-nested fields
        newData[section] = {
          ...prev[section],
          [field]: value
        };
      }

      // Validate field
      const error = validateField(section, field, value);
      setErrors(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: error
        }
      }));

      return newData;
    });
  };

  const validateSection = (section: FormSection): boolean => {
    let isValid = true;
    const newErrors: ValidationErrors = { ...errors };
    newErrors[section] = newErrors[section] || {};

    // Mark all fields in the section as touched
    const sectionFields = Object.keys(formData[section]);
    sectionFields.forEach(field => {
      setTouched(prev => new Set(prev).add(`${section}.${field}`));
      const error = validateField(section, field, formData[section][field]);
      if (error) {
        isValid = false;
        newErrors[section][field] = error;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all sections
    const sections: FormSection[] = ['contact', 'business', 'premises', 'security', 'coverage'];
    const isValid = sections.every(section => validateSection(section));

    if (isValid) {
      setView('review');
    } else {
      console.log('Form has errors:', errors);
    }
  };

  const handleTabChange = (value: string) => {
    setCurrentSection(value as FormSection);
  };

  const handleNavigation = (direction: 'next' | 'previous') => {
    const sections: FormSection[] = ['contact', 'business', 'premises', 'security', 'coverage'];
    const currentIndex = sections.indexOf(currentSection);

    if (direction === 'next') {
      // Validate current section before moving forward
      const isValid = validateSection(currentSection);

      // Show error toast or summary if validation fails
      if (!isValid) {
        // Force all fields in the section to be marked as touched
        const sectionFields = Object.keys(formData[currentSection]);
        const newTouched = new Set(touched);
        sectionFields.forEach(field => {
          newTouched.add(`${currentSection}.${field}`);
        });
        setTouched(newTouched);

        // Scroll to the top where the error summary will be shown
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        setCurrentSection(nextSection);
        handleTabChange(nextSection);
      }
    } else if (direction === 'previous' && currentIndex > 0) {
      const prevSection = sections[currentIndex - 1];
      setCurrentSection(prevSection);
      handleTabChange(prevSection);
    }
  };

  // Add this new component for displaying section errors
  const ValidationSummary = ({ errors }: { errors: ValidationErrors }) => {
    const errorMessages = Object.entries(errors).flatMap(([section, sectionErrors]) =>
      Object.entries(sectionErrors)
        .filter(([_, error]) => error)
        .map(([field, error]) => ({
          field: field.split('.').pop()?.replace(/([A-Z])/g, ' $1').toLowerCase() || field,
          error
        }))
    );

    if (errorMessages.length === 0) return null;

    return (
      <div className="rounded-md bg-red-50 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Please fix the following errors:
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="list-disc pl-5 space-y-1">
                {errorMessages.map((error, index) => (
                  <li key={index}>
                    {error.field}: {error.error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  let ACCEPTED_CODE = 'ASTEROID_1';
  let REJECTED_CODE = 'ASTEROID_0';

  // Add the FormReview component
  const FormReview = ({
    formData,
    onBack
  }: {
    formData: any,
    onBack: () => void
  }) => {
    const [submitted, setSubmitted] = useState(false);
    const [submissionCode, setSubmissionCode] = useState('');
    const [mismatches, setMismatches] = useState<string[]>([]);

    const findMismatches = (obj1: any, obj2: any, path: string = ''): string[] => {
      const differences: string[] = [];

      for (const key in obj1) {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof obj1[key] === 'object' && obj1[key] !== null) {
          differences.push(...findMismatches(obj1[key], obj2?.[key] || {}, currentPath));
        } else if (obj1[key] !== obj2?.[key]) {
          const formattedPath = currentPath.replace(/([A-Z])/g, ' $1').toLowerCase();
          differences.push(
            `${formattedPath}: expected "${obj2?.[key]}", got "${obj1[key]}"`
          );
        }
      }

      return differences;
    };

    const verifyData = () => {
      // Deep equality check function
      const isEqual = (obj1: any, obj2: any): boolean => {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2;
        if (obj1 === null || obj2 === null) return obj1 === obj2;

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        return keys1.every(key => isEqual(obj1[key], obj2[key]));
      };

      const isMatch = isEqual(formData, DEMO_DATA);
      if (!isMatch) {
        const differences = findMismatches(formData, DEMO_DATA);
        setMismatches(differences);
      } else {
        setMismatches([]);
      }
      return isMatch;
    };

    const handleSubmit = () => {
      const isMatch = verifyData();
      const code = isMatch ? ACCEPTED_CODE : REJECTED_CODE;
      setSubmissionCode(code);
      setSubmitted(true);
    };

    const renderField = (label: string, value: any) => {
      if (typeof value === 'boolean') {
        return (
          <div className="py-2">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{value ? 'Yes' : 'No'}</dd>
          </div>
        );
      }

      if (typeof value === 'number' || typeof value === 'string') {
        return (
          <div className="py-2">
            <dt className="text-sm font-medium text-gray-500">{label}</dt>
            <dd className="mt-1 text-sm text-gray-900">{value || 'Not provided'}</dd>
          </div>
        );
      }

      return null;
    };

    const renderSection = (title: string, data: any) => {
      return (
        <div className="mt-8 first:mt-0">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            {Object.entries(data).map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return (
                  <div key={key} className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </h4>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                      {Object.entries(value).map(([subKey, subValue]) =>
                        renderField(
                          subKey.charAt(0).toUpperCase() + subKey.slice(1).replace(/([A-Z])/g, ' $1'),
                          subValue
                        )
                      )}
                    </dl>
                  </div>
                );
              }
              return renderField(
                key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                value
              );
            })}
          </dl>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Review Your Application</h1>
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Form
              </button>
            </div>

            <div className="space-y-8">
              {renderSection('Contact Details', formData.contact)}
              {renderSection('Business Information', formData.business)}
              {renderSection('Premises Details', formData.premises)}
              {renderSection('Security Details', formData.security)}
              {renderSection('Fire Safety', formData.fireSafety)}
              {renderSection('Coverage Options', formData.coverage)}
              {renderSection('Material Damage', formData.materialDamage)}

              {submitted && (
                <div className={`mt-8 p-4 rounded-md ${submissionCode === ACCEPTED_CODE
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 ${submissionCode === ACCEPTED_CODE ? 'text-green-400' : 'text-yellow-400'}`}>
                      {submissionCode === ACCEPTED_CODE ? (
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`text-sm font-medium ${submissionCode === ACCEPTED_CODE ? 'text-green-800' : 'text-yellow-800'}`}>
                        Submission Code: {submissionCode}
                      </h3>
                      <div className="mt-2 text-sm text-gray-700">
                        {submissionCode === ACCEPTED_CODE ? (
                          'Application received successfully.'
                        ) : (
                          <div>
                            <p className="font-medium mb-2">Application has mismatches:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {mismatches.map((mismatch, index) => (
                                <li key={index} className="text-red-600">{mismatch}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSubmit}
                >
                  Confirm & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add a function to handle going back to the form
  const handleBackToForm = () => {
    setView('form');
  };

  // Modify the return statement
  if (view === 'review') {
    return <FormReview formData={formData} onBack={handleBackToForm} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Commercial Property Insurance Application</h1>

          <Tabs
            defaultValue="contact"
            value={currentSection}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="business">Business Info</TabsTrigger>
              <TabsTrigger value="premises">Premises Details</TabsTrigger>
              <TabsTrigger value="security">Security & Safety</TabsTrigger>
              <TabsTrigger value="coverage">Coverage Options</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <ValidationSummary errors={errors} />
              {/* Contact Details Section */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <select
                      value={formData.contact.title}
                      onChange={(e) => handleChange('contact', 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                      <option value="Prof">Prof</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={formData.contact.firstName}
                      onChange={(e) => handleChange('contact', 'firstName', e.target.value)}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                        ${errors.contact?.firstName && touched.has('contact.firstName')
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                        }`}
                    />
                    {errors.contact?.firstName && touched.has('contact.firstName') && (
                      <p className="mt-1 text-sm text-red-600">{errors.contact.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      value={formData.contact.lastName}
                      onChange={(e) => handleChange('contact', 'lastName', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.contact.dateOfBirth}
                      onChange={(e) => handleChange('contact', 'dateOfBirth', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.contact.phoneNumber}
                      onChange={(e) => handleChange('contact', 'phoneNumber', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Years as Landlord</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.contact.numberOfYearsAsLandlord}
                      onChange={(e) => handleChange('contact', 'numberOfYearsAsLandlord', parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="jointInsured"
                      checked={formData.contact.jointInsured}
                      onChange={(e) => handleChange('contact', 'jointInsured', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="jointInsured" className="ml-2 block text-sm text-gray-700">
                      Joint Insured
                    </label>
                  </div>

                  {formData.contact.jointInsured && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Joint Insured Person Name</label>
                      <input
                        type="text"
                        value={formData.contact.jointInsuredPersonName}
                        onChange={(e) => handleChange('contact', 'jointInsuredPersonName', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business">
              <ValidationSummary errors={errors} />
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <input
                    type="text"
                    value={formData.business.name}
                    onChange={(e) => handleChange('business', 'name', e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                      ${errors.business?.name && touched.has('business.name')
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                      }`}
                  />
                  {errors.business?.name && touched.has('business.name') && (
                    <p className="mt-1 text-sm text-red-600">{errors.business.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Type</label>
                  <select
                    value={formData.business.type}
                    onChange={(e) => handleChange('business', 'type', e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                      ${errors.business?.type && touched.has('business.type')
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select...</option>
                    <option value="Sole Trader">Sole Trader</option>
                    <option value="Public Limited Company (PLC)">Public Limited Company (PLC)</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                    <option value="Private Limited Company (LTD)">Private Limited Company (LTD)</option>
                  </select>
                  {errors.business?.type && touched.has('business.type') && (
                    <p className="mt-1 text-sm text-red-600">{errors.business.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Trade</label>
                  <input
                    type="text"
                    value={formData.business.trade}
                    onChange={(e) => handleChange('business', 'trade', e.target.value)}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                      ${errors.business?.trade && touched.has('business.trade')
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300'
                      }`}
                  />
                  {errors.business?.trade && touched.has('business.trade') && (
                    <p className="mt-1 text-sm text-red-600">{errors.business.trade}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Business Address</h4>
                  <div>
                    <input
                      type="text"
                      placeholder="Address Line 1"
                      value={formData.business.address.addressLine1}
                      onChange={(e) => handleChange('business', 'address.addressLine1', e.target.value)}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                        ${errors.business?.['address.addressLine1'] && touched.has('business.address.addressLine1')
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                        }`}
                    />
                    {errors.business?.['address.addressLine1'] && touched.has('business.address.addressLine1') && (
                      <p className="mt-1 text-sm text-red-600">{errors.business['address.addressLine1']}</p>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Address Line 2"
                    value={formData.business.address.addressLine2}
                    onChange={(e) => handleChange('business', 'address.addressLine2', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />

                  <input
                    type="text"
                    placeholder="Address Line 3"
                    value={formData.business.address.addressLine3}
                    onChange={(e) => handleChange('business', 'address.addressLine3', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.business.address.city}
                      onChange={(e) => handleChange('business', 'address.city', e.target.value)}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                        ${errors.business?.['address.city'] && touched.has('business.address.city')
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                        }`}
                    />
                    {errors.business?.['address.city'] && touched.has('business.address.city') && (
                      <p className="mt-1 text-sm text-red-600">{errors.business['address.city']}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="exemptFromERNCode"
                    checked={formData.business.exemptFromERNCode}
                    onChange={(e) => handleChange('business', 'exemptFromERNCode', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="exemptFromERNCode" className="ml-2 block text-sm text-gray-700">
                    Exempt from ERN Code
                  </label>
                </div>

                {!formData.business.exemptFromERNCode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ERN Tax Code</label>
                    <input
                      type="text"
                      value={formData.business.ernTaxCode}
                      onChange={(e) => handleChange('business', 'ernTaxCode', e.target.value)}
                      placeholder="123/AB12345"
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                        ${errors.business?.ernTaxCode && touched.has('business.ernTaxCode')
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-300'
                        }`}
                    />
                    {errors.business?.ernTaxCode && touched.has('business.ernTaxCode') && (
                      <p className="mt-1 text-sm text-red-600">{errors.business.ernTaxCode}</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="premises">
              <ValidationSummary errors={errors} />
              <div className="space-y-8">
                {/* Identity Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Property Identity</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Property Type</label>
                      <select
                        value={formData.premises.identity.type}
                        onChange={(e) => handleChange('premises', 'identity.type', e.target.value)}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                          ${errors.premises?.['identity.type'] && touched.has('premises.identity.type')
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                          }`}
                      >
                        <option value="">Select...</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Shop with accommodation">Shop with accommodation</option>
                        <option value="Self-contained shop">Self-contained shop</option>
                        <option value="Office">Office</option>
                        <option value="Warehouse">Warehouse</option>
                        <option value="Factory">Factory</option>
                        {/* Add other property types from schema */}
                      </select>
                      {errors.premises?.['identity.type'] && touched.has('premises.identity.type') && (
                        <p className="mt-1 text-sm text-red-600">{errors.premises['identity.type']}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Listed Status</label>
                      <select
                        value={formData.premises.identity.listed}
                        onChange={(e) => handleChange('premises', 'identity.listed', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Not listed">Not listed</option>
                        <option value="Grade I">Grade I</option>
                        <option value="Grade II">Grade II</option>
                        <option value="Grade II*">Grade II*</option>
                      </select>
                    </div>

                    {/* Property Address */}
                    <div className="col-span-2">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Property Address</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={formData.premises.identity.address.addressLine1}
                          onChange={(e) => handleChange('premises', 'identity.address.addressLine1', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 2"
                          value={formData.premises.identity.address.addressLine2}
                          onChange={(e) => handleChange('premises', 'identity.address.addressLine2', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 3"
                          value={formData.premises.identity.address.addressLine3}
                          onChange={(e) => handleChange('premises', 'identity.address.addressLine3', e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            value={formData.premises.identity.address.city}
                            onChange={(e) => handleChange('premises', 'identity.address.city', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                          <input
                            type="text"
                            placeholder="Postcode"
                            value={formData.premises.identity.address.postcode}
                            onChange={(e) => handleChange('premises', 'identity.address.postcode', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Flats in Block</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.premises.identity.numberOfFlatsInBlock}
                        onChange={(e) => handleChange('premises', 'identity.numberOfFlatsInBlock', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Flats to be Insured</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.premises.identity.numberOfFlatsToBeInsured}
                        onChange={(e) => handleChange('premises', 'identity.numberOfFlatsToBeInsured', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Construction Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Construction Details</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Roof Type</label>
                      <select
                        value={formData.premises.construction.roofType}
                        onChange={(e) => handleChange('premises', 'construction.roofType', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="Slate">Slate</option>
                        <option value="Tile">Tile</option>
                        <option value="Concrete">Concrete</option>
                        <option value="Metal">Metal</option>
                        {/* Add other roof types from schema */}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Wall Type</label>
                      <select
                        value={formData.premises.construction.wallType}
                        onChange={(e) => handleChange('premises', 'construction.wallType', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="Brick Built">Brick Built</option>
                        <option value="Timber Frame">Timber Frame</option>
                        <option value="All Timber">All Timber</option>
                        {/* Add other wall types from schema */}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Floor Type</label>
                      <select
                        value={formData.premises.construction.floorType}
                        onChange={(e) => handleChange('premises', 'construction.floorType', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="Brick Built">Brick Built</option>
                        <option value="Concrete">Concrete</option>
                        <option value="Stone">Stone</option>
                        <option value="All Timber">All Timber</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stair Type</label>
                      <select
                        value={formData.premises.construction.stairType}
                        onChange={(e) => handleChange('premises', 'construction.stairType', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="No Stairs">No Stairs</option>
                        <option value="Brick Built">Brick Built</option>
                        <option value="Timber Frame">Timber Frame</option>
                        <option value="All Timber">All Timber</option>
                        <option value="Non-Standard">Non-Standard</option>
                        <option value="Brick and timber frame">Brick and timber frame</option>
                        <option value="Concrete">Concrete</option>
                        <option value="Metal">Metal</option>
                        <option value="Stone">Stone</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Storeys</label>
                      <input
                        type="number"
                        min="1"
                        value={formData.premises.construction.numberOfStoreys}
                        onChange={(e) => handleChange('premises', 'construction.numberOfStoreys', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year of Construction</label>
                      <input
                        type="date"
                        value={formData.premises.construction.yearOfConstruction}
                        onChange={(e) => handleChange('premises', 'construction.yearOfConstruction', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rebuilding Cost (£)</label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.premises.construction.rebuildingCost}
                        onChange={(e) => handleChange('premises', 'construction.rebuildingCost', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Construction Details</label>
                      <textarea
                        rows={4}
                        value={formData.premises.construction.constructionDetails}
                        onChange={(e) => handleChange('premises', 'construction.constructionDetails', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Please provide any additional construction details..."
                      />
                    </div>

                    <div className="col-span-2 space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="hasFlatRoof"
                          checked={formData.premises.construction.hasFlatRoof}
                          onChange={(e) => handleChange('premises', 'construction.hasFlatRoof', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="hasFlatRoof" className="ml-2 block text-sm text-gray-700">
                          Has Flat Roof
                        </label>
                      </div>

                      {formData.premises.construction.hasFlatRoof && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Percentage of Flat Roof</label>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={formData.premises.construction.percentageOfFlatRoof}
                              onChange={(e) => handleChange('premises', 'construction.percentageOfFlatRoof', parseInt(e.target.value))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Flat Roof Last Inspected</label>
                            <input
                              type="date"
                              value={formData.premises.construction.flatRoofLastInspected}
                              onChange={(e) => handleChange('premises', 'construction.flatRoofLastInspected', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <ValidationSummary errors={errors} />
              <div className="space-y-8">
                {/* Security Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Security Details</h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="cctv"
                          checked={formData.security.cctv}
                          onChange={(e) => handleChange('security', 'cctv', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="cctv" className="ml-2 block text-sm text-gray-700">
                          CCTV Installed
                        </label>
                      </div>

                      {formData.security.cctv && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">CCTV Type</label>
                            <select
                              value={formData.security.cctvType}
                              onChange={(e) => handleChange('security', 'cctvType', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="">Select...</option>
                              <option value="Recorded only">Recorded only</option>
                              <option value="Recorded and monitored by policy holder">Recorded and monitored by policy holder</option>
                              <option value="Recorded and monitored by a professional monitoring company">Recorded and monitored by a professional monitoring company</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">CCTV Coverage</label>
                            <select
                              value={formData.security.cctvCoverage}
                              onChange={(e) => handleChange('security', 'cctvCoverage', e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              <option value="">Select...</option>
                              <option value="Internal only">Internal only</option>
                              <option value="External only">External only</option>
                              <option value="Both">Both</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Door Security Type</label>
                      <select
                        value={formData.security.doorSecurityType}
                        onChange={(e) => handleChange('security', 'doorSecurityType', e.target.value)}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                          ${errors.security?.doorSecurityType && touched.has('security.doorSecurityType')
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                          }`}
                      >
                        <option value="">Select...</option>
                        <option value="No Special Security">No Special Security</option>
                        <option value="Mortise Deadlock - 5 Or More Levers BS3621">Mortise Deadlock - 5 Or More Levers BS3621</option>
                        <option value="Mortise Deadlock - 3 Lever">Mortise Deadlock - 3 Lever</option>
                        <option value="Mortise Deadlock - 4 Lever">Mortise Deadlock - 4 Lever</option>
                        {/* Add other security types from schema */}
                      </select>
                      {errors.security?.doorSecurityType && touched.has('security.doorSecurityType') && (
                        <p className="mt-1 text-sm text-red-600">{errors.security.doorSecurityType}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="coverage">
              {/* Coverage Options Section */}
              <div className="space-y-8">
                {/* Add coverage options content here */}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => handleNavigation('previous')}
              disabled={currentSection === 'contact'}
              className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
                ${currentSection === 'contact'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Previous
            </button>
            {currentSection === 'coverage' ? (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleNavigation('next')}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            )}
          </div>

          {/* Add the magic button here */}
          <div className="fixed bottom-4 right-4">
            <button
              type="button"
              onClick={() => setFormData(DEMO_DATA)}
              className=""
            >
              <span></span>
              <span>Terms and Conditions</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
} 
