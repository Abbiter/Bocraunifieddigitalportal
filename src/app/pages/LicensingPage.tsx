import { useState } from 'react';
import { CheckCircle2, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { licenseTypes } from '../data/mockData';

export function LicensingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    licenseType: '',
    businessPlan: null as File | null,
    financialStatements: null as File | null,
    incorporationCert: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [field]: e.target.files[0],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrackingId = `LIC-2026-${Math.floor(Math.random() * 900000 + 100000)}`;
    setTrackingId(newTrackingId);
    setSubmitted(true);
  };

  const steps = [
    { number: 1, title: 'Company Details', description: 'Basic company information' },
    { number: 2, title: 'License Selection', description: 'Choose license type' },
    { number: 3, title: 'Documentation', description: 'Upload required documents' },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted Successfully</h2>
            <p className="text-gray-600 mb-6">
              Your license application has been received and is under review.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Application Tracking ID</p>
              <p className="text-2xl font-bold text-[#003366] mb-2">{trackingId}</p>
              <p className="text-sm text-gray-600">
                Please save this ID to track your application status
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-medium text-gray-900 mb-2">Next Steps:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Initial review (1-2 business days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Technical evaluation (3-5 business days)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Final approval and license issuance</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <a
                href="/dashboard"
                className="block w-full bg-[#003366] text-white px-6 py-3 rounded-md font-medium hover:bg-[#004d99] transition-colors"
              >
                Go to Dashboard
              </a>
              <a
                href="/"
                className="block w-full bg-white text-[#003366] border border-gray-300 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">License Application</h1>
          <p className="text-gray-600">
            Apply for telecommunications, broadcasting, or spectrum licenses
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                      currentStep >= step.number
                        ? 'bg-[#003366] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-4 transition-colors ${
                      currentStep > step.number ? 'bg-[#003366]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {/* Step 1: Company Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Company Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number *
                  </label>
                  <input
                    type="text"
                    id="registrationNumber"
                    name="registrationNumber"
                    required
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Company reg. number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="company@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="+267 7XXX XXXX"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Physical Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                    placeholder="Street, City"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: License Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">License Type Selection</h2>

              <div>
                <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 mb-2">
                  Select License Type *
                </label>
                <select
                  id="licenseType"
                  name="licenseType"
                  required
                  value={formData.licenseType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003366] focus:border-transparent"
                >
                  <option value="">Choose license type</option>
                  {licenseTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {formData.licenseType && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">License Requirements:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>Valid company registration certificate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>Business plan and technical specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>Financial statements for the last 2 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="mt-0.5 text-blue-600 flex-shrink-0" />
                      <span>Proof of technical and financial capability</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Documentation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Upload Documentation</h2>

              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#003366] transition-colors">
                  <label htmlFor="businessPlan" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 mb-1">Business Plan *</p>
                      <p className="text-sm text-gray-500">
                        {formData.businessPlan ? formData.businessPlan.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (max 10MB)</p>
                    </div>
                    <input
                      type="file"
                      id="businessPlan"
                      name="businessPlan"
                      onChange={(e) => handleFileChange(e, 'businessPlan')}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#003366] transition-colors">
                  <label htmlFor="financialStatements" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 mb-1">Financial Statements *</p>
                      <p className="text-sm text-gray-500">
                        {formData.financialStatements ? formData.financialStatements.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF (max 10MB)</p>
                    </div>
                    <input
                      type="file"
                      id="financialStatements"
                      name="financialStatements"
                      onChange={(e) => handleFileChange(e, 'financialStatements')}
                      className="hidden"
                      accept=".pdf"
                    />
                  </label>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#003366] transition-colors">
                  <label htmlFor="incorporationCert" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <p className="font-medium text-gray-900 mb-1">Certificate of Incorporation *</p>
                      <p className="text-sm text-gray-500">
                        {formData.incorporationCert ? formData.incorporationCert.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">PDF (max 5MB)</p>
                    </div>
                    <input
                      type="file"
                      id="incorporationCert"
                      name="incorporationCert"
                      onChange={(e) => handleFileChange(e, 'incorporationCert')}
                      className="hidden"
                      accept=".pdf"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6 mt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={20} />
                Previous
              </button>
            )}
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#003366] text-white px-6 py-3 rounded-md font-medium hover:bg-[#004d99] transition-colors ml-auto"
              >
                Next
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 bg-[#003366] text-white px-6 py-3 rounded-md font-medium hover:bg-[#004d99] transition-colors ml-auto"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
